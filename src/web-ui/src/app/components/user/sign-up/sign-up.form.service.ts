import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,100}')]],
      lastName: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,100}')]],
      email: [null, [Validators.required, Validators.email]],
      pesel: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]{11}')]],
      password: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      password2: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      street: [null, [Validators.required, Validators.maxLength(100)]],
      streetNumber: [null, [Validators.required, Validators.maxLength(10)]],
      postalCode: [null, [Validators.required, Validators.maxLength(5)]],
      city: [null, [Validators.required, Validators.maxLength(100)]],
      phoneNumber: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
    });
  }

  convertFormToUserRequest(form: FormGroup): User {
    let user = new User();
    user.firstName = this.getFirstNameControl(form).value;
    user.lastName = this.getLastNameControl(form).value;
    user.email = this.getEmailControl(form).value;
    user.pesel = this.getPeselControl(form).value;
    user.password = this.getPasswordControl(form).value;
    user.password2 = this.getPassword2Control(form).value;
    user.street = this.getStreetControl(form).value;
    user.streetNumber = this.getStreetNumberControl(form).value;
    user.postalCode = this.getPostalCodeControl(form).value;
    user.city = this.getCityControl(form).value;
    user.phoneNumber = this.getPhoneNumber(form).value;
    return user;
  }

  getFirstNameControl(form: FormGroup): AbstractControl {
    return form.get('firstName');
  }

  getLastNameControl(form: FormGroup): AbstractControl {
    return form.get('lastName');
  }

  getEmailControl(form: FormGroup): AbstractControl {
    return form.get('email');
  }

  getPeselControl(form: FormGroup): AbstractControl {
    return form.get('pesel');
  }

  getPasswordControl(form: FormGroup): AbstractControl {
    return form.get('password');
  }

  getPassword2Control(form: FormGroup): AbstractControl {
    return form.get('password2');
  }

  getStreetControl(form: FormGroup): AbstractControl {
    return form.get('street');
  }

  getStreetNumberControl(form: FormGroup): AbstractControl {
    return form.get('streetNumber');
  }

  getPostalCodeControl(form: FormGroup): AbstractControl {
    return form.get('postalCode');
  }

  getCityControl(form: FormGroup): AbstractControl {
    return form.get('city');
  }

  getPhoneNumber(form: FormGroup): AbstractControl {
    return form.get('phoneNumber');
  }

  clearForm(form: FormGroup): void {
    form.reset();
  }

  isFormValid(form: FormGroup): boolean {
    return form.valid && this.getPasswordControl(form).value === this.getPassword2Control(form).value && this.doesBothPasswordMatches(form);
  }

  doesBothPasswordMatches(form: FormGroup): boolean {
    if ((this.getPasswordControl(form).value && this.getPassword2Control(form).value) && (this.getPasswordControl(form).value.length === this.getPassword2Control(form).value.length)) {
      return this.getPasswordControl(form).value as string === this.getPassword2Control(form).value as string;

    }
    return false;
  }

}
