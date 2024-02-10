import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DpgfService } from 'src/app/Services/dpgf.service';
import { Lot } from '../lot/lot.component';
import { catchError, findIndex, map, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export type dpgf = {
  _id: string;
  total: string;
  project: string;
  lots: Array<Lot>;
};
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  ///// Variables
  ProjectId: string | null = '';
  DPGF!: dpgf; // dpgf has everything all data
  LotList: Array<Record<string, string>> = []; //list of lots from dpgf
  showDefault = true;
  CurrentLot!: string;
  Total = 0;
  saving = false;

  ///// constructor
  constructor(
    private dpgf: DpgfService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  //// methods :
  CalcSum() {
    this.Total = 0;
    this.DPGF.lots.forEach((lot) => {
      if (!isNaN(Number(lot.total))) {
        this.Total += Number(lot.total);
      }
    });
    this.DPGF.total = String(this.Total);
  }
  isArray(arr: any) {
    return Array.isArray(arr);
  }
  getIdFromUrl() {
    this.route.paramMap.subscribe((r) => {
      this.ProjectId = r.get('id');
    });
  }

  InitializeDpgfAndLotList() {
    this.dpgf.getDpgf(this.ProjectId as string).subscribe((dpgf) => {
      if (typeof dpgf == 'number') {
        console.log('error fetching dpgf'.toUpperCase());
      }
      if (dpgf == null) {
        this.dpgf
          .CreateDpgfFor(this.ProjectId as string)
          .pipe(
            catchError((error: HttpErrorResponse) => {
              return of(error.status);
            })
          )
          .subscribe((re) => {
            console.log(re);
            if (re == null) {
              this.ngOnInit();
            }
          });
      } else {
        this.DPGF = dpgf as dpgf;

        this.DPGF.lots.forEach((lot) => {
          this.LotList.push({
            name: lot['name'] as string,
            _id: lot['_id'] as string,
            total: lot['total'] as string,
          });
          if (lot.sousLots == undefined || lot.sousLots == null) {
            lot.sousLots = [];
          }
          this.CurrentLot = this.DPGF.lots[0]._id;
        });
        this.Total = Number(this.DPGF.total);
        console.log(this.DPGF);
      }
    });
  }
  FindLotByIdAndReplace(ReplacementLot: Lot) {
    let i = 0;
    let flag = false;
    this.DPGF.lots.forEach((lot) => {
      if (lot._id == ReplacementLot._id) {
        this.DPGF.lots[i] = ReplacementLot;
        flag = true;
      }
      i++;
    });
    return flag;
  }
  UpdateLotList() {
    this.LotList = [];
    this.DPGF.lots.forEach((lot) => {
      this.LotList.push({
        name: lot['name'] as string,
        _id: lot['_id'] as string,
        total: lot['total'] as string,
      });
      if (lot.sousLots == undefined || lot.sousLots == null) {
        lot.sousLots = [];
      }
    });
  }
  fetchLotByIdAndDisplay(id: string) {
    for (let index = 0; index < this.DPGF.lots.length; index++) {
      const element = this.DPGF.lots[index];
      if (element._id == id) {
        return element;
      }
    }
    return this.DPGF.lots[0];
  }

  //lifecycle hooks

  ngOnInit() {
    this.getIdFromUrl();
    this.InitializeDpgfAndLotList();
  }

  ////// Event handlers
  OnNotifyNav(data: string) {
    console.log(JSON.stringify(data) + ' was clicked !');
    this.CurrentLot = data;
    this.showDefault = false;
  }
  OnNotifyDefaulrScreen(data: Object) {
    console.log(JSON.stringify(data) + ' was clicked !');
    let ndata = data as Record<string, string>;
    this.CurrentLot = ndata['id'];
    this.showDefault = false;
  }
  OnNotifyLot(event: Lot) {
    if (!this.FindLotByIdAndReplace(event)) {
      this.DPGF.lots.push(event);
    }
    this.UpdateLotList();
    this.CalcSum();
    console.log(this.DPGF);
  }
  Save() {
    this.saving = true;

    this.dpgf.SaveDPGF(this.DPGF).subscribe((status) => {
      if (status == 200) {
        console.log('saved');
        this.saving = false;
      } else {
        this.saving = false;
        alert('Error Status : ' + status);
      }
    });
  }
  AddNewLot() {
    this.DPGF.lots.push({
      _id: String(new Date().getTime()),
      name: 'New Lot',
      total: '0',
      sousLots: [],
    });
    this.UpdateLotList();
    this.CalcSum();
  }
}
