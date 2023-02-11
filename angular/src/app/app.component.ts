import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {User} from "./models/user.model";
import {AuthenticationService} from "./services/authentication.service";
import {SpinnerService} from "./services/material/spinner.service";
import {AnnotationForUserWebsocketService} from "./services/websocket/annotation-for-user-websocket.service";
import {Subscription} from "rxjs";
import {getThemeByValue, ThemeService} from "./services/theme/theme.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@HostListener('mouseover', ['$event'])
export class AppComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userLogged: User;
  loading = false;

  constructor(private authenticationService: AuthenticationService, private spinnerService: SpinnerService,
              private annotationForUserWebsocketService: AnnotationForUserWebsocketService, private themeService: ThemeService) {
  }

  ngOnInit() {
    this.userSubscription = this.authenticationService.userLogged.subscribe({
      next: (response) => {
       this.userLogged = response;
       if (response) {
         this.themeService.setStyle(getThemeByValue(response.theme));
       }
      }
    });
    this.prepareSpinner();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
    this.annotationForUserWebsocketService.disconnect();
  }

  prepareSpinner() {
    this.spinnerService.loading.subscribe({
      next: (response) => {
        this.loading = response;
      }
    });
  }

  logOut() {
    this.authenticationService.logoutUser();
  }

}
