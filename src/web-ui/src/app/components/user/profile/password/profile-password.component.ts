import {Component, OnInit} from '@angular/core';
import {UserApiService} from 'src/app/services/api/user-api.service';
import {SnackBarService, SnackBarType} from "../../../../services/material/snackbar.service";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {

  userId: number;
  password: string;
  password2: string;

  constructor(private authenticationService: AuthenticationService, private userService: UserApiService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.authenticationService.getUserByCookieJWT().subscribe({
      next: (response) => {
        this.userId = response.id;
      }
    });
  }

  updateUserPassword() {
    if (this.userId) {
      const request = new ProfilePasswordRequest(this.userId, this.password);
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

export class ProfilePasswordRequest {
  userId: number;
  newPassword: string;

  constructor(userId: number, newPassword: string) {
    this.userId = userId;
    this.newPassword = newPassword;
  }
}
