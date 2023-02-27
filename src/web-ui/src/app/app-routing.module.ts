import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./components/user/sign-in/sign-in.component";
import {PageNotFoundComponent} from "./components/handlers/page-not-found/page-not-found.component";
import {InfoComponent} from "./components/info/info.component";
import {SignUpComponent} from "./components/user/sign-up/sign-up.component";
import {ResetPasswordComponent} from "./components/user/reset-password/reset-password.component";
import {NewPasswordComponent} from "./components/user/new-password/new-password.component";
import {UsersComponent} from "./components/admin/users/users.component";
import {
  AttendanceWorkReportComponent
} from "./components/work-time-report/attendance-work-report/attendance-work-report.component";
import {LoginGuard} from "./components/authentication/login-guard";
import {ProfileComponent} from "./components/user/profile/profile-component";
import {ProfileGuard} from "./components/authentication/profile-guard";
import {AnonymousGuard} from "./components/authentication/anonymous-guard";
import {HolidayRequestComponent} from "./components/work-time-report/holiday-request/holiday-request.component";
import {
  HolidayRequestConfirmationComponent
} from "./components/work-time-report/holiday-request-confirmation/holiday-request-confirmation.component";
import {NewAnnotationComponent} from "./components/admin/new-annotation/new-annotation.component";
import {
  AttendanceWorkWeekComponent
} from "./components/work-time-report/attendance-work-week/attendance-work-week.component";
import {
  AttendanceWorkReportEditComponent
} from "./components/work-time-report/attendance-work-report-edit/attendance-work-report-edit.component";

const routes: Routes = [
  { path: '', component: InfoComponent, title: 'Info' },
  { path: 'sign-in', component: SignInComponent, canActivate: [AnonymousGuard], title: 'Logowanie' },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AnonymousGuard], title: 'Rejestracja' },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AnonymousGuard], title: 'Resetowanie hasła' },
  { path: 'new-password', component: NewPasswordComponent, canActivate: [AnonymousGuard], title: 'Nowe hasło' },
  { path: 'users', component: UsersComponent, canActivate: [LoginGuard], title: 'Użytkownicy' },
  { path: 'attendance-work-report', component: AttendanceWorkReportComponent, canActivate: [LoginGuard], title: 'Zgłoszenie obecności w pracy' },
  { path: 'attendance-work-report-edit', component: AttendanceWorkReportEditComponent, canActivate: [LoginGuard], title: 'Edycja obecności w pracy' },
  { path: 'attendance-work-week', component: AttendanceWorkWeekComponent, canActivate: [LoginGuard], title: 'Obecności w pracy' },
  { path: 'holiday-request', component: HolidayRequestComponent, canActivate: [LoginGuard], title: 'Wnioski urlopowe' },
  { path: 'holiday-request-confirmation', component: HolidayRequestConfirmationComponent, canActivate: [LoginGuard], title: 'Akceptacja wniosków urlopowych' },
  { path: 'new-annotation', component: NewAnnotationComponent, canActivate: [LoginGuard], title: 'Powiadomienie użytkowników' },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard], title: 'Profil', loadChildren: () => import('./components/user/profile/profile-routing.module').then(m => m.ProfileRoutingModule)},
  { path: '**', component: PageNotFoundComponent, title: 'Strona nie znaleziona' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
