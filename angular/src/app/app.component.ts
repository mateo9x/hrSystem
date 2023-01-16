import {Component, HostListener, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {SnackBarService} from "./services/material/snackbar.service";
import {User} from "./models/user.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@HostListener('mouseover', ['$event'])
export class AppComponent implements OnInit {

  userLogged: User = null;

  constructor(private cookieService: CookieService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.cookieService.set('hrSystem', 'hrSystem');
  }

  logOut() {
    this.cookieService.delete('jwt');
    this.snackBarService.openSnackBar('Wylogowano pomyślnie');
    this.userLogged = null;
  }

}
