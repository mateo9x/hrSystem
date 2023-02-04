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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppInterceptor} from "./components/authentication/app-interceptor";
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
import {UsersComponent} from "./components/admin/users/users.component";
import {MatSortModule} from "@angular/material/sort";
import {UserEditDialogComponent} from "./components/admin/users/user-edit-dialog/user-edit-dialog.component";
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "./components/dialogs/confirmation-dialog/confirmation-dialog.component";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {
  AttendanceWorkReportComponent
} from "./components/work-time-report/attendance-work-report/attendance-work-report.component";
import {ProfileComponent} from "./components/user/profile/profile-component";
import {ProfileGuard} from "./components/authentication/profile-guard";
import {ProfileDataComponent} from "./components/user/profile/data/profile-data.component";
import {ProfilePasswordComponent} from "./components/user/profile/password/profile-password.component";
import {AnonymousGuard} from "./components/authentication/anonymous-guard";
import {HolidayRequestComponent} from "./components/work-time-report/holiday-request/holiday-request.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {DatePipe} from "@angular/common";
import {
  HolidayRequestAddDialogComponent
} from "./components/work-time-report/holiday-request/add-dialog/holiday-request-add-dialog.component";
import {
  HolidayRequestConfirmationComponent
} from "./components/work-time-report/holiday-request-confirmation/holiday-request-confirmation.component";
import {
  HolidayRequestConfirmationEditDialogComponent
} from "./components/work-time-report/holiday-request-confirmation/edit-dialog/holiday-request-confirmation-edit-dialog.component";
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from "ngx-mask";
import {NewAnnotationComponent} from "./components/workers/new-annotation/new-annotation.component";
import {UserAnnotationsComponent} from "./components/user/annotations/user-annotations.component";
import {UserAnnotationsDialogComponent} from "./components/user/annotations/dialog/user-annotations-dialog.component";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {InformationDialogComponent} from "./components/dialogs/information-dialog/information-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    InfoComponent,
    SignInComponent,
    SignUpComponent,
    PageNotFoundComponent,
    ResetPasswordComponent,
    NewPasswordComponent,
    SideMenuComponent,
    UsersComponent,
    UserEditDialogComponent,
    ConfirmationDialogComponent,
    InformationDialogComponent,
    AttendanceWorkReportComponent,
    ProfileComponent,
    ProfileDataComponent,
    ProfilePasswordComponent,
    HolidayRequestComponent,
    HolidayRequestAddDialogComponent,
    HolidayRequestConfirmationComponent,
    HolidayRequestConfirmationEditDialogComponent,
    NewAnnotationComponent,
    UserAnnotationsComponent,
    UserAnnotationsDialogComponent
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
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaskDirective,
    NgxMaskPipe,
    MatTooltipModule,
    NgxMatSelectSearchModule
  ],
  providers: [
    provideNgxMask(),
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true},
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {
        duration: 4500,
        horizontalPosition: "center",
        verticalPosition: "top"
      }
    },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
    LoginGuard, ProfileGuard, AnonymousGuard, DatePipe],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
