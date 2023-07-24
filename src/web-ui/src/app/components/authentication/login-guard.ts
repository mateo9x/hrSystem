import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {SideMenuService} from "../../services/side-menu/side-menu.service";
import {AuthenticationService} from "../../services/authentication.service";

@Injectable()
export class LoginGuard implements CanActivate {
  currentRouting: string;
  currentRoutingPermissions: string[];
  userRoles: any[];

  constructor(private sideMenuService: SideMenuService,
              private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
    let result;
    this.currentRouting = route.routeConfig.path;
    this.fillPermissionsForCurrentRouting();
    this.authenticationService.userLogged.subscribe({
      next: (user) => {
        if (user) {
          this.userRoles = user.roles;
          result = this.doesUserIncludeAnyRoleOfTabRoles();
        } else {
          result = false;
        }
      }
    });
    return result;
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
