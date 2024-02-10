import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { RoutingModule } from './routing/routing.module';
import { ProjectListComponent } from './project-list/project-list.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutPageComponent } from './about-page/about-page.component';



@NgModule({
  declarations: [
    MainComponent,
    ProjectListComponent,
    AddProjectComponent,
    FormComponent,
    AboutPageComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProjectModule { }
