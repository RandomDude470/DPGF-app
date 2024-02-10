import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingAuthModule } from './routing-auth.module';



@NgModule({
  declarations: [
    FormComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RoutingAuthModule
  ],
  exports : [
    LoginComponent,
    RegisterComponent,
    
  ]
})
export class AuthModule { }
