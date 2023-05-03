import { pSBC } from "./pSBC";

export function rgbToHex ( rgbType: string ): string {
  /*
  ** 컬러값과 쉼표만 남기고 삭제하기.
  ** 쉼표(,)를 기준으로 분리해서, 배열에 담기.
  */
  var rgb = rgbType.replace( /[^%,.\d]/g, "" ).split( "," );

  rgb.forEach(function (str, x, arr){

    /* 컬러값이 "%"일 경우, 변환하기. */
    if ( str.indexOf( "%" ) > -1 ) str = Math.round( parseFloat(str) * 2.55 ).toString();

    /* 16진수 문자로 변환하기. */
    str = parseInt( str, 10 ).toString( 16 );
    if ( str.length === 1 ) str = "0" + str;

    arr[ x ] = str;
  });

  return "#" + rgb.join( "" );
}

export function hexToRgb (hex: string, opacity?: number) {
  hex = hex.trim();
  hex = hex[0] === '#' ? hex.substr(1) : hex;
  let bigint = parseInt(hex, 16), h = [];
  if (hex.length === 3) {
    h.push((bigint >> 4) & 255);
    h.push((bigint >> 2) & 255);
  } else {
    h.push((bigint >> 16) & 255);
    h.push((bigint >> 8) & 255);
  }
  h.push(bigint & 255);
  if (arguments.length === 2) {
    h.push(opacity);
    return 'rgba('+h.join()+')';
  } else {
    return 'rgb('+h.join()+')';
  }
}

export function parseToRgb (color: string): { r: number; g: number; b: number } {
  const parseRgbStringToArray = (rgbString: string) =>
    rgbString.split(",").map((v) => parseInt(v.replace(/^\D+/g, "")));

  if (color.includes("rgb")) {
    const [r, g, b] = parseRgbStringToArray(color);
    return { r, g, b };
  } else {
    const rgbFromHex = hexToRgb(color);
    const [r, g, b] = parseRgbStringToArray(rgbFromHex);
    return { r, g, b };
  }
}
