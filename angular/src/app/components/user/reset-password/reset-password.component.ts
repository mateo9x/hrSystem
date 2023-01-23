import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  email: string;

  constructor(private userService: UserService, private router: Router, private snackBarService: SnackBarService) {
  }

  resetButton() {
    this.userService.doesUserWithEmailExists(this.email).subscribe((response) => {
      if (response) {
        this.userService.resetPassword(this.email).subscribe((response) => {
          this.snackBarService.openSnackBar('Wysłano link do zresetowania hasła na podany adres e-mail', SnackBarType.SUCCESS);
          this.router.navigate(['']);
        });
      } else {
        this.snackBarService.openSnackBar('Taki użytkownik nie istnieje w bazie danych!', SnackBarType.WARN);
      }
    });
  }

}
