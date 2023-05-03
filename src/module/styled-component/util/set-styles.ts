import { Renderer2, RendererStyleFlags2 } from '@angular/core';
import { distinctUntilChanged, finalize, map, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { observeProperty$ } from './observe-property';

declare const window: any;

export function setStyles$<T extends object>(
  target: T,
  renderer: Renderer2,
  el: HTMLElement,
  fields: { [key: string]: (a: T) => any }
) {
  let reqId: any;
  const queueStyles: { [key: string]: any } = {};
  let appliedStyles: { [key: string]: any } = {};
  const removeFrames: { [key: string]: () => void } = {}; // 프레임 처리 안에서 el(HTMLElement) 하나에 해야하는 작업들을 모아둠

  const syncStyles = () => {
    if (!reqId) {
      reqId = requestAnimationFrame(() => {
        reqId = undefined;

        // kokomu-platform이 서버사이드렌더링에서는 SSRMode 값을 true로 설정함
        if (window.SSRMode) {
          Object.keys(queueStyles)
            // placeholder 패턴의 스타일들은 string 핸들링 과정에서 문제가 될 수 있으므로 제거
            .filter(key => !key.includes('placeholder'))
            .forEach(key => {
              const flags = key.startsWith('--') ? RendererStyleFlags2.DashCase : undefined;
              renderer.setStyle(el, key, queueStyles[key], flags); // (SSR) 에선 렌더러를 사용한 안전한 패치
            });
        } else {
          let newCssText = Object.entries(queueStyles).map(([k, v]) => `${k}: ${v};`).join(' ');
          // += 로 덮어쓰기 하는 방식을 채택 (DOM 렌더링 Trick)
          try {
            el.style.cssText?.split(';').forEach((text => {
              const key = text.split(':')[0].trim();
              if (!newCssText.includes(`${key}:`)) {
                newCssText += text + ';';
              }
            }));
            el.style.cssText = newCssText;
          } catch (e) {
            console.warn(`${newCssText} 반영하는데 문제가 발생했습니다.`);
            console.error(e);
          }
        }

        Object.keys(removeFrames).forEach(key => {
          removeFrames[key]();
          delete removeFrames[key];
        });
        appliedStyles = { ...queueStyles };
      });
    }
  }

  return Object.keys(fields).map((variableName) => {
    const converter = fields[variableName];
    const converterParams = getParamNames(converter);

    return combineLatest(
      converterParams.map((param) => observeProperty$(target, param))
    ).pipe(
      map(() => converter(target)),
      distinctUntilChanged(),
      tap((value) => {
        if ((typeof value === 'number' || typeof value === 'string')) {
          queueStyles[variableName] = value;
          delete removeFrames[variableName];
        } else {
          if (appliedStyles[variableName]) {
            removeFrames[variableName] = () => {
              const flags = variableName.startsWith('--') ? RendererStyleFlags2.DashCase : undefined;
              renderer.removeStyle(el, variableName, flags);
            };
          }
          delete queueStyles[variableName];
        }

        syncStyles();
      }),
      finalize(() => {
        if (reqId) {
          cancelAnimationFrame(reqId);
        }
      })
    );
  });
}

const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^{^}^\s,]+)/g;

function getParamNames(func: any) {
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) {
    result = [];
  }
  return result.map(v => v.split(':')[0]);
}
