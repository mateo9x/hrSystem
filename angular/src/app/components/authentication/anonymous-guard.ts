import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/user.model";

@Injectable()
export class AnonymousGuard implements CanActivate {
  cookieUser: string;
  user: User;
  userRoles: any[];

  constructor(protected router: Router, protected cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    this.cookieUser = this.cookieService.get('user');
    if (this.cookieUser.length > 0) {
      this.router.navigate(['**']);
      return false;
    }
    return true;
  }
}
