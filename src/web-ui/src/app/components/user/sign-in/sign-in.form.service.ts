import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../../../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SignInFormService {

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      rememberMe: [false, [Validators.required]]
    });
  }

  convertFormToAuthenticationRequest(form: FormGroup): AuthenticationRequest {
    let request = new AuthenticationRequest();
    request.email = this.getEmailControl(form).value;
    request.password = this.getPasswordControl(form).value;
    request.rememberMe = this.getRememberMeControl(form).value;
    return request;
  }

  isFormValid(form: FormGroup) {
    return form.valid;
  }

  getEmailControl(form: FormGroup): AbstractControl {
    return form.get('email');
  }

  getPasswordControl(form: FormGroup): AbstractControl {
    return form.get('password');
  }

  getRememberMeControl(form: FormGroup): AbstractControl {
    return form.get('rememberMe');
  }
}
