import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = sessionStorage.getItem("id_token");

    if (!!idToken) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + idToken
        }
      });
    }
    return next.handle(request);
  }
}
