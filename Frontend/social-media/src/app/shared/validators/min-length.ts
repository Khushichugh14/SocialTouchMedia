import { AbstractControl, ValidatorFn } from '@angular/forms';

export function minLengthIfNotEmpty(minLength: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;

    if (!value || value.length < minLength) {
      return {
        minLengthIfNotEmpty: {
          requiredLength: minLength,
          actualLength: value ? value.length : 0
        }
      };
    }

    return null;
  };
}
