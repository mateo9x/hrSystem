import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./components/user/sign-in/sign-in.component";
import {PageNotFoundComponent} from "./components/handlers/page-not-found/page-not-found.component";
import {InfoComponent} from "./components/info/info.component";
import {SignUpComponent} from "./components/user/sign-up/sign-up.component";
import {ResetPasswordComponent} from "./components/user/reset-password/reset-password.component";
import {NewPasswordComponent} from "./components/user/new-password/new-password.component";

const routes: Routes = [
  { path: '', component: InfoComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'new-password', component: NewPasswordComponent},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
