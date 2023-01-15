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
  categories: any[] = [];

  constructor(private cookieService: CookieService, private snackBarService: SnackBarService) {
  }

  ngOnInit() {
    this.cookieService.set('hrSystem', 'hrSystem');
  }

  logOut() {
    this.cookieService.delete('jwt');
    this.userLogged = false;
    this.snackBarService.openSnackBar('Wylogowano pomyślnie');
  }

  displayCategory(categoryId: number) {

  }

}
