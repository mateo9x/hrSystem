import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/user.model";

@Injectable()
export class AnonymousGuard implements CanActivate {
  user: User;

  constructor(protected cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const cookieUser = this.cookieService.get('user');
    return cookieUser.length <= 0;
  }

}
