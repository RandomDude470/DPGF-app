import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { loginGuard } from './auth/login.guard';

const routes: Routes = [
  {path : 'auth' , loadChildren : ()=>{return import('./auth/auth.module').then(res => res.AuthModule)}},
  {path : 'home' ,canActivate : [loginGuard], loadChildren : ()=>{return import('./project/project.module').then(res=>res.ProjectModule)}},
  {path : 'dpgf',canActivate : [loginGuard] , loadChildren : ()=>{return import('./dpgf/dpgf.module').then((mod)=>mod.DPGFModule)}},
  {path : '' ,redirectTo : '/home/projects/list' ,pathMatch : 'full'},
  {path : '**' ,redirectTo : '/home/projects/list' ,pathMatch : 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
