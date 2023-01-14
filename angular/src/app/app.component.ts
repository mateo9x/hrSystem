import {Component, HostListener, OnInit} from '@angular/core';

// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@HostListener('mouseover', ['$event'])
export class AppComponent implements OnInit {

  userLogged = false;
  categories: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }

  logOut() {
    sessionStorage.removeItem('id_token');
    this.userLogged = false;
  }

  displayCategory(categoryId: number) {

  }

}
