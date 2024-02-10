import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SousLot } from '../sous-lot/sous-lot.component';
import { FormControl } from '@angular/forms';

export type Lot = {
  _id: string;
  total: string; 
  name: string;
  sousLots: Array<SousLot>;
};

@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.scss'],
})
export class LotComponent implements OnInit {
  Total: number = 0;

  @Input() Lot: Lot = {
    _id: '3423434',
    total: '0',
    name: 'Lot 9',
    sousLots: [
      {
        id: 'sl11',
        name: 'sous lot 12',
        posts: [
          {
            id: '123',
            designation: 'whateveer',
            unit: 'm',
            total: '200',
            qte: '10',
            pu: '20',
            tva: '',
          },
          {
            id: '124',
            designation: 'whateveer',
            unit: 'm',
            total: '20',
            qte: '1',
            pu: '20',
            tva: '',
          },
        ],
        total: '220',
      },
      {
        id: 'sl12',
        name: 'sous lot 13',
        posts: [
          {
            id: '123',
            designation: 'whateveer',
            unit: 'm',
            total: '200',
            qte: '10',
            pu: '20',
            tva: '',
          },
          {
            id: '124',
            designation: 'whateveer',
            unit: 'm',
            total: '20',
            qte: '1',
            pu: '20',
            tva: '',
          },
        ],
        total: '220',
      },
    ],
  };
  @Output() notify = new EventEmitter();

  @Output() exit = new EventEmitter();
  name = new FormControl('');

  ///// logic functions
  CalcSum() {
    this.Total = 0;
    this.Lot.sousLots.forEach((sl) => {
      let total = Number(sl.total);
      if (!isNaN(total)) {
        this.Total += total;
        this.Lot.total = String(this.Total);
      }
    });
  }

  FindSousLotByIdAndReplace(replacement: SousLot) {
    let index = 0;
    let flag = 0;
    this.Lot.sousLots.forEach((sl) => {
      if (sl.id == replacement.id) {
        this.Lot.sousLots[index] = replacement;
        flag = 1;
      }
      index++;
    });
    return flag;
  }
  //////// Lifecycle Hooks

  ngOnInit() {
    this.CalcSum();
    this.name.setValue(this.Lot.name);
  }

  ///// event handlers
  OnNotify(event: SousLot) {
    console.log('Lot comp : ---------------');

    console.log(event);
    if (this.FindSousLotByIdAndReplace(event) == 0) {
      this.Lot.sousLots.push(event);
    }
    console.log(' Lot: ++++++++++++++++++');
    console.log(this.Lot);
    this.CalcSum();
    this.notify.emit(this.Lot);
  }
  AddSousLot() {
    this.Lot.sousLots.push({
      id: String(new Date().getTime()),
      name: 'Nouveau Sous-Lot',
      posts: [],
      total: '',
    });
  }
  UpdateName() {
    this.Lot.name = this.name.value as string;
    this.notify.emit(this.Lot);
  }
}
