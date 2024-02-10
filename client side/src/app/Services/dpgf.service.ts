import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { dpgf } from '../dpgf/main/main.component';

@Injectable({
  providedIn: 'root'
})
export class DpgfService {

  url = 'http://127.0.0.1:5050/dpgf/'
  token = localStorage.getItem('TOKEN')

  constructor(private http : HttpClient) { }
  

  getListOfLotsByDpgfId (id : string | null) {
    
    
    return this.http.post(this.url + 'getListOfLots',{_id : id},{headers : {'content-type' : 'application/json' , 'authorization' : this.token as string}})
    .pipe(
      map((res)=>{
        let record  = res as  {lots : Array<Record<string,string>>}
        return record
      }),
      catchError((err : HttpErrorResponse)=>{
        console.log(err.status);
        return of(err.status)
        
      })
    )
   }
  getDpgf(id :string){
    return this.http.post(this.url + 'getDpgf',{_id:id},{headers : {'content-type' : 'application/json' , 'authorization' : this.token as string}})
    .pipe(
      map((obj)=>{
        return obj as Record<string,string | Array<Record<string , string | Array<Record<string , string | Array<Record<string , string>>>>>>>
      }),
      catchError((err : HttpErrorResponse)=>{
        if (err.status == 400){
          return of(400)
        }else{
          return of(500)
        }
      })
    )
   }
  SaveDPGF(dpgf : dpgf)  : Observable<number>{
    let token = (typeof(localStorage.getItem('TOKEN')) == 'string')? localStorage.getItem('TOKEN') : ''
    return this.http.post(this.url+'updateDpgf', JSON.stringify(dpgf) , {headers : {'content-type' : 'application/json' , 'authorization' :  token as string}})
    .pipe(
      map(()=>{
        return 200
      }),
      catchError ((err : HttpErrorResponse)=>{
        return of(err.status)
      })
    )
  }
  CreateDpgfFor(ProjectId : string){
    let token = (typeof(localStorage.getItem('TOKEN')) == 'string')? localStorage.getItem('TOKEN') : ''
    return this.http.post(this.url+'createDpgf',{_id : ProjectId}, {headers : {'content-type' : 'application/json' , 'authorization' :  token as string}})
  }
}
