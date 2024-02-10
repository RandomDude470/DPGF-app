import { Component, Input, Output,EventEmitter,OnInit } from '@angular/core';
import { FormArray, FormBuilder,Validators } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  //Input
  @Input() fieldList: string[][] =[]
  @Input() title: string ='';
  @Input() formType: string ='register';
  
  @Input() button: string ='';
  @Input() error: string | undefined
  //Outut
  @Output() notify = new EventEmitter() 
  //internal
  form = this.formbuilder.array([])
  emptyFields = false
  public formInputs: any = {
    'register': [
      ['Username','text'],['Email','text'],['Password','password']
    ],
    'login': [
      ['Email','text'],['Password','password']
    ]
  };
//// methods
  constructor(private formbuilder : FormBuilder){}
  ngOnInit(){
    this.formInputs[this.formType].forEach(()=>{
      let newcontrol = this.formbuilder.control('',{validators : [Validators.required]})
      this.form.push(newcontrol)
    })
  }
  OnSubmit(){
    if (this.form.valid) {
      this.emptyFields =false
      let newRecord : Record<string , string>  = {}
      let i =0
      this.formInputs[this.formType].forEach((field : string)=>{
        newRecord[field[0].toLowerCase()] = this.form.value.at(i) as string
        i++ 
      })
      this.notify.emit(newRecord)
    }else {
      this.emptyFields = true
    }
  }
}
