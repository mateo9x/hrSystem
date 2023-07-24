import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/user.model";

@Injectable()
export class AnonymousGuard implements CanActivate {
  user: User;

  constructor(private cookieService: CookieService, private router: Router) {
  }

  canActivate() {
    const jwt = this.cookieService.get('jwt');
    if (jwt) {
      this.router.navigate(['']).then(() => {
        return true
      });
    }
    return false;
  }

}
