import { LoadChildrenCallback } from "@angular/router";

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
