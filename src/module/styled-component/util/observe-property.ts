// https://craftsmen.nl/angular-lifehack-reactive-component-input-properties/
// https://stackblitz.com/edit/angular-reactive-component-input-properties?file=app%2Ftimer.component.ts

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, pairwise } from 'rxjs/operators';

/**
 * property가 바뀔 때마다 RxJS observable이 돕니다.
 *
 * @Input() product: Product;
 *
 * product$ = observeProperty$(this, 'product').pipe(
 *
 * )
 */

const componentMap: WeakMap<object, { [componentProp: string]: BehaviorSubject<any> }> = new WeakMap();

export function observeProperty$<T extends object, K extends keyof T>(target: T, key: K): Observable<T[K]> {
  if (!componentMap.get(target)) {
    componentMap.set(target, {});
  }
  const propMap = componentMap.get(target);
  propMap[key as any] ??= new BehaviorSubject(target[key]);

  const subject: BehaviorSubject<T[K]> = propMap[key as any];

  Object.defineProperty(target, key, {
    get(): T[K] {
      return subject.getValue();
    },
    set(newValue: T[K]): void {
      if (newValue !== subject.getValue()) {
        subject.next(newValue);
      }
    },
    configurable: true
  });

  return subject.asObservable();
}

/**
 * @deprecated observeProperty$로 바뀌었습니다
 */
export function observeProperty<T extends object, K extends keyof T>(target: T, key: K): Observable<T[K]> {
  return observeProperty$(target, key);
}

export function propChange$<T extends object, K extends keyof T>(target: T, key: K): Observable<{ prev: T[K], curr: T[K] }> {
  return observeProperty$(target, key).pipe(
    distinctUntilChanged(),
    pairwise(),
    map(([ prev, curr ]) => ({ prev, curr }))
  );
}
