import { Component, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { MpBadge } from "@mapiacompany/styled-components";

@Component({
  selector: 'crop-type-badge',
  standalone: true,
  imports: [
    CommonModule,
    MpBadge
  ],
  templateUrl: './crop-type-badge.component.html',
  styleUrls: ['./crop-type-badge.component.scss']
})
export class CropTypeBadge {
  @Input() cropType: number;

  iconProps = [
    {
      name: '고추',
      color: 'red'
    },
    {
      name: '딸기',
      color: 'redLight'
    },
    {
      name: '상추',
      color: 'green'
    },
    {
      name: '토마토',
      color: 'red'
    }
  ]
}
