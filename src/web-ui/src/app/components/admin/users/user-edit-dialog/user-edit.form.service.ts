import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserEditFormService {

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
      phoneNumber: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      selectedRoles: ['', []]
    });
  }

  setupForm(form: FormGroup, user: User) {
    this.getFirstNameControl(form).setValue(user.firstName);
    this.getLastNameControl(form).setValue(user.lastName);
    this.getEmailControl(form).setValue(user.email);
    this.getEmailControl(form).disable();
    this.getPeselControl(form).setValue(user.pesel);
    this.getPeselControl(form).disable();
    this.getSelectedRoleControl(form).setValue(user.roles);
    this.getStreetControl(form).setValue(user.street);
    this.getStreetNumberControl(form).setValue(user.streetNumber);
    this.getCityControl(form).setValue(user.city);
    this.getPostalCodeControl(form).setValue(user.postalCode);
    this.getPhoneNumberControl(form).setValue(user.phoneNumber);
  }

  convertFormToUserRequest(form: FormGroup, userExisting: User): User {
    let user = new User();
    user.firstName = this.getFirstNameControl(form).value;
    user.lastName = this.getLastNameControl(form).value;
    user.email = this.getEmailControl(form).value;
    user.pesel = this.getPeselControl(form).value;
    user.street = this.getStreetControl(form).value;
    user.streetNumber = this.getStreetNumberControl(form).value;
    user.postalCode = this.getPostalCodeControl(form).value;
    user.city = this.getCityControl(form).value;
    user.phoneNumber = this.getPhoneNumberControl(form).value;
    user.roles = this.getSelectedRoleControl(form).value;
    user.password = userExisting.password;
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

  getPhoneNumberControl(form: FormGroup): AbstractControl {
    return form.get('phoneNumber');
  }

  getSelectedRoleControl(form: FormGroup): AbstractControl {
    return form.get('selectedRoles');
  }

}
