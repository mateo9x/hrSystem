import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {UserApiService} from "../../../services/api/user-api.service";
import {FormGroup} from "@angular/forms";
import {NewPasswordFormService} from "./new-password.form.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  form: FormGroup;
  token: string;

  constructor(private formService: NewPasswordFormService, private userService: UserApiService, private router: Router, private snackBarService: SnackBarService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    const url = this.router.routerState.snapshot.url;
    this.token = url.substring(14, url.length - 1);
    this.startPassword2Subscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  savePassword() {
    this.form.markAllAsTouched();
    if (this.formService.isFormValid(this.form)) {
      this.userService.getByUserToken(this.token).subscribe((response) => {
        if (response) {
          const passwordToSave = this.formService.getPasswordControl(this.form).value;
          const request = {newPassword: passwordToSave, token: this.token};
          this.userService.updateUserPasswordByTokenProcedure(request).subscribe((response) => {
            if (response) {
              this.router.navigate(['']).then(() => this.snackBarService.openSnackBar('Hasło zaaktualizowane pomyślnie', SnackBarType.SUCCESS));
            } else {
              this.snackBarService.openSnackBar('Hasło nie może być takie same jak poprzednie', SnackBarType.ERROR);
            }
          });
        } else {
          this.snackBarService.openSnackBar('Token stracił swoją ważność', SnackBarType.WARN);
        }
      });
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
