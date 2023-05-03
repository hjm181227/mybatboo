export function pSBC (
  p: number,
  c0: string,
  c1 = undefined,
  l = undefined
): string | null {
  let pSBCr = null;
  let r,
    g,
    b,
    P,
    f,
    t,
    h,
    a = typeof c1 == "string";
  const i = parseInt,
    m = Math.round;

  pSBCr = (d: any) => {
    let n = d.length;
    const x = {};
    if (n > 9) {
      ([ r, g, b, a ] = d = d.split(",")), (n = d.length);
      if (n < 3 || n > 4) {
        return null;
      }
      ((x as any).r = i(r[3] == "a" ? r.slice(5) : r.slice(4))),
        ((x as any).g = i(g)),
        ((x as any).b = i(b)),
        ((x as any).a = a ? parseFloat(a as any) : -1);
    } else {
      if (n == 8 || n == 6 || n < 4) {
        return null;
      }
      if (n < 6) {
        d =
          "#" +
          d[1] +
          d[1] +
          d[2] +
          d[2] +
          d[3] +
          d[3] +
          (n > 4 ? d[4] + d[4] : "");
      }
      d = i(d.slice(1), 16);
      if (n == 9 || n == 5) {
        ((x as any).r = (d >> 24) & 255),
          ((x as any).g = (d >> 16) & 255),
          ((x as any).b = (d >> 8) & 255),
          ((x as any).a = m((d & 255) / 0.255) / 1000);
      } else {
        ((x as any).r = d >> 16),
          ((x as any).g = (d >> 8) & 255),
          ((x as any).b = d & 255),
          ((x as any).a = -1);
      }
    }
    return x;
  };
  (h = c0.length > 9),
    (h = a ? ((c1 as any).length > 9 ? true : c1 == "c" ? !h : false) : h),
    (f = pSBCr(c0)),
    (P = p < 0),
    (t =
      c1 && c1 != "c"
        ? pSBCr(c1)
        : P
        ? { r: 0, g: 0, b: 0, a: -1 }
        : { r: 255, g: 255, b: 255, a: -1 }),
    (p = P ? p * -1 : p),
    (P = 1 - p);
  if (!f || !t) {
    return null;
  }
  if (l) {
    (r = m(P * (f as any).r + p * (t as any).r)),
      (g = m(P * (f as any).g + p * (t as any).g)),
      (b = m(P * (f as any).b + p * (t as any).b));
  } else {
    (r = m((P * (f as any).r ** 2 + p * (t as any).r ** 2) ** 0.5)),
      (g = m((P * (f as any).g ** 2 + p * (t as any).g ** 2) ** 0.5)),
      (b = m((P * (f as any).b ** 2 + p * (t as any).b ** 2) ** 0.5));
  }
  (a = (f as any).a),
    (t = (t as any).a),
    (f = (a as any) >= 0 || t >= 0),
    (a = f ? ((a as any) < 0 ? t : t < 0 ? a : (a as any) * P + t * p) : 0);
  if (h) {
    return (
      "rgb" +
      (f ? "a(" : "(") +
      r +
      "," +
      g +
      "," +
      b +
      (f ? "," + m((a as any) * 1000) / 1000 : "") +
      ")"
    );
  } else {
    return (
      "#" +
      (
        4294967296 +
        r * 16777216 +
        g * 65536 +
        b * 256 +
        (f ? m((a as any) * 255) : 0)
      )
        .toString(16)
        .slice(1, f ? undefined : -2)
    );
  }
};
