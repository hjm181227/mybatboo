import { Observable, of } from "rxjs";
import { share, take, tap } from "rxjs/operators";

let FONT_LOADED_INFO = {};
let FONT_LOAD_OBS$ = {};

export function fontLoader$(font: 'Material Icons' | 'Material Icons Outlined' | 'Line Awesome Free' | 'Line Awesome Brands', name?: string) {
  const key = `${font}-${name}`;
  if (FONT_LOADED_INFO[key]) {
    return of(true);
  }

  // 진행중인 확인이 있으면 이를 재사용
  if (FONT_LOAD_OBS$[key]) {
    return FONT_LOAD_OBS$[key];
  }

  return FONT_LOAD_OBS$[key] = new Observable((observer) => {
    const fonts = (document as any).fonts;
    if (!fonts) { // 폰트 로딩 타이밍 분석하는걸 제공하지 않는 경우
      observer.next(true);
      return;
    }

    let timer: any;
    let reqId: any;
    const checker = () => {
      if (observer.closed) {
        return;
      }

      if (fonts.check(`12px '${font}'`, name)) {
        observer.next(true);
      } else if (fonts.check(`12px '${font}'`)) {
        observer.next(true);
      } else {
        timer = setTimeout(() => {
          reqId = requestAnimationFrame(checker);
        }, 50); // 25 fps 수준으로 프레임이 감당 가능한 수준에서 체크
      }
    }
    reqId = requestAnimationFrame(checker);

    // 제한 시간 10초 까지만 체크
    const timeoutTimer: any = setTimeout(() => {
      if (reqId) cancelAnimationFrame(reqId);
      if (!observer.closed) {
        observer.next(true);
      }
    }, 10000);

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      if (timer) clearTimeout(timer);
      clearTimeout(timeoutTimer);
    };
  }).pipe(
    take(1),
    tap(() => {
      FONT_LOADED_INFO[key] = true;
      delete FONT_LOAD_OBS$[key]; // 메모리에서 더이상 필요하지 않은 로직이니 제거
    }),
    share(),
  );
}
