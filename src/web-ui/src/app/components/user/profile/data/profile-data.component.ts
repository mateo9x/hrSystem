import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user.model';
import {UserApiService} from 'src/app/services/api/user-api.service';
import {SnackBarService, SnackBarType} from "../../../../services/material/snackbar.service";
import {AuthenticationService} from "../../../../services/authentication.service";

@Component({
  selector: 'profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

  user: User = new User();
  users: User[];

  constructor(private authenticationService: AuthenticationService, private userService: UserApiService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.authenticationService.getUserByCookieJWT().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: () => {
        this.user = new User();
        this.snackBarService.openSnackBar('Nie udało się wczytać danych użytkownika', SnackBarType.ERROR);
      }
    });
  }

  updateUserData() {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Dane zaaktualizowane pomyślnie', SnackBarType.SUCCESS);
      },
      error: (errorResponse) => {
        this.snackBarService.openSnackBar(errorResponse.error.message, SnackBarType.ERROR);
      }
    });
  }

}
