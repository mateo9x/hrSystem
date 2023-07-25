import {Component, OnInit} from '@angular/core';
import {UserApiService} from 'src/app/services/api/user-api.service';
import {SnackBarService, SnackBarType} from "../../../../services/material/snackbar.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {FormGroup} from "@angular/forms";
import {ProfileDataFormService} from "./profile-data.form.service";
import {User} from "../../../../models/user.model";

@Component({
  selector: 'profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {
  form: FormGroup;
  user: User;

  constructor(private formService: ProfileDataFormService,
              private authenticationService: AuthenticationService,
              private userService: UserApiService,
              private snackBarService: SnackBarService) {
    this.form = this.formService.getFormGroup();
  }

  ngOnInit() {
    this.authenticationService.getUserByCookieJWT().subscribe({
      next: (user) => {
        this.user = user;
        this.formService.prepareForm(this.form, user);
      },
      error: () => {
        this.snackBarService.openSnackBar('Nie udało się wczytać danych użytkownika', SnackBarType.ERROR);
      }
    });
  }

  updateUserData() {
    this.form.markAllAsTouched();
    if (this.formService.isFormValid(this.form)) {
      this.userService.updateUser(this.formService.convertFormToUserRequest(this.form, this.user)).subscribe({
        next: () => {
          this.snackBarService.openSnackBar('Dane zaaktualizowane pomyślnie', SnackBarType.SUCCESS);
        },
        error: (errorResponse) => {
          this.snackBarService.openSnackBar(errorResponse.error.message, SnackBarType.ERROR);
        }
      });
    }
  }

  hasFormError(controlName: string, errorName: string): boolean {
    return this.form.get(controlName).hasError(errorName);
  }


}
