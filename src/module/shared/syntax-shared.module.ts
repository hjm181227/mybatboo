import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {
  DsSpinner, MpAdornmentDirective,
  MpBadge,
  MpButton,
  MpDivider,
  MpHelperText,
  MpIcon,
  MpIconButton, MpPositionLeftDirective, MpPositionRightDirective,
  MpText
} from "@mapiacompany/styled-components";
import { ArmoryModule, LetDirective } from "@mapiacompany/armory";
import { TranslateModule } from "@mapiacompany/ngx-translate";

const components = [
  MpIcon,
  MpIconButton,
  MpButton,
  MpText,
  MpDivider,
  MpHelperText,
  MpBadge,
  DsSpinner
];

const directives = [
  MpPositionLeftDirective,
  MpPositionRightDirective,
  MpAdornmentDirective,
  LetDirective,
];

const pipes = [
];

@NgModule({
  declarations: [],
  imports: [
    ArmoryModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    ...components,
    ...directives,
    ...pipes
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...components,
    ...directives,
    ...pipes
  ]
})
export class SyntaxSharedModule {
}
