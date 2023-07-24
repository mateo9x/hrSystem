import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationRequest} from "../../../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class SignInFormService {
  form = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    rememberMe: [false, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.form;
  }

  convertFormToAuthenticationRequest(): AuthenticationRequest {
    let request = new AuthenticationRequest();
    request.email = this.getEmailControl().value;
    request.password = this.getPasswordControl().value;
    request.rememberMe = this.getRememberMeControl().value;
    return request;
  }

  isFormValid() {
    return this.form.valid;
  }

  getEmailControl(): AbstractControl {
    return this.form.get('email');
  }

  getPasswordControl(): AbstractControl {
    return this.form.get('password');
  }

  getRememberMeControl(): AbstractControl {
    return this.form.get('rememberMe');
  }
}
