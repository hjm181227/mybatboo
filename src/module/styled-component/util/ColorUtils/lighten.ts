import { pSBC } from './pSBC';

export function lighten (hexColor: string, percent: number) {
  if (percent > 1 || percent < 0) {
    return hexColor;
  }

  return pSBC(percent, hexColor) || hexColor;
}
