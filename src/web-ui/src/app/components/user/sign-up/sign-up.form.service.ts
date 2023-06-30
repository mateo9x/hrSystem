import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SignUpFormService {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
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

  public getFormGroup(): FormGroup {
    return this.form;
  }

  public convertFormToUserRequest(): User {
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

  public getFirstNameControl(): AbstractControl {
    return this.form.get('firstName');
  }

  public getLastNameControl(): AbstractControl {
    return this.form.get('lastName');
  }

  public getEmailControl(): AbstractControl {
    return this.form.get('email');
  }

  public getPeselControl(): AbstractControl {
    return this.form.get('pesel');
  }

  public getPasswordControl(): AbstractControl {
    return this.form.get('password');
  }

  public getPassword2Control(): AbstractControl {
    return this.form.get('password2');
  }

  public getStreetControl(): AbstractControl {
    return this.form.get('street');
  }

  public getStreetNumberControl(): AbstractControl {
    return this.form.get('streetNumber');
  }

  public getPostalCodeControl(): AbstractControl {
    return this.form.get('postalCode');
  }

  public getCityControl(): AbstractControl {
    return this.form.get('city');
  }

  public getPhoneNumber(): AbstractControl {
    return this.form.get('phoneNumber');
  }

  public clearForm(): void {
    this.getFirstNameControl().reset();
    this.getLastNameControl().reset();
    this.getEmailControl().reset();
    this.getPeselControl().reset();
    this.getPasswordControl().reset();
    this.getPassword2Control().reset();
    this.getStreetControl().reset();
    this.getStreetNumberControl().reset();
    this.getPostalCodeControl().reset();
    this.getCityControl().reset();
    this.getPhoneNumber().reset();
  }

  public isFormValid(): boolean {
    return this.form.status === 'VALID' && this.getPasswordControl().value === this.getPassword2Control().value;
  }

}
