import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/user.model";
import {SideMenuService} from "../../services/side-menu/side-menu.service";

@Injectable()
export class LoginGuard implements CanActivate {
  currentRouting: string;
  currentRoutingPermissions: string[];
  user: User;
  userRoles: any[];

  constructor(protected cookieService: CookieService, protected sideMenuService: SideMenuService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    this.currentRouting = route.routeConfig.path;
    const cookieUser = this.cookieService.get('user');
    if (cookieUser.length === 0) {
      return false;
    }
    this.fillPermissionsForCurrentRouting();
    this.user = JSON.parse(cookieUser);
    this.userRoles = this.user.roles;
    return this.doesUserIncludeAnyRoleOfTabRoles();
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
