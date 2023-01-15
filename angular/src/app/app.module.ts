import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SignInComponent} from "./components/user/sign-in/sign-in.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {PageNotFoundComponent} from "./components/handlers/page-not-found/page-not-found.component";
import {FormsModule} from "@angular/forms";
import {AppInterceptor} from "./components/authentication/app-interceptor";
import {AnonymousUserGuard} from "./components/authentication/anonymous-user-guard";
import {LoginGuard} from "./components/authentication/login-guard";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {InfoComponent} from "./components/info/info.component";
import {SignUpComponent} from "./components/user/sign-up/sign-up.component";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@angular/material/snack-bar";
import {ResetPasswordComponent} from "./components/user/reset-password/reset-password.component";
import {NewPasswordComponent} from "./components/user/new-password/new-password.component";
import {SideMenuComponent} from "./components/side-menu/side-menu.component";
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatTableModule,
    MatIconModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 4500,
        horizontalPosition: "center",
        verticalPosition: "top"
      }
    },
    LoginGuard, AnonymousUserGuard,],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
