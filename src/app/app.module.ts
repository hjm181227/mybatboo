import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "../app.route";
import { SyntaxSharedModule } from "../module/shared/syntax-shared.module";
import { AppComponent } from './app.component';
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { _getGlobalReducers, GLOBAL_EFFECTS, REDUCERS_TOKEN } from "../ngrx";
import { StorageService } from "../service/storage.service";
import { httpInterceptorProviders } from "../config/http-interceptor";
import { AppHeaderComponent } from "../component/app-header/app-header.component";
import { DefaultLayoutComponent } from "../page/default-layout/default-layout.component";
import { LottieModule } from "ngx-lottie";
import { provideStyledFontLoaders } from "../util/font-loader";
import { ArmoryModule } from "@mapiacompany/armory";
import { environment } from "../environments/environment";
import { ModalModule } from "@mapiacompany/ngx-bootstrap-modal";
import { MpAlertModule } from "@mapiacompany/styled-components";

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent
  ],
  imports: [
    AppHeaderComponent,
    AppRoutingModule,
    SyntaxSharedModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(REDUCERS_TOKEN),
    EffectsModule.forRoot(GLOBAL_EFFECTS),
    LottieModule.forRoot({ player: playerFactory }),
    ArmoryModule.forRoot('mms', environment.env as any),
    ModalModule.forRoot({
      appId: `mybatboo`
    }),
    // MpAlertModule.forRoot(AlertServiceImpl, 'MOBILE'),
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: REDUCERS_TOKEN, useFactory: _getGlobalReducers },
    StorageService,
    ...httpInterceptorProviders,
    provideStyledFontLoaders(),
    {
      provide: APP_INITIALIZER,
      useFactory: () => {
        return () => {
          import('webfontloader').then(WebFont => {
            // esbuild에서는 WebFont.default를 쓰고, webpack에서는 WebFont로 쓰게 되서 임시로 넣어둠. 나중에 esbuild로 전환되면 지울 것
            WebFont = typeof WebFont.default !== 'undefined' ? WebFont.default : WebFont;

            WebFont.load({
              events: false, classes: false,
              google: {
                families: [
                  // ...initFonts, ...lazyFonts,
                  'Material Icons Round',
                ]
              },
            });;

            WebFont.load({
              events: true, classes: false,
              active: () => {
                document.querySelector('#material-icon-hide')?.remove();
              },
              inactive: () => {
                document.querySelector('#material-icon-hide')?.remove();
              },
              custom: {
                families: [ 'Line Awesome Brands', 'Line Awesome Free', 'Material Icons', 'Material Icons Outlined' ],
                urls: [ '/styles-lineawesome.css', '/styles-material.css' ],
              },
            })
          });
        }
      },
      deps: [],
      multi: true
    }
  ],
})
export class AppModule {
}
