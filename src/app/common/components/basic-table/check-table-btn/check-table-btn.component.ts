import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {TableeBtn} from '../table.model';

@Component({
  selector: 'app-check-table-btn',
  templateUrl: './check-table-btn.component.html',
  styleUrls: ['./check-table-btn.component.scss']
})
export class CheckTableBtnComponent implements OnInit, OnChanges {

  @Input()
  public option: {
    width: any;
    header: {
      data: any;
      style: any;
    };
    Content: {
      data: any;
      styleone: any;
      styletwo: any;
    };
    type?: any;
    tableList?: TableeBtn[];
  };
  @Output()
  public detail = new EventEmitter<any>();
  @Output()
  public selectData =  new EventEmitter<number>();
  @Input()
  public select: any;
  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  public  DetailClick(e, value): void {
    // console.log(e);
    this.detail.emit({label: value, data: e});
  }
  // select Data
  public  selectClick(e): void {
    this.selectData.emit(this.select);
  }
  // cancel select data
  public  noSelectClick(e): void {
    this.selectData.emit(this.select);
  }

  public  checkClick(): void {
    this.selectData.emit(this.select);
  }
}
