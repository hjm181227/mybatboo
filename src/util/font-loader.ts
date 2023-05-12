import { FactoryProvider, InjectionToken } from '@angular/core';


export class StyledFontLoader {
  constructor(
    public fontName: 'Material Icons' | 'Material Icons Outlined' | 'Line Awesome Free',
    public fontWeight: number = 400,
  ) {
  }

  markAsUsed(key: string) {
    // do nothing in browser
  }

  async render() {
    // do nothing in browser
  }
}

export type STYLED_FONT_LOADERS_TYPE = {
  las: StyledFontLoader,
  lar: StyledFontLoader,
  filled: StyledFontLoader,
  outlined: StyledFontLoader,
};
export const STYLED_FONT_LOADERS = new InjectionToken<STYLED_FONT_LOADERS_TYPE>('STYLED_FONT_LOADERS');

export function provideStyledFontLoaders(): FactoryProvider {
  return {
    provide: STYLED_FONT_LOADERS,
    useFactory: () => {
      return {
        la: new StyledFontLoader('Line Awesome Free'),
        filled: new StyledFontLoader('Material Icons'),
        outlined: new StyledFontLoader('Material Icons Outlined'),
      };
    },
  }
}
