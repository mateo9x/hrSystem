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
import {NewAnnotationComponent} from "./components/work-time-report/new-annotation/new-annotation.component";

const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [AnonymousGuard] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [AnonymousGuard] },
  { path: 'reset-password', component: ResetPasswordComponent, canActivate: [AnonymousGuard] },
  { path: 'new-password', component: NewPasswordComponent, canActivate: [AnonymousGuard] },
  { path: 'users', component: UsersComponent, canActivate: [LoginGuard] },
  { path: 'attendance-work-report', component: AttendanceWorkReportComponent, canActivate: [LoginGuard] },
  { path: 'holiday-request', component: HolidayRequestComponent, canActivate: [LoginGuard] },
  { path: 'holiday-request-confirmation', component: HolidayRequestConfirmationComponent, canActivate: [LoginGuard] },
  { path: 'new-annotation', component: NewAnnotationComponent, canActivate: [LoginGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [ProfileGuard], loadChildren: () => import('./components/user/profile/profile-routing.module').then(m => m.ProfileRoutingModule)},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
