import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthComponent} from "./auth/auth.component";
import {TestingComponent} from "./testing/testing.component";
import {RolesComponent} from "./roles/roles.component";
import {InfoComponent} from "./info/info.component";

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  { path: '',
    redirectTo: 'auth',
    pathMatch: 'full' },
  {
    path: 'testing',
    component: TestingComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
