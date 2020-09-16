import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../../../../../../common/services/local-storage.service';
import {TopicFields} from '../../../../../../common/public/Api';

@Component({
  selector: 'app-exam-preview',
  templateUrl: './exam-preview.component.html',
  styleUrls: ['./exam-preview.component.scss']
})
export class ExamPreviewComponent implements OnInit {
  @Output() nextChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() previousChange: EventEmitter<any> = new EventEmitter<any>();
  public previewTitle: string; // 考试题目
  public previewList: TopicFields[] = []; // 题目列表
  constructor(
    private localSrv: LocalStorageService
  ) { }

  ngOnInit() {
    this.previewDataInit();
  }
  // 数据初始化
  private previewDataInit() {
    // 获取考试标题
    this.previewTitle = this.localSrv.getObject('safeTestPaper').testPaperName;
    // 获取题库
    this.previewList = this.localSrv.getObject('safeTestQuestionsList') || [];
    console.log(this.previewList);
  }

  // 操作
  public previewOperate(flag: string, item?: any, index?: any) {
    switch (flag) {
      case 'previous':
        this.previousChange.emit({activeIndex: 1});
        break;
      // 下一步
      case 'next':
        this.previousChange.emit({activeIndex: 3});
        break;
    }
  }
}
