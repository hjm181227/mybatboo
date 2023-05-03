import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzFormModule } from "ng-zorro-antd/form";
import { BadgeModule, ButtonModule, IconModule } from "ng-zorro-antd-mobile";
import { NzIconModule } from "ng-zorro-antd/icon";
import { CameraFill, CameraOutline, HomeFill, HomeOutline, UserOutline } from "@ant-design/icons-angular/icons";

const icons = [ HomeOutline, HomeFill, CameraFill, CameraOutline, UserOutline ];

const NzModules = [
  BadgeModule,
  ButtonModule,
  NzButtonModule,
  IconModule,
  NzFormModule,
  NzCardModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...NzModules,
    NzIconModule.forRoot(icons)

  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...NzModules,
    NzIconModule
  ]
})
export class SharedModule {
}
