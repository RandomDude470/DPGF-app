import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse }from '@angular/common/http'
import { Observable ,tap,firstValueFrom, catchError, map, from, of} from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class AuthService {

  private AUTH_API_ROUTE:string = "http://127.0.0.1:5050/auth";

  constructor(private http : HttpClient) { }

  Login( data : Record<string,string>){

    return this.http.post(`${this.AUTH_API_ROUTE}/login`,JSON.stringify(data),{headers : {"Content-type" : "application/json"}})
    
    .pipe(
      map((resp)=>{
        let response = resp as Record<string,string>
        return [response["token"],"success"]
      }),
      catchError((err : HttpErrorResponse)=>{
        console.log(err.status);
      if (err.status == 401) {
        return of(["Incorrect email or password","error"])
      }
      else if (err.status == 404){
        return of(["Url not found Check url Spelling","error"])
      }else if(err.status == 0){
        return of(["Couldnt send Request","error"])
      }
      else{
        return of(["enternal server error","error"])
      }
      })
    )
    
    
    
    
    
      

    
  }


  Validate(Object : Record<string,string>) : Observable<boolean>{
    return this.http.post(`${this.AUTH_API_ROUTE}/validate`,JSON.stringify(Object),{headers : {"Content-type" : "application/json"}})
    .pipe(
      map((res)=>{
        let record = res as Record<string,string>
        if (record["status"] == "success") {
          return true
        }
        else{
          return false
        }
      }),
      catchError((err : HttpErrorResponse)=>{
        console.log(err.status);
        return of(false)
      })
    )
}



  Register(Object : Record<string,string>){

    return this.http.post(`${this.AUTH_API_ROUTE}/register`,JSON.stringify(Object),{headers : {"Content-type" : "application/json"}})
    
    .pipe(
      map((resp)=>{
        let response = resp as Record<string,string>
        return [response["token"],"success"]
      }),
      catchError((err : HttpErrorResponse)=>{
        console.log(err.status);
        if (err.status == 409) {
          return of(['Email already in use','error'])
        } else  {
          return of(['server error','error'])
        }
      })
    )

  }
}
