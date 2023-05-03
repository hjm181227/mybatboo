export type PixelNumber = `${number}px` | '0';
export type PixelNumbers = PixelNumber |
  `${PixelNumber} ${PixelNumber}` |
  `${PixelNumber} ${PixelNumber} ${PixelNumber}` |
  `${PixelNumber} ${PixelNumber} ${PixelNumber} ${PixelNumber}`;
export type Percent = `${number}%`;

export type Variant = 'fill' | 'weak' | 'outline' | 'void';
