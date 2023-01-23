import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  user: User = new User;
  token: string;

  constructor(private userService: UserService, private router: Router, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.token = this.router.routerState.snapshot.url;
    this.token = this.token.substring(14, this.token.length - 1);
  }

  savePassword() {
    this.user.resetToken = this.token;
    if (this.user.password) {
      this.userService.getByUserToken(this.token).subscribe((response) => {
        if (response !== null) {
          this.userService.updateUserPasswordByToken(this.user).subscribe((response) => {
            if (response) {
              this.snackBarService.openSnackBar('Hasło zaaktualizowane pomyślnie', SnackBarType.SUCCESS);
              this.router.navigate(['']);
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

}
