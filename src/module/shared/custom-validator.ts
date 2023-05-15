import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static requiredSameValue(fc1: string, fc2: string): ValidatorFn | null {
    return (fg: AbstractControl): ValidationErrors | null => {
      return (fg.get(fc1).dirty && fg.get(fc2).dirty && fg.value[fc1] !== fg.value[fc2])
        ? { requiredSameValue: true } : null;
    };
  }

  static numberRange(params: Partial<{ min: number, max: number }>): ValidatorFn {
    return (fc: AbstractControl): ValidationErrors | null => {
      const { value } = fc;
      const { min, max } = params;
      if (min && value < min) {
        return { numberRange: true };
      }
      if (max && value > max) {
        return { numberRange: true };
      }
      return null;
    };
  }

  static notNumbersOnly(form: AbstractControl): ValidationErrors | null {
    return !isNaN(Number(form.value)) ? { notNumbersOnly: true } : null;
  }

  static numbersOnly(form: AbstractControl): ValidationErrors | null {
    return isNaN(Number.parseFloat(form.value)) ? { numbersOnly: true } : null;
  }

  static requiredArrayLength(): ValidatorFn {
    return (fc: AbstractControl): ValidationErrors | null => {
      return !fc.value?.length ? { requiredArrayLength: true } : null;
    };
  }
}
