import { Pipe, PipeTransform } from '@angular/core';
import { DiseaseNames } from "../constants";

@Pipe({
  name: 'diseaseName',
  standalone: true
})
export class DiseaseNamePipe implements PipeTransform {
  transform(value: number): string {
    if (!value && value !== 0) return '';

    return DiseaseNames[value];
  }
}

