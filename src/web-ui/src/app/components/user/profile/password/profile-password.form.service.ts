import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ProfilePasswordFormService {

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      password2: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
    });
  }

  isFormValid(form: FormGroup) {
    return form.valid && this.getPasswordControl(form).value === this.getPassword2Control(form).value;
  }

  getPasswordControl(form: FormGroup): AbstractControl {
    return form.get('password');
  }

  getPassword2Control(form: FormGroup): AbstractControl {
    return form.get('password2');
  }
}
