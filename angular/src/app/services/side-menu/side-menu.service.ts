import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  constructor() {
  }

  public getSideMenuTabs(): SideMenuModel[] {
    return [
      {
        label: 'RCP', expandable: true, roles: ['ROLE_ADMIN, ROLE_WORKER'],
        childs: [
          {label: 'Zgłoszenie obecności w pracy', expandable: false, roles: ['ROLE_ADMIN, ROLE_WORKER'], childs: null},
          {label: 'Planowane urlopy', expandable: false, roles: ['ROLE_ADMIN, ROLE_WORKER'], childs: null}
        ]
      },
      {
        label: 'Finanse', expandable: true, roles: ['ROLE_ADMIN, ROLE_WORKER'],
        childs: [
          {label: 'Wynagrodzenie', expandable: false, roles: ['ROLE_ADMIN, ROLE_WORKER'], childs: null}
        ]
      }
    ]
  }

}

export class SideMenuModel {
  label: string;
  expandable: boolean;
  roles: any[];
  childs: SideMenuModel[];
}
