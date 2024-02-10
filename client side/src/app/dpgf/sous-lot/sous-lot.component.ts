import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

export type post   ={
  id: string;
  designation: string;
  unit: string;
  total: string;
  qte: string;
  pu: string;
  tva: string;
}
export type SousLot ={
  id : string,
  name : string,
  total  :string,
  posts : Array<post>
}

@Component({
  selector: 'app-sous-lot',
  templateUrl: './sous-lot.component.html',
  styleUrls: ['./sous-lot.component.scss']
})
export class SousLotComponent implements OnInit {
  @Input() SousLot! : SousLot ;
  
  // {
  //   id : '',
  //   name: 'sous lot 12',
  //   posts : [
  //     {
  //       id : '123', 
  //       designation : 'whateveer',
  //       unit : 'm',
  //       total : '200',
  //       qte : '10',
  //       pu : '20',
  //       tva : ''
  //     },
  //     {
  //       id : '124', 
  //       designation : 'whateveer',
  //       unit : 'm',
  //       total : '20',
  //       qte : '1',
  //       pu : '20',
  //       tva : ''
  //     }
  //   ],
  //   total : ''
  // }
  @Output() notify = new EventEmitter()

  name! : FormControl  
 
  isReady(souslot : SousLot){
    return !(souslot == undefined) 
  }
  calcSum(){
    let total = 0
    this.SousLot.posts.forEach((post)=>{
      let subtotal = Number(post.total)
      total += ( isNaN(subtotal)? 0 : subtotal)
    })
    return total
  }

  checkForIdAndReplace( replacement : post) : 1 | 0 {
    let i = 0 
    let flag : 1 | 0 = 0
    this.SousLot.posts.forEach((post)=>{
      if (post.id == replacement.id){
        this.SousLot.posts[i] = replacement
        flag =1
      }
      i++
    })
    return flag
  } 
  ngOnInit(){
    if (this.isReady(this.SousLot)) {
      
      this.name = new FormControl(this.SousLot.name)
      this.SousLot.name = this.name.value as string
      this.SousLot.total = String( this.calcSum())
    }
    
  }
  
  OnBlur(){
    this.SousLot.name = this.name.value as string
    this.notify.emit(this.SousLot)
  }
  OnNotify(data : post){
    if (this.checkForIdAndReplace(data) == 0) {
      data.id = String(new Date().getTime())
      this.SousLot.posts.push(data)
    }
    this.SousLot.total = String( this.calcSum())
    console.log("after save souslot");
    console.log(this.SousLot);
    this.notify.emit(this.SousLot)
    
    
  }
  OnClick(){
    this.SousLot.posts.push({
        id : String(new Date().getTime()), 
        designation : '',
        unit : '',
        total : '0',
        qte : '',
        pu : '',
        tva : ''
    })
  }
 
}
