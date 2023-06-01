import { LoadChildrenCallback } from "@angular/router";
import { CropNames, DiseaseNames } from "../constants";
import { distinctUntilChanged, fromEvent, map, Observable, tap } from "rxjs";

export function idleImport(factory: () => Promise<any>): LoadChildrenCallback {
  return () => new Promise((resolve, reject) => {
    let handle: any;
    handle = requestIdleCallback(() => {
      try {
        factory().then(resolve, reject);
      } catch (e) {
        reject(e);
      } finally {
        cancelIdleCallback(handle);
      }
    }, {
      timeout: 10000
    });
  });
}

export function getDiseaseName(diseaseCode: number) {
  if (!diseaseCode && diseaseCode !== 0) return '';

  switch (diseaseCode) {
    case 0:
    case 3:
    case 6:
    case 9:
      return '정상';
  }
  return DiseaseNames[diseaseCode];
}

export function getCropName(cropCode: number) {
  if (!cropCode && cropCode !== 0) return '';

  return CropNames[cropCode];
}

export function matchMedia$<T>(
  size: Partial<{
    xs: T,
    sm: T,
    md: T,
    lg: T,
  }>,
  defaultValue: T
): Observable<T> {
  const mediaQuery = {
    xs: '(max-width: 480px)',
    sm: '(max-width: 1024px)',
    md: '(max-width: 1140px)',
    lg: '(max-width: 1423px)'
  };
  const check = () => {
    if (!size) return defaultValue;
    return size[Object.keys(size)
      .filter(key => window.matchMedia(mediaQuery[key]).matches)[0]] || defaultValue;
  };
  return new Observable((observer) => {
    let reqId: number = requestAnimationFrame(() => {
      observer.next(check());
    });

    const sub = fromEvent(window, 'resize', { passive: true }).pipe(
      map(() => window.innerWidth),
      distinctUntilChanged(),
      map(() => check()),
      distinctUntilChanged(),
      tap(value => {
        if (reqId) cancelAnimationFrame(reqId);
        reqId = requestAnimationFrame(() => {
          observer.next(value);
        });
      }),
    ).subscribe();

    return () => sub.unsubscribe();
  });
}
