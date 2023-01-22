import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/user.model";

@Injectable()
export class ProfileGuard implements CanActivate {
  cookieUser: string;
  user: User;
  userRoles: any[];

  constructor(protected router: Router, protected cookieService: CookieService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    this.cookieUser = this.cookieService.get('user');
    if (this.cookieUser.length === 0) {
      this.router.navigate(['**']);
      return false;
    }
    this.user = JSON.parse(this.cookieUser);
    this.userRoles = this.user.roles;
    if (this.doesUserHasAnyRoles()) {
      return true;
    } else {
      this.router.navigate(['**']);
      return false;
    }
  }

  protected doesUserHasAnyRoles(): boolean {
    return this.userRoles.length > 0;
  }
}
