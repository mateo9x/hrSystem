import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {User} from 'src/app/models/user.model';
import {UserService} from 'src/app/services/user.service';
import {SnackBarService, SnackBarType} from "../../../services/material/snackbar.service";
import {SpinnerService} from "../../../services/material/spinner.service";

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: User = new User();
  loading: boolean;
  users: User[];

  constructor(private userService: UserService, private router: Router, private snackBarService: SnackBarService,
              private spinnerService: SpinnerService) {
  }

  ngOnInit() {
  }

  clear() {
    this.user.firstName = '';
    this.user.lastName = '';
    this.user.password = '';
    this.user.password2 = '';
    this.user.pesel = '';
    this.user.email = '';
    this.user.street = '';
    this.user.streetNumber = '';
    this.user.postalCode = '';
    this.user.city = '';
    this.user.phoneNumber = '';
  }

  register() {
    this.spinnerService.setLoading(true);
    this.userService.createUser(this.user).subscribe({
      next: () => {
        this.snackBarService.openSnackBar('Utworzono użytkownika pomyślnie', SnackBarType.SUCCESS);
        this.spinnerService.setLoading(false);
        this.router.navigate(['']);
      },
      error: (errorResponse) => {
        this.snackBarService.openSnackBar(errorResponse.error.message, SnackBarType.ERROR);
        this.spinnerService.setLoading(false);
      }
    });
  }

}
