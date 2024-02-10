import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  //Input
  @Input() fieldList: string[][] = [];
  @Input() title: string = '';
  @Input() formType: string = 'register';

  @Input() button: string = '';
  @Input() error: string | undefined;
  //Outut
  @Output() notify = new EventEmitter();
  //internal
  form = this.formbuilder.array([]);
  emptyFields = false;
  public formInputs: any = {
    register: [
      ['Username', 'text'],
      ['Email', 'text'],
      ['Password', 'password'],
    ],
    login: [
      ['Email', 'text'],
      ['Password', 'password'],
    ],
    projects: [
      ['name', 'text'],
      ['adresse', 'text'],
      ['budget', 'number'],
      ['surface', 'number'],
      ['date', 'date'],
    ],
  };
  NewFieldCounter: number = 1;
  //// methods
  constructor(private formbuilder: FormBuilder) {}
  ngOnInit() {
    this.formInputs[this.formType].forEach(() => {
      let newcontrol = this.formbuilder.control('', {
        validators: [Validators.required],
      });
      this.form.push(newcontrol);
    });
  }
  
  OnSubmit() {
    
    if (this.form.valid) {
      this.emptyFields = false;
      let newRecord: Record<string, any> = {};
      newRecord['Lots'] = [];
      let i = 0;
      this.formInputs[this.formType].forEach((field: string) => {
        if (i<=4) {
          
          newRecord[field[0].toLowerCase()] = this.form.value.at(i) as string;
        } else {
          newRecord["Lots"].push({name  : this.form.value.at(i)})
        }
        i++;
      });
      this.notify.emit(newRecord);
      console.log(newRecord);
    } else {
      this.emptyFields = true;
    }
  }

  OnClickAddField() {
    console.log('stuff happeninng');

    let newcontrol = this.formbuilder.control('', {
      validators: [Validators.required],
    });
    this.form.push(newcontrol);
    this.formInputs[this.formType].push([
      'Lot ' + this.NewFieldCounter,
      'text',
    ]);
    this.NewFieldCounter++;
    // console.log(this.fieldList);

    // this.ngOnInit()
  }
}
