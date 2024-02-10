import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-default-screen',
  templateUrl: './default-screen.component.html',
  styleUrls: ['./default-screen.component.scss'],
})
export class DefaultScreenComponent implements OnInit {
  @Input() lotList: Array<Record<string, string>> = [];
  @Input() Total: number = 0;
  @Output() notify: EventEmitter<Object> = new EventEmitter();
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

  ngOnInit() {
    this.lotList.forEach((lot) => {
      console.log('total : ' + lot['total']);

      this.Total += Number(lot['total']);
    });
  }

  OnClick(data: string) {
    this.notify.emit({ id: data, total: this.Total });
  }
}
