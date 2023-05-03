import { SimpleChange } from '@angular/core';
import { hexToRgb, parseToRgb } from './ColorUtils/convert-type';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { mpColors, mpServiceColors } from "../color-palette";

export function propChanged(prop: SimpleChange) {
  return prop && prop.currentValue !== prop.previousValue;
}

export function isPropChangeExceptFirst(prop: SimpleChange) {
  return propChanged(prop) && !prop.isFirstChange();
}

export class ColorUtil {
  static parse(color: MpColor, opacity?: number): string;
  static parse(color: MpColor | undefined, opacity?: number): string | undefined;
  static parse(color: MpColor | undefined, opacity?: number): string | undefined {
    if (color === undefined || color === null || color === '') return undefined;
    color = ColorUtil.parseSharedColor(color);
    return ColorUtil.getComputedColor(color, opacity);
  }

  private static getComputedColor(color: string, opacity?: number) {
    const extractVar = (color: string) => {
      return color.replace('var(', '').replace(')', '').trim();
    };

    const getValue = (value: string) => {
      try {
        value = value.replace('--', '').trim();
        const colorPalette = mpColors as { [key: string]: string };
        if (value && colorPalette[value]) {
          return colorPalette[value];
        }

        const serviceColorPalette = mpServiceColors[(window as any).SERVICE_PROVIDER] as { [key: string]: string };
        if (value && serviceColorPalette && serviceColorPalette[value]) {
          return serviceColorPalette[value];
        }

        const computedColor = window.getComputedStyle(document.documentElement).getPropertyValue(extractVar(color)).trim();
        if (value && computedColor) {
          mpColors[value] = computedColor;
          return computedColor;
        }

        return value;
      } catch (e) {
        console.error(e);
        return 'black';
      }
    };

    let result = color?.includes('var(') ? getValue(extractVar(color)) : color;

    if (!opacity) return result;

    if (result.includes('#')) {
      result = hexToRgb(result, opacity);
    } else if (result.includes('rgb')) {
      const { r, g, b } = parseToRgb(result);
      result = `rgba(${r},${g},${b},${opacity})`;
    }
    return result;
  }

  private static parseSharedColor(color: string) {
    return color.includes('#') || (color.split(',').length > 2) || color.includes('var(--') ? color : `var(--${color})`;
  }
}

export function observeOnMutation(el: HTMLElement, options: MutationObserverInit): Observable<MutationRecord[]> {
  return new Observable((observer) => {
    const mutation = new MutationObserver((mutations) => {
      observer.next(mutations);
    });
    mutation.observe(el, options);
    return () => (mutation.disconnect());
  });
}

export function observeDOMClass$(el: HTMLElement, classNames: string[]) {
  return observeOnMutation(el, { attributes: true }).pipe(
    filter(mutations => !!mutations.filter(({ attributeName }) => attributeName === 'class').length),
    map(() => classNames.every(name => el.classList.contains(name)))
  );
}


export function formatDate(d: Date, separator = '.') {
  if (!d) return null;

  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString();
  const day = d.getDate().toString();

  return [ year, month, day ].join(separator);
}


export function parseHumanizeDate(humanizedDate: string) {
  // YYYY-MM-DD | YYYY/MM/DD
  const isYYYYMMDD = /\d{4}-\d{1,2}-\d{1,2}|\d{4}\/\d{1,2}\/\d{1,2}/;
  if (isYYYYMMDD.test(humanizedDate)) {
    return new Date(humanizedDate);
  }

  const num = Number(humanizedDate.split(' ')[0]);
  if (isNaN(num)) {
    throw new Error(`${humanizedDate}는 날짜 형식에 맞지않습니다.`);
  }

  const type = humanizedDate.split(' ')[1];
  const date = new Date();

  switch (type) {
    case 'years':
    case 'year':
      date.setFullYear(date.getFullYear() - num);
      date.setDate(date.getDate() + 1);
      break;
    case 'months':
    case 'month':
      date.setMonth(date.getMonth() - num);
      date.setDate(date.getDate() + 1);
      break;
    case 'weeks':
    case 'week':
      const days = num * 7;
      date.setDate(date.getDate() - days + 1);
      break;
    case 'days':
    case 'day':
      date.setDate(date.getDate() - num + 1);
      break;
    default:
      throw new Error(`"${humanizedDate}"는 날짜 형식에 맞지않습니다. ex) 7 days ago, 1 month ago, YYYY/MM/DD, YYYY-MM-DD`);
  }

  return date;
}
