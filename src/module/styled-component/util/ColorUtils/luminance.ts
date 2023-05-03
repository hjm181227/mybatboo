import { parseToRgb } from "./convert-type";

export function luminance (color: string): number {
  if (color === "transparent") {
    return 0;
  }
  const rgbColor: { [key: string]: number } = parseToRgb(color);
  const [r, g, b] = Object.keys(rgbColor).map((key) => {
    const channel = rgbColor[key] / 255;
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return parseFloat((0.2126 * r + 0.7152 * g + 0.0722 * b).toFixed(3));
}

export function isHighLuminance(color: string) {
  return luminance(color) > 0.5;
}
