import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  Url : string = 'http://127.0.0.1:5050/api'

  constructor(private http  : HttpClient) { 
    
  }

  getData() : Observable<[Record<string,string>] | number>{
    let token = localStorage.getItem('TOKEN') as string
    return this.http.get(this.Url+'/getprojects',{headers : {'content-type' : 'application/json' , 'authorization'  : token}})
    .pipe(
      map(obj => obj as [Record<string,string>]),
      catchError((err : HttpErrorResponse)=>{
        console.log(err.status);
        if ( [400,401,404].includes(err.status)) {
          return of(err.status)
        } else {
          return of(500)
        }
        
        
      })
    )
  }

  saveNewProject (body :any ) : Observable<string> { 
    let token = localStorage.getItem('TOKEN') as string
    return this.http.post(this.Url+'/saveprojects',body,{headers : {'content-type' : 'application/json' , 'authorization' : token}})
    .pipe(
      map((res)=>{
        let record = res as Record<string,string>
        if (record['status'] == 'success') {
          return 'ok'
        }else{
          return 'error'
        }
      }),
      catchError((err : HttpErrorResponse)=>{
        return of('error')
      })
    )
  }


  GetProjectByIdAndCheckDpgf(id : string | null){
    let token = localStorage.getItem('TOKEN') as string
    let payload  = {
      _id : id
    }
    return this.http.post(this.Url+'/getprojectbyid',payload,{headers : {'content-type' : 'application/json' , 'authorization' : token}})
    
  }
DeletePeroject(id : string){
  let token = localStorage.getItem('TOKEN') as string
  return this.http.post(this.Url+'/deleteProject', {id}, {headers : {'content-type' : 'application/json' , 'authorization' : token}})
}

}
