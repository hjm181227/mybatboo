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
import { httpInterceptorProviders } from "../config/http-interceptor";
import { DefaultLayoutComponent } from "../page/default-layout/default-layout.component";
import { LottieModule } from "ngx-lottie";
import { provideStyledFontLoaders } from "../util/font-loader";
import { ArmoryModule, StorageService } from "@mapiacompany/armory";
import { environment } from "../environments/environment";
import { BsModalService, ModalModule } from "@mapiacompany/ngx-bootstrap-modal";
import { AlertService, MpAlertModule } from "@mapiacompany/styled-components";
import { AuthHandleMiddleware } from "../module/router-extend/auth-handle.middleware";
import { App } from '@capacitor/app';
import { ToastService } from "../service/toast.service";

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

export const ROUTE_INTERCEPTORS = [
  AuthHandleMiddleware
]

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent
  ],
  imports: [
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
    MpAlertModule.forRoot(AlertService, 'MOBILE'),
  ],
  bootstrap: [ AppComponent ],
  providers: [
    { provide: REDUCERS_TOKEN, useFactory: _getGlobalReducers },
    StorageService,
    ...httpInterceptorProviders,
    ...ROUTE_INTERCEPTORS,
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
            });

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
  constructor(
    private modalService: BsModalService,
    private toast: ToastService,
  ) {
  }

  ngOnInit() {
    App.addListener('backButton', (data: any) => {
      // modalService에 열려있는 모달이 있는 경우 모달 닫기
      const modalCount = this.modalService.getModalsCount();
      if (modalCount > 0) {
        this.modalService._hideModal();
      } else {
        // 뒤로가기 할 history가 남아있는 경우 뒤로가기
        if (window.history.length > 1) {
          window.history.back();
        } else {
          // 현재 경로가 '/main' 이고 1초 내에 처음 이 조건에 도달한 경우에는 toast 띄우고 두번째 도달하면 앱 종료
          if (window.location.pathname === '/main') {
            if (data.timestamp < 1000) {
              App.exitApp();
            } else {
              this.toast.show('뒤로가기 버튼을 한번 더 누르면 종료됩니다.');
            }
          }
        }
      }
    });
  }
}
