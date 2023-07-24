import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {CookieService} from "ngx-cookie-service";
import {catchError} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private cookieService: CookieService, private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('jwt');
    let newRequest;
    if (!!token) {
      document.cookie = token;
      newRequest = request.clone({
        withCredentials: true
      });
    } else {
      document.cookie = null;
      newRequest = request.clone({
        withCredentials: true
      });
    }
    return next.handle(newRequest).pipe(catchError((err) => {
      if (err.status === 401 || err.status === 403) {
        this.authenticationService.logoutUser(true);
      }
      throw err;
    }));
  }
}
