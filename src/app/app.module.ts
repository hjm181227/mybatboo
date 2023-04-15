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

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    { provide: REDUCERS_TOKEN, useFactory: _getGlobalReducers },
    StorageService,
    ...httpInterceptorProviders,
  ],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(REDUCERS_TOKEN),
    EffectsModule.forRoot(GLOBAL_EFFECTS),
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
