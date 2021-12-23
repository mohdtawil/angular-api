import { AbstractControl } from '@angular/forms';

export function ValidateSpaceInTitle(control: AbstractControl) {
    console.log(control.value);
  if (control.value.indexOf(' ') >= 0) {
    return { invalidUrl: true };
  }
  return null;
}