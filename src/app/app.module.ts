import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from "../app.route";
import { SharedModule } from "../module/shared/shared.module";
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [
    AppRoutingModule,
    SharedModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {
}
