import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  @Input() LotList: Array<Record<string, string>> = [];
  @Output() notify: EventEmitter<string> = new EventEmitter();
  @Output() addLot: EventEmitter<any> = new EventEmitter();

  colors = [
    '#F44336', // red
    '#4CAF50', // green
    '#2196F3', // blue
    '#FFC107', // yellow
    '#9C27B0', // purple
    '#673AB7', // deep purple
    '#795548', // brown
    '#607D8B', // blue grey
    '#FF9800', // orange
    '#00BCD4', // cyan
  ];
  AddNewLot = false;

  OnClick(data: string) {
    this.notify.emit(data);
  }
  AddnewLot() {
    this.addLot.emit();
  }
}
