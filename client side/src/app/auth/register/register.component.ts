import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  //properties
  ErrorMessage : string | undefined

  constructor(private auth : AuthService, private router : Router){}
  OnNotify(data : Record<string,string>){
    console.log(data);

    this.auth.Register(data).pipe(
      tap((string)=>{
        if (string[1] == 'success') {
          localStorage.setItem('TOKEN', string[0])
          this.router.navigate(["/home"])
           
        } else {
          this.ErrorMessage = string[0]
        }
      })
    ).subscribe()
    

    
  }
}
