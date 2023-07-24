import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user.model';
import {UserApiService} from 'src/app/services/api/user-api.service';
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {SpinnerService} from "../../../services/material/spinner.service";
import {SignUpFormService} from "./sign-up.form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  form: FormGroup;
  loading: boolean;
  users: User[];

  constructor(private formService: SignUpFormService,
              private userService: UserApiService,
              private router: Router,
              private snackBarService: SnackBarService,
              private spinnerService: SpinnerService) {
    this.form = this.formService.getFormGroup();
  }

  clear() {
    this.formService.clearForm(this.form);
  }

  register() {
    this.form.markAllAsTouched();
    if (this.formService.isFormValid(this.form)) {
      this.spinnerService.setLoading(true);
      this.userService.createUser(this.formService.convertFormToUserRequest(this.form)).subscribe({
        next: () => {
          this.snackBarService.openSnackBar('Utworzono użytkownika pomyślnie', SnackBarType.SUCCESS);
          this.spinnerService.setLoading(false);
          this.router.navigate(['']).then(() => this.clear());
        },
        error: (errorResponse) => {
          this.snackBarService.openSnackBar(errorResponse.error.message, SnackBarType.ERROR);
          this.spinnerService.setLoading(false);
        }
      });
    }
  }

  hasFormError(controlName: string, errorName: string): boolean {
    return this.form.get(controlName).hasError(errorName);
  }

}
