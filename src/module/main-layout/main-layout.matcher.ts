import { UrlSegment } from '@angular/router';

export const mainLayoutMatcher = (url: UrlSegment[]) => {
  if ([
    'main'
  ].includes(url[0]?.path) && url.length === 1) {
    return { consumed: [] };
  }

  return null;
};
