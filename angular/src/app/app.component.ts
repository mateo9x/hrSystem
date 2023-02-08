import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {SnackBarService, SnackBarType} from "./services/material/snackbar.service";
import {User} from "./models/user.model";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {CookieService} from "ngx-cookie-service";
import {AnnotationForUserWebsocketService} from "./services/websocket/annotation-for-user-websocket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@HostListener('mouseover', ['$event'])
export class AppComponent implements OnInit, OnDestroy {
  userLogged: User = null;
  cookieJWT: string;

  constructor(private snackBarService: SnackBarService, private authenticationService: AuthenticationService,
              private userService: UserService, private cookieService: CookieService, private annotationForUserWebsocketService: AnnotationForUserWebsocketService) {
  }

  ngOnInit() {
    this.cookieJWT = this.cookieService.get('jwt');
    if (this.cookieJWT && this.cookieJWT.length > 0) {
      this.userService.getUserByJWTToken().subscribe( {
        next: (getUserByJWTTokenResponse) => {
          this.userLogged = getUserByJWTTokenResponse;
        }
      });
    }
  }

  ngOnDestroy() {
    this.annotationForUserWebsocketService.disconnect();
  }

  logOut() {
    this.authenticationService.logoutUser().subscribe({
      next: (userLoggedOut) => {
        if (userLoggedOut) {
          this.cookieService.delete('jwt');
          this.cookieService.delete('user');
          this.snackBarService.openSnackBar('Wylogowano pomyślnie', SnackBarType.SUCCESS);
          this.userLogged = null;
          this.annotationForUserWebsocketService.disconnect();
        }
      },
      error: () => {
        this.snackBarService.openSnackBar('Wylogowanie nie powiodło się', SnackBarType.ERROR);
      }
    })
  }

}
