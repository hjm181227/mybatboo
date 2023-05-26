import { UrlSegment } from '@angular/router';

export const mainLayoutMatcher = (url: UrlSegment[]) => {
  if ([
    'main',
    'my-page',
    'my-page/category'
  ].includes(url[0]?.path)) {
    return { consumed: [] };
  }

  return null;
};
