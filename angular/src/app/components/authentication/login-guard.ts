import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {CookieService} from "ngx-cookie-service";
import {User} from "../../models/user.model";
import {SideMenuService} from "../../services/side-menu/side-menu.service";

@Injectable()
export class LoginGuard implements CanActivate {
  currentRouting: string;
  currentRoutingPermissions: string[];
  cookieUser: string;
  user: User;
  userRoles: any[];

  constructor(protected router: Router, protected cookieService: CookieService, protected sideMenuService: SideMenuService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    this.currentRouting = route.routeConfig.path;
    this.cookieUser = this.cookieService.get('user');
    if (this.cookieUser.length === 0) {
      this.router.navigate(['**']);
      return false;
    }
    this.fillPermissionsForCurrentRouting();
    this.user = JSON.parse(this.cookieUser);
    this.userRoles = this.user.roles;
    if (this.doesUserIncludeAnyRoleOfTabRoles()) {
      return true;
    } else {
      this.router.navigate(['**']);
      return false;
    }
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
