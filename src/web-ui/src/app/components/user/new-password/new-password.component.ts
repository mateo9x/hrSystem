import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {

  password: string;
  password2: string;
  token: string;

  constructor(private userService: UserService, private router: Router, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    const url = this.router.routerState.snapshot.url;
    this.token = url.substring(14, url.length - 1);
  }

  savePassword() {
    if (this.password) {
      this.userService.getByUserToken(this.token).subscribe((response) => {
        if (response) {
          const request = {newPassword: this.password, token: this.token};
          this.userService.updateUserPasswordByTokenProcedure(request).subscribe((response) => {
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
