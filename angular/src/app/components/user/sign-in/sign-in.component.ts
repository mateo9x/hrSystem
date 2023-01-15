import {Component, Inject, OnInit} from "@angular/core";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  email: string;
  password: string;
  rememberMe: boolean;

  constructor(private userService: UserService, private router: Router,
              @Inject(AppComponent) private appComponent: AppComponent) {
  }

  ngOnInit() {
  }

  signInUser() {
      const authenticateRequest = {
        email: this.email,
        password: this.password,
        rememberMe: this.rememberMe
      }

      if (sessionStorage.getItem('id_token') !== null) {
        // this.toastService.createErrorToast('Jesteś już zalogowany!');
      } else {
        this.userService.signinUser(authenticateRequest).subscribe((response) => {
          // this.toastService.createSuccessToast('Zalogowano pomyślnie');
          this.appComponent.userLogged = true;
          sessionStorage.setItem('id_token', response.token);
        }, (error) => {
          // this.toastService.createErrorToast('Nie poprawne dane logowania!');
        });
      }
    }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }

}
