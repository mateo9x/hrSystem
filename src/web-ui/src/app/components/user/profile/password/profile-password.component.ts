import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserApiService} from 'src/app/services/api/user-api.service';
import {SnackBarService, SnackBarType} from "../../../../services/material/snackbar.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {FormGroup} from "@angular/forms";
import {ProfilePasswordFormService} from "./profile-password.form.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userId: number;
  form: FormGroup;

  constructor(private formService: ProfilePasswordFormService,
              private authenticationService: AuthenticationService,
              private userService: UserApiService,
              private snackBarService: SnackBarService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.authenticationService.getUserByCookieJWT().subscribe({
      next: (response) => {
        this.userId = response.id;
      }
    });
    this.startPassword2Subscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  updateUserPassword() {
    this.form.markAllAsTouched();
    if (this.formService.isFormValid(this.form)) {
      if (this.userId) {
        const request = new ProfilePasswordRequest(this.userId, this.formService.getPasswordControl(this.form).value);
        this.userService.updateUserPassword(request).subscribe({
          next: () => {
            this.snackBarService.openSnackBar('Hasło zaaktualizowane pomyślnie', SnackBarType.SUCCESS);
          },
          error: (errorResponse) => {
            this.snackBarService.openSnackBar(errorResponse.error.message, SnackBarType.ERROR);
          }
        });
      }
    }
  }

  startPassword2Subscription() {
    this.subscription = this.formService.getPassword2Control(this.form).valueChanges
      .subscribe({
        next: (value) => {
          const passwordControlValue = this.formService.getPasswordControl(this.form).value;
          const password2Control = this.formService.getPassword2Control(this.form);
          if ((value.length > 0 && passwordControlValue.length > 0) && passwordControlValue !== value) {
            password2Control.setErrors({passwordsDontMatch: true});
          } else {
            password2Control.setErrors(null);
          }
        }
      });
  }

  hasFormError(controlName: string, errorName: string) {
    return this.form.get(controlName).hasError(errorName);
  }
}


export class ProfilePasswordRequest {
  userId: number;
  newPassword: string;

  constructor(userId: number, newPassword: string) {
    this.userId = userId;
    this.newPassword = newPassword;
  }
}
