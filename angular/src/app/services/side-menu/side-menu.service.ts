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
        label: 'RCP', expanded: false, routing: null, roles: ['ROLE_ADMIN, ROLE_WORKER'],
        childs: [
          {label: 'Zgłoszenie obecności w pracy', expanded: false, routing: null, roles: ['ROLE_ADMIN, ROLE_WORKER'], childs: null},
          {label: 'Planowane urlopy', expanded: false, routing: null, roles: ['ROLE_ADMIN, ROLE_WORKER'], childs: null}
        ]
      },
      {
        label: 'Finanse', expanded: false, routing: null, roles: ['ROLE_ADMIN, ROLE_WORKER'],
        childs: [
          {label: 'Wynagrodzenie', expanded: false, routing: null, roles: ['ROLE_ADMIN, ROLE_WORKER'], childs: null}
        ]
      },
      {
        label: 'Administracja', expanded: false, routing: null, roles: ['ROLE_ADMIN'],
        childs: [
          {label: 'Uprawnienia użytkowników', expanded: false, routing: null, roles: ['ROLE_ADMIN'], childs: null}
        ]
      }
    ]
  }

}

export class SideMenuModel {
  label: string;
  expanded: boolean;
  routing: string;
  roles: any[];
  childs: SideMenuModel[];
}
