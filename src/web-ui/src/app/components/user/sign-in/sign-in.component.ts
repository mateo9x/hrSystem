import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthenticationRequest, AuthenticationService} from "../../../services/authentication.service";

@Component({
  selector: 'sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  request: AuthenticationRequest = new AuthenticationRequest();

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  signInUser() {
    if (this.request.email && this.request.password) {
        this.authenticationService.signinUser(this.request);
    }
  }

  signUp() {
    this.router.navigate(['sign-up']);
  }

  resetPassword() {
    this.router.navigate(['reset-password']);
  }

}
