import { Pipe, PipeTransform } from '@angular/core';
import { DiseaseNames } from "../constants";

@Pipe({
  name: 'diseaseName',
  standalone: true
})
export class DiseaseNamePipe implements PipeTransform {
  transform(value: number): string {
    if (!value && value !== 0) return '';

    switch (value) {
      case 0:
      case 3:
      case 6:
      case 9:
        return '정상';
    }
    return DiseaseNames[value];
  }
}

