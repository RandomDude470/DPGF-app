import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { NavComponent } from './nav/nav.component';
import { DefaultScreenComponent } from './default-screen/default-screen.component';
import { LotComponent } from './lot/lot.component';
import { RoutingDpgfModule } from './routing-dpgf/routing-dpgf.module';
import { TestComponent } from './test/test.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SousLotComponent } from './sous-lot/sous-lot.component';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [
    MainComponent,
    NavComponent,
    DefaultScreenComponent,
    LotComponent,
    TestComponent,
    SousLotComponent,
    PostComponent,

  ],
  imports: [
    CommonModule,
    RoutingDpgfModule,
    ReactiveFormsModule
  ]
  ,exports:[
    RoutingDpgfModule
  ]
})
export class DPGFModule { }
