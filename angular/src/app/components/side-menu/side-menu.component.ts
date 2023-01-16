import {Component, Input, OnInit} from '@angular/core';
import {SideMenuModel, SideMenuService} from "../../services/side-menu/side-menu.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user.model";
import {SnackBarService} from "../../services/material/snackbar.service";

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  tabs: SideMenuModel[] = [];
  @Input() userLogged: User;

  constructor(private sideMenuService: SideMenuService, private router: Router,
              private userService: UserService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.tabs = this.sideMenuService.getSideMenuTabs();
  }

  expandRow(tab: SideMenuModel) {
    tab.expanded = !tab.expanded;
  }

  openSelectedRoutingComponent(subTab: SideMenuModel) {
    this.router.navigate([subTab.routing]);
  }

  showInfoSideMenuDialog() {
    this.snackBarService.openSnackBar('W celu uzyskania dostępu do funkcjonalności aplikacji, zaloguj się');
  }

}
