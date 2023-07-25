import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileDataFormService {

  constructor(private fb: FormBuilder) {
  }

  getFormGroup(): FormGroup {
    return this.fb.group({
      firstName: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,100}')]],
      lastName: [null, [Validators.required, Validators.maxLength(100), Validators.pattern('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{1,100}')]],
      email: [null, [Validators.required, Validators.email]],
      pesel: [null, [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern('[0-9]{11}')]],
      street: [null, [Validators.required, Validators.maxLength(100)]],
      streetNumber: [null, [Validators.required, Validators.maxLength(10)]],
      postalCode: [null, [Validators.required, Validators.maxLength(5)]],
      city: [null, [Validators.required, Validators.maxLength(100)]],
      phoneNumber: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]]
    });
  }

  convertFormToUserRequest(form: FormGroup, user: User): User {
    let userRequest = new User();
    userRequest.firstName = this.getFirstNameControl(form).value;
    userRequest.lastName = this.getLastNameControl(form).value;
    userRequest.email = this.getEmailControl(form).value;
    userRequest.pesel = this.getPeselControl(form).value;
    userRequest.street = this.getStreetControl(form).value;
    userRequest.streetNumber = this.getStreetNumberControl(form).value;
    userRequest.postalCode = this.getPostalCodeControl(form).value;
    userRequest.city = this.getCityControl(form).value;
    userRequest.phoneNumber = this.getPhoneNumber(form).value;
    userRequest.password = user.password;
    return userRequest;
  }

  prepareForm(form: FormGroup, user: User) {
    this.getFirstNameControl(form).setValue(user.firstName);
    this.getLastNameControl(form).setValue(user.lastName);
    this.getEmailControl(form).setValue(user.email);
    this.getEmailControl(form).disable();
    this.getPeselControl(form).setValue(user.pesel);
    this.getPeselControl(form).disable();
    this.getStreetControl(form).setValue(user.street);
    this.getStreetNumberControl(form).setValue(user.streetNumber);
    this.getPostalCodeControl(form).setValue(user.postalCode);
    this.getCityControl(form).setValue(user.city);
    this.getPhoneNumber(form).setValue(user.phoneNumber);
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

  isFormValid(form: FormGroup): boolean {
    return form.valid;
  }

}
