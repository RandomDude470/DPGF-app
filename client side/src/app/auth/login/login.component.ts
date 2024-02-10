import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private Auth  : AuthService , private router : Router){}
  //Properties
  badLogin : undefined | string
  
  //Methods
  OnNotify(data : Record<string,string>){
    console.log(data);
    const showResult = (res : string[] |string)=> {
      console.log(`response from service : ${res}`);
      if (res[1] == "error") {
        this.badLogin = res[0]

      }else{
        localStorage.setItem('TOKEN',res[0])
        this.router.navigate(["/home"])
        
      }
      
    }

    this.Auth.Login(data)
    .subscribe(showResult)
  }
}
