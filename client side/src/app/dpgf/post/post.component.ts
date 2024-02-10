import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() Post: {
    id: string;
    designation: string;
    pu: string;
    tva: string;
    total: string;
    unit: string;
    qte: string;
  } = {
    id: '',
    designation: '',
    pu: '',
    tva: '',
    total: '',
    unit: '',
    qte: ''
  };
  @Output() notify = new EventEmitter();
  form : FormGroup = new FormGroup({
    designation: new FormControl(this.Post.designation),
    qte: new FormControl(this.Post.qte),
    unit: new FormControl(this.Post.unit),
    tva: new FormControl(this.Post.tva),
    pu: new FormControl(this.Post.pu),
    total: new FormControl(this.Post.total),
  });
  total = 0;
  @ViewChild('des') des! : ElementRef<HTMLInputElement>;


  ngOnInit(){
   this.form.setValue({
    designation : this.Post.designation,
    qte : this.Post.qte,
    unit : this.Post.unit,
    tva : this.Post.tva,
    pu : this.Post.pu,
    total : this.Post.total,
   })
   this.total = Number(this.Post.total)
    
  }
  OnBlur() {
    let obj = this.form.value as Record<string, string>;
    if (this.Post.id != '') {
      obj['id'] = this.Post.id;
    } else {
      throw new Error('No Post Id');
    }
    let qte = Number(this.form.value.qte);
    let pu = Number(this.form.value.pu);
    let tva = isNaN(Number(this.form.value.tva))? 0: Number(this.form.value.tva);
    this.total = isNaN(pu) || isNaN(qte) ? 0 : pu * qte + (pu * qte * tva) / 100;
    obj['total'] = String(this.total);
    console.log(obj);
    this.notify.emit(obj);
    
  }
  
  
}
