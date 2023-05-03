import { rgbToHex } from "./convert-type";
import { pSBC } from "./pSBC";

export function darken (color: string, percent: number) {
  if(color.includes('rgb')) {
    color = rgbToHex(color);
  }
  if (percent > 1 || percent < 0) {
    return color;
  }

  return pSBC(-percent, color) || color;
}
