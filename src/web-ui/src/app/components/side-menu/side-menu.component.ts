import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {SideMenuModel, SideMenuService} from "../../services/side-menu/side-menu.service";
import {Router} from "@angular/router";
import {UserApiService} from "../../services/api/user-api.service";
import {User} from "../../models/user.model";
import {SnackBarService, SnackBarType} from "../../services/material/snackbar.service";

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, OnChanges {
  tabs: SideMenuModel[] = [];
  @Input() userLogged: User;

  constructor(private sideMenuService: SideMenuService, private router: Router,
              private userService: UserApiService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    if (this.userLogged) {
      this.filterTabsForUserRoles(this.sideMenuService.getSideMenuTabs());
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.userLogged = changes.userLogged.currentValue;
    if (this.userLogged) {
      this.filterTabsForUserRoles(this.sideMenuService.getSideMenuTabs());
    }
  }

  expandRow(tab: SideMenuModel) {
    tab.expanded = !tab.expanded;
  }

  openSelectedRoutingComponent(subTab: SideMenuModel) {
    if (subTab.routing) {
      this.router.navigate([subTab.routing]);
    }
  }

  showInfoSideMenuDialog() {
    this.snackBarService.openSnackBar('W celu uzyskania dostępu do funkcjonalności aplikacji - zaloguj się', SnackBarType.WARN);
  }

  filterTabsForUserRoles(tabs: SideMenuModel[]) {
    let tabsFiltered: any[] = [];
    if (this.userLogged.roles.length > 0) {
      this.userLogged.roles.forEach((role) => {
        const tabsFound = tabs.filter(tab => tab.roles.includes(role));
        tabsFound.forEach(tab => {
          if (!tabsFiltered.includes(tab)) {
            tabsFiltered.push(tab);
          }
        });
      });
    }
    //filtered main tabs
    this.tabs = tabsFiltered;
    this.filterSubTabsForUserRoles();
  }

  filterSubTabsForUserRoles() {
    let subTabsFiltered: any[] = [];
    if (this.userLogged.roles.length > 0) {
      this.userLogged.roles.forEach((role) => {
        let subTabsForRoleFiltered: any[] = [];
        this.tabs.forEach((tab, index) => {
          tab.childs.forEach(subTab => {
            if (subTab.roles.includes(role) && !subTabsForRoleFiltered.includes({
              subTab: subTab,
              mainTabIndex: index
            })) {
              subTabsForRoleFiltered.push({subTab: subTab, mainTabIndex: index})
            }
          });
        });
        subTabsFiltered.push(subTabsForRoleFiltered);
      });

      this.tabs.forEach((tab, index) => {
        tab.childs = [];
        subTabsFiltered.forEach(subTabForRole => {
          subTabForRole.forEach(subTab => {
            if (subTab.mainTabIndex === index && !tab.childs.includes(subTab.subTab)) {
              tab.childs.push(subTab.subTab);
            }
          })
        });
      });
    }
  }


}
