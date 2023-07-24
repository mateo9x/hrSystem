import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.model";
import {SnackBarService, SnackBarType} from "./material/snackbar.service";
import {AnnotationForUserWebsocketService} from "./websocket/annotation-for-user-websocket.service";
import {Router} from "@angular/router";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLogged = new BehaviorSubject(null);

  constructor(private http: HttpClient, private cookieService: CookieService,
              private annotationForUserWebsocketService: AnnotationForUserWebsocketService,
              private snackBarService: SnackBarService, private router: Router) {
  }

  public signinUser(authenticationRequest: AuthenticationRequest) {
    this.http.post<any>(`${environment.appBaseUrl}/authenticate`, authenticationRequest).subscribe({
      next: (response) => {
        const jwt = response.token;
        this.getUserByCookieJWT().subscribe({
          next: (userByJWT) => {
            this.setUserLogged(userByJWT);
            this.setCookies(jwt, userByJWT, authenticationRequest.rememberMe);
            this.router.navigate(['']).then(() => this.snackBarService.openSnackBar('Zalogowano pomyślnie', SnackBarType.SUCCESS));
          }
        });
      },
      error: (error) => {
        if (error.message) {
          this.snackBarService.openSnackBar(error.error.message, SnackBarType.ERROR);
        } else {
          this.snackBarService.openSnackBar('Autoryzacja nie udana', SnackBarType.ERROR);
        }
      }
    });
  }

  public logoutUser(logoutError: boolean) {
    this.http.post<any>(`${environment.appBaseUrl}/logout-user`, {}).subscribe({
      next: (response) => {
        if (response) {
          this.clearCookies();
          this.setUserLogged(null);
          this.disconnectAnnotationWebSocket();
          if (logoutError) {
            this.snackBarService.openSnackBar('Sesja wygasła - zaloguj się ponownie by kontynuować', SnackBarType.WARN);
            document.cookie = null;
            this.router.navigate(['']).then(() => window.location.reload());
          } else {
            this.snackBarService.openSnackBar('Wylogowano pomyślnie', SnackBarType.SUCCESS);
          }
        }
      },
      error: () => {
        if (!logoutError) {
          this.snackBarService.openSnackBar('Wylogowanie nie powiodło się', SnackBarType.ERROR);
        }
      }
    });
  }

  public setUserLogged(user: User) {
    this.userLogged.next(user);
  }

  public getUserByCookieJWT() {
    return this.http.get<User>(`${environment.appBaseUrl}/user`);
  }

  private clearCookies() {
    this.cookieService.delete('jwt');
  }

  private disconnectAnnotationWebSocket() {
    this.annotationForUserWebsocketService.disconnect();
  }

  private setCookies(jwt: string, user: User, rememberMe: boolean) {
    // 1 day or 1 hour cookie expire
    this.cookieService.set('jwt', jwt, rememberMe ? 1 : 0.0416666666666667);
  }

  logUserOnInit() {
    const jwt = this.cookieService.get('jwt');
    if (jwt) {
      this.getUserByCookieJWT().subscribe({
        next: (user) => {
          this.setUserLogged(user);
        }
      })
    }
  }

}

export class AuthenticationRequest {
  email: string;
  password: string;
  rememberMe = false;
}
