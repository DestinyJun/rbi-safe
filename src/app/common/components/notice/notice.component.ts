import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {

  @Output() noticeState = new EventEmitter();

  public eventNum = 7;
  public noticeItem = [
    {totalNum: 7, currageNum: 1, text: '安全环保部安全教育计划培训计划待设置', time: '2020年06月16日'},
    {totalNum: 7, currageNum: 2, text: '特种人员复审通知', time: '2020年06月16日'},
    {totalNum: 7, currageNum: 3, text: '综合部安全教育培训计划待设置', time: '2020年06月16日'},
    {totalNum: 7, currageNum: 4, text: '特种作业培训需求提报', time: '2020年06月16日'},
    {totalNum: 7, currageNum: 5, text: '矿业公司教育培训计划待设置', time: '2020年06月16日'},
    {totalNum: 7, currageNum: 2, text: '矿业公司教育培训计划待设置', time: '2020年06月16日'},
  ];
  constructor() { }

  ngOnInit() {
  }

  public close(): void {
    this.noticeState.emit(false);
  }

}
