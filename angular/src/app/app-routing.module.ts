import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SignInComponent} from "./components/user/sign-in/sign-in.component";
import {PageNotFoundComponent} from "./components/handlers/page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
