import {Component, Inject, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
import {CookieService} from "ngx-cookie-service";
import {SnackBarService} from "../../../services/material/snackbar.service";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;
  rememberMe = false;
  cookieJWT: string;

  constructor(private userService: UserService, private router: Router,
              @Inject(AppComponent) private appComponent: AppComponent,
              private cookieService: CookieService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.cookieJWT = this.cookieService.get('jwt');
  }

  signInUser() {
    const authenticateRequest = {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    }

    if (this.cookieJWT.length > 0) {
      this.snackBarService.openSnackBar('Jesteś już zalogowany!');
    } else {
      this.userService.signinUser(authenticateRequest).subscribe({
        next: (successResponse) => {
          // if rememberMe 3 days cookie age, else 1 day
          this.userService.getUserByEmail(authenticateRequest.email).subscribe({
            next: (getUserByEmailResponse) => {
              this.cookieService.set('jwt', successResponse.token, this.rememberMe ? 3 : 1);
              this.snackBarService.openSnackBar('Zalogowano pomyślnie');
              this.appComponent.userLogged = getUserByEmailResponse;
              this.router.navigate(['']);
            }
          })
        },
        error: (errorResponse) => {
          if (errorResponse.error) {
            this.snackBarService.openSnackBar(errorResponse.error.message);
          } else {
            this.snackBarService.openSnackBar('Uwierzytelnienie nie udane');
          }
        }
      })
    }
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }

}
