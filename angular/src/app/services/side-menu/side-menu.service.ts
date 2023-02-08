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
        label: 'RCP',
        expanded: false,
        routing: null,
        roles: ['ROLE_ADMIN', 'ROLE_EMPLOYER', 'ROLE_EMPLOYER_SUPERVISOR', 'ROLE_WORKER'],
        childs: [
          {
            label: 'Zgłoszenie obecności w pracy',
            expanded: false,
            routing: 'attendance-work-report',
            roles: ['ROLE_ADMIN', 'ROLE_EMPLOYER', 'ROLE_EMPLOYER_SUPERVISOR', 'ROLE_WORKER'],
            childs: null
          },
          {
            label: 'Obecności w pracy',
            expanded: false,
            routing: 'attendance-work-week',
            roles: ['ROLE_ADMIN', 'ROLE_EMPLOYER', 'ROLE_EMPLOYER_SUPERVISOR', 'ROLE_WORKER'],
            childs: null
          },
          {
            label: 'Edycja obecności w pracy',
            expanded: false,
            routing: 'attendance-work-report-edit',
            roles: ['ROLE_ADMIN', 'ROLE_EMPLOYER', 'ROLE_EMPLOYER_SUPERVISOR'],
            childs: null
          },
          {
            label: 'Wnioski urlopowe',
            expanded: false,
            routing: 'holiday-request',
            roles: ['ROLE_ADMIN', 'ROLE_EMPLOYER', 'ROLE_EMPLOYER_SUPERVISOR', 'ROLE_WORKER'],
            childs: null
          },
          {
            label: 'Akceptacja wniosków urlopowych',
            expanded: false,
            routing: 'holiday-request-confirmation',
            roles: ['ROLE_ADMIN', 'ROLE_EMPLOYER', 'ROLE_EMPLOYER_SUPERVISOR'],
            childs: null
          }
        ]
      },
      {
        label: 'Administracja',
        expanded: false,
        routing: null,
        roles: ['ROLE_ADMIN', 'ROLE_EMPLOYER', 'ROLE_EMPLOYER_SUPERVISOR'],
        childs: [
          {
            label: 'Użytkownicy',
            expanded: false,
            routing: 'users',
            roles: ['ROLE_ADMIN'],
            childs: null
          },
          {
            label: 'Powiadomienie użytkowników',
            expanded: false,
            routing: 'new-annotation',
            roles: ['ROLE_ADMIN', 'ROLE_EMPLOYER', 'ROLE_EMPLOYER_SUPERVISOR'],
            childs: null
          }
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
