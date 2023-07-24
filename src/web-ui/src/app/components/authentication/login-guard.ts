import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {SideMenuService} from "../../services/side-menu/side-menu.service";
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class LoginGuard implements CanActivate {
  currentRouting: string;
  currentRoutingPermissions: string[];
  userRoles: any[];

  constructor(private cookieService: CookieService, private sideMenuService: SideMenuService,
              private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    this.currentRouting = route.routeConfig.path;
    const jwt = this.cookieService.get('jwt');
    if (!jwt) {
      return false;
    }
    this.fillPermissionsForCurrentRouting();
    this.authenticationService.userLogged.subscribe({
      next: (user) => {
        if (user) {
          this.userRoles = user.roles;
          return this.doesUserIncludeAnyRoleOfTabRoles();
        }
        return false;
      }
    });
  }

  protected fillPermissionsForCurrentRouting() {
    this.sideMenuService.getSideMenuTabs().forEach(tab => {
      const foundTab = tab.childs.find(childTab => childTab.routing === this.currentRouting);
      if (foundTab) {
        this.currentRoutingPermissions = foundTab.roles;
      }
    });
  }

  protected doesUserIncludeAnyRoleOfTabRoles(): boolean {
    let result = false;
    this.currentRoutingPermissions.forEach(currentRoutingPermission => {
      if (this.userRoles.includes(currentRoutingPermission)) {
        result = true;
        return;
      }
    });
    return result;
  }
}
