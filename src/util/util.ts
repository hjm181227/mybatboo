import { LoadChildrenCallback } from "@angular/router";
import { CropNames, DiseaseNames } from "../constants";

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
