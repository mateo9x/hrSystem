import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {SnackBarService, SnackBarType} from "../../../../services/material/snackbar.service";

@Component({
  selector: 'profile-password',
  templateUrl: './profile-password.component.html',
  styleUrls: ['./profile-password.component.scss']
})
export class ProfilePasswordComponent implements OnInit {

  userId: number;
  password: string;
  password2: string;

  constructor(private userService: UserService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.userService.getUserByJWTToken().subscribe({
      next: (userResponse) => {
        this.userId = userResponse.id;
      }
    })
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
