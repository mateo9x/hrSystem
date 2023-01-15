import {Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {SnackBarService} from "./services/material/snackbar.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@HostListener('mouseover', ['$event'])
export class AppComponent implements OnInit {

  userLogged = false;

  constructor(private cookieService: CookieService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.cookieService.set('hrSystem', 'hrSystem');
    console.log(sessionStorage)
    console.log(localStorage)
    console.log(this.cookieService.get('jwt'))
    if (this.cookieService.get('jwt')) {
      console.log('asd')
      this.userLogged = true;
    }
  }

  logOut() {
    this.cookieService.delete('jwt');
    this.userLogged = false;
    this.snackBarService.openSnackBar('Wylogowano pomyślnie');
  }

}
