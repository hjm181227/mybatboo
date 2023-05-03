import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "../app.route";
import { SharedModule } from "../module/shared/shared.module";
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

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent
  ],
  providers: [
    { provide: REDUCERS_TOKEN, useFactory: _getGlobalReducers },
    StorageService,
    ...httpInterceptorProviders,
  ],
  imports: [
    AppHeaderComponent,
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(REDUCERS_TOKEN),
    EffectsModule.forRoot(GLOBAL_EFFECTS),
    LottieModule.forRoot({ player: playerFactory })
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
