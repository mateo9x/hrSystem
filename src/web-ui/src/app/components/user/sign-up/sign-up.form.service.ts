import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {

  form = this.fb.group({
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

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.form;
  }

  convertFormToUserRequest(): User {
    let user = new User();
    user.firstName = this.getFirstNameControl().value;
    user.lastName = this.getLastNameControl().value;
    user.email = this.getEmailControl().value;
    user.pesel = this.getPeselControl().value;
    user.password = this.getPasswordControl().value;
    user.password2 = this.getPassword2Control().value;
    user.street = this.getStreetControl().value;
    user.streetNumber = this.getStreetNumberControl().value;
    user.postalCode = this.getPostalCodeControl().value;
    user.city = this.getCityControl().value;
    user.phoneNumber = this.getPhoneNumber().value;
    return user;
  }

  getFirstNameControl(): AbstractControl {
    return this.form.get('firstName');
  }

  getLastNameControl(): AbstractControl {
    return this.form.get('lastName');
  }

  getEmailControl(): AbstractControl {
    return this.form.get('email');
  }

  getPeselControl(): AbstractControl {
    return this.form.get('pesel');
  }

  getPasswordControl(): AbstractControl {
    return this.form.get('password');
  }

  getPassword2Control(): AbstractControl {
    return this.form.get('password2');
  }

  getStreetControl(): AbstractControl {
    return this.form.get('street');
  }

  getStreetNumberControl(): AbstractControl {
    return this.form.get('streetNumber');
  }

  getPostalCodeControl(): AbstractControl {
    return this.form.get('postalCode');
  }

  getCityControl(): AbstractControl {
    return this.form.get('city');
  }

  getPhoneNumber(): AbstractControl {
    return this.form.get('phoneNumber');
  }

  clearForm(): void {
    this.form.reset();
  }

  isFormValid(): boolean {
    return this.form.valid && this.getPasswordControl().value === this.getPassword2Control().value && this.doesBothPasswordMatches();
  }

  doesBothPasswordMatches(): boolean {
    if ((this.getPasswordControl().value && this.getPassword2Control().value) && (this.getPasswordControl().value.length === this.getPassword2Control().value.length)) {
      return this.getPasswordControl().value as string === this.getPassword2Control().value as string;

    }
    return false;
  }

}
