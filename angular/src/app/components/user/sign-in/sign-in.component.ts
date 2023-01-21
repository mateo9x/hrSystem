import {Component, Inject, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../../app.component";
import {SnackBarService} from "../../../services/material/snackbar.service";
import {AuthenticationRequest, AuthenticationService} from "../../../services/authentication.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  request: AuthenticationRequest = new AuthenticationRequest();
  cookieJWT: string;

  constructor(private userService: UserService, private router: Router,
              @Inject(AppComponent) private appComponent: AppComponent,
              private snackBarService: SnackBarService, private authenticationService: AuthenticationService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.cookieJWT = this.cookieService.get('jwt');
  }

  signInUser() {
    if (this.request.email && this.request.password) {
      if (this.cookieJWT && this.cookieJWT.length > 0) {
        this.snackBarService.openSnackBar('Jesteś już zalogowany!');
      } else {
        this.authenticationService.signinUser(this.request).subscribe({
          next: (successResponse) => {
            this.userService.getUserByJWTToken().subscribe({
              next: (getUserByJWTTokenResponse) => {
                this.cookieService.set('jwt', successResponse.token);
                this.cookieService.set('user', JSON.stringify(getUserByJWTTokenResponse));
                this.snackBarService.openSnackBar('Zalogowano pomyślnie');
                this.appComponent.userLogged = getUserByJWTTokenResponse;
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
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }

}
