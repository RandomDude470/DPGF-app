import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { ProjectListComponent } from '../project-list/project-list.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { AboutPageComponent } from '../about-page/about-page.component';

const routes : Routes = [
  {path  : "projects" , component : MainComponent , children : [
    {path : "list" ,component : ProjectListComponent},
    {path  : "add" , component : AddProjectComponent},
    {path : "about/:id" , component : AboutPageComponent},
    {path : "" , redirectTo : "list" , pathMatch : "full"},
    {path : "**" , redirectTo : "list" , pathMatch : "full"}  
  ]},
  
  {path : "" , redirectTo : "/home/projects/list" , pathMatch : "full"},
  {path : "**" , redirectTo : "/home/projects/list" , pathMatch : "full"}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
