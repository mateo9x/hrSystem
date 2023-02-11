import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {APP_BASE_URL} from "../app.service";
import {CookieService} from "ngx-cookie-service";
import {BehaviorSubject} from "rxjs";
import {User} from "../models/user.model";
import {SnackBarService, SnackBarType} from "./material/snackbar.service";
import {AnnotationForUserWebsocketService} from "./websocket/annotation-for-user-websocket.service";
import {getThemeByValue, ThemeService} from "./theme/theme.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  userLogged = new BehaviorSubject(null);

  constructor(private http: HttpClient, private cookieService: CookieService,
              private annotationForUserWebsocketService: AnnotationForUserWebsocketService,
              private snackBarService: SnackBarService, private themeService: ThemeService,
              private router: Router) {
    if (this.cookieService.get('user')) {
      this.userLogged.next(JSON.parse(this.cookieService.get('user')));
    }
  }

  public signinUser(authenticationRequest: AuthenticationRequest) {
    if (this.cookieService.get('jwt')) {
      this.snackBarService.openSnackBar('Jesteś już zalogowany!', SnackBarType.WARN);
    } else {
      this.http.post<any>(`${APP_BASE_URL}/authenticate`, authenticationRequest).subscribe({
        next: (response) => {
          const jwt = response.token;
          this.getUserByCookieJWT().subscribe({
            next: (userByJWT) => {
              this.setUserLogged(userByJWT);
              this.setCookies(jwt, userByJWT, authenticationRequest.rememberMe);
              this.setUserTheme(userByJWT.theme);
              this.snackBarService.openSnackBar('Zalogowano pomyślnie', SnackBarType.SUCCESS);
              this.router.navigate(['']);
            }
          })
        }
      });
    }
  }

  public logoutUser() {
    this.http.post<any>(`${APP_BASE_URL}/logout-user`, {}).subscribe({
      next: (response) => {
        if (response) {
          this.clearCookies();
          this.setUserLogged(null);
          this.disconnectAnnotationWebSocket();
          this.snackBarService.openSnackBar('Wylogowano pomyślnie', SnackBarType.SUCCESS);
        }
      },
      error: () => {
        this.snackBarService.openSnackBar('Wylogowanie nie powiodło się', SnackBarType.ERROR);
      }
    });
  }

  public setUserLogged(user: User) {
    this.userLogged.next(user);
  }

  public getUserByCookieJWT() {
    return this.http.get<User>(`${APP_BASE_URL}/user`);
  }

  private clearCookies() {
    this.cookieService.delete('jwt');
    this.cookieService.delete('user');
  }

  private disconnectAnnotationWebSocket() {
    this.annotationForUserWebsocketService.disconnect();
  }

  private setUserTheme(theme: string) {
    this.themeService.setStyle(getThemeByValue(theme));
  }

  private setCookies(jwt: string, user: User, rememberMe: boolean) {
    // 1 day or 1 hour cookie expire
    this.cookieService.set('jwt', jwt, rememberMe ? 1 : 0.0416666666666667);
    this.cookieService.set('user', JSON.stringify(user), rememberMe ? 1 : 0.0416666666666667);
  }

}

export class AuthenticationRequest {
  email: string;
  password: string;
  rememberMe = false;
}
