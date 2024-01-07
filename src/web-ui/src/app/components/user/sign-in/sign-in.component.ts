import {Component} from "@angular/core";
import {AuthenticationService} from "../../../services/authentication.service";
import {FormGroup} from "@angular/forms";
import {SignInFormService} from "./sign-in.form.service";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  form: FormGroup;

  constructor(private formService: SignInFormService,
              private authenticationService: AuthenticationService) {
    this.form = this.formService.getFormGroup();
  }

  signInUser() {
    this.form.markAllAsTouched();
    if (this.formService.isFormValid(this.form)) {
      this.authenticationService.signinUser(this.formService.convertFormToAuthenticationRequest(this.form));
    }
  }

  hasFormError(controlName: string, errorName: string): boolean {
    return this.form.get(controlName).hasError(errorName);
  }

}
