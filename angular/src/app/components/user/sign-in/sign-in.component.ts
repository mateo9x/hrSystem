import {Component, Inject, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  username: string;
  password: string;
  rememberMe: boolean;

  constructor(private userService: UserService, private router: Router,
              @Inject(AppComponent) private appComponent: AppComponent) {
  }

  ngOnInit() {
  }

  signInUser() {
    if (this.username !== undefined && this.password !== undefined) {
      const userObj = {
        username: this.username,
        password: this.password,
        rememberMe: this.rememberMe
      }

      if (sessionStorage.getItem('id_token') !== null) {
        // this.toastService.createErrorToast('Jesteś już zalogowany!');
      } else {
        this.userService.signinUser(userObj).subscribe((response) => {
          // this.toastService.createSuccessToast('Zalogowano pomyślnie');
          this.appComponent.userLogged = true;
          sessionStorage.setItem('id_token', response.token);
        }, (error) => {
          // this.toastService.createErrorToast('Nie poprawne dane logowania!');
        });
      }
    }
  }

  signUp() {
    this.router.navigate(['sign-up-user']);
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }

}
