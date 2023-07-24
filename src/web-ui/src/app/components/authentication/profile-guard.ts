import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {User} from "../../models/user.model";
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class ProfileGuard implements CanActivate {
  userRoles: any[];

  constructor(protected authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    let result;
    this.authenticationService.userLogged.subscribe({
      next: (user) => {
        if (user) {
          result = this.doesUserHasAnyRoles(user);
        } else {
          result = false;
        }
      }
    })
    return result;
  }

  protected doesUserHasAnyRoles(user: User): boolean {
    return user.roles.length > 0;
  }
}
