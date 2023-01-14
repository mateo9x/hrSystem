import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AnonymousUserGuard implements CanActivate {
  constructor(protected router: Router) { }

  canActivate() {
    if (sessionStorage.getItem('id_token') !== null) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
}
