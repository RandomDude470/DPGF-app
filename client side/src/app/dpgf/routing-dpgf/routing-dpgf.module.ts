import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../main/main.component';


const routes : Routes =[
 {path : ':id' , component : MainComponent},
 {path : "" ,redirectTo : '/home/projects/list',pathMatch: "full"},
 {path : "**" ,redirectTo : '/home/projects/list',pathMatch: "full"}
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],exports:[
    RouterModule
  ]
  
})
export class RoutingDpgfModule { }
