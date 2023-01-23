import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/models/user.model';
import {UserService} from 'src/app/services/user.service';
import {SnackBarService, SnackBarType} from "../../../../services/material/snackbar.service";

@Component({
  selector: 'profile-data',
  templateUrl: './profile-data.component.html',
  styleUrls: ['./profile-data.component.scss']
})
export class ProfileDataComponent implements OnInit {

  user: User = new User();
  users: User[];

  constructor(private userService: UserService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.userService.getUserByJWTToken().subscribe({
      next: (userResponse) => {
        this.user = userResponse;
      },
      error: () => {
        this.user = new User();
        this.snackBarService.openSnackBar('Nie udało się wczytać danych użytkownika', SnackBarType.ERROR);
      }
    })
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
