import { Pipe, PipeTransform } from '@angular/core';
import { CropNames } from "../constants";

@Pipe({
  name: 'cropName',
  standalone: true
})
export class CropNamePipe implements PipeTransform {
  transform(value: number): string {
    if (!value && value !== 0) return '';

    return CropNames[value];
  }
}

