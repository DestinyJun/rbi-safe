import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-pl-exam',
  templateUrl: './pl-exam.component.html',
  styleUrls: ['./pl-exam.component.scss']
})
export class PlExamComponent implements OnInit {
  @Output() nextChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() previousChange: EventEmitter<any> = new EventEmitter<any>();
  public traTabActiveIndex: number = 0;
  constructor() { }

  ngOnInit() {
  }

  // 操作
  public plExamOperate(flag: string, id?: any) {
    switch (flag) {
      case 'previous':
        this.previousChange.emit(id);
        break;
      // 下一步
      case 'next':
        this.previousChange.emit(id);
        break;
    }
  }
}
