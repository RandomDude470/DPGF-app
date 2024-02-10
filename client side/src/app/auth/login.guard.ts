import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {inject} from "@angular/core"
import { AuthService } from '../Services/auth.service';
import { tap } from 'rxjs';

export const loginGuard: CanActivateFn = (route, state) => {
  const cookie = inject(CookieService)
  const auth = inject(AuthService)
  const router = inject(Router)

  let token = localStorage.getItem("TOKEN") as string
  console.log(`Token from auth guard  : ${token}`);
  let Observable = auth.Validate({"token" : token})
  return Observable.pipe(
    tap((res)=>{
      console.log('boolean : '+res);
      
      if (res) {
        return true
      } else {
        router.navigate(["/auth/login"])
        return false
      }
    })
  )
  


    
  
};
