import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/user.model";

@Injectable()
export class ProfileGuard implements CanActivate {
  user: User;
  userRoles: any[];

  constructor(protected cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    const cookieUser = this.cookieService.get('user');
    if (cookieUser.length === 0) {
      return false;
    }
    this.user = JSON.parse(cookieUser);
    this.userRoles = this.user.roles;
    return this.doesUserHasAnyRoles();
  }

  protected doesUserHasAnyRoles(): boolean {
    return this.userRoles.length > 0;
  }
}
