import { Component, OnInit } from '@angular/core';
import {CommpleteExamData, PageOption} from '../../../../../common/public/Api';
import {Subscription} from 'rxjs';
import {StOnlineExamService} from '../../../../../common/services/st-online-exam.service';
import {PublicMethodService} from "../../../../../common/public/public-method.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-st-completed-exam',
  templateUrl: './st-completed-exam.component.html',
  styleUrls: ['./st-completed-exam.component.scss']
})
export class StCompletedExamComponent implements OnInit {

  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public showDetail: any;
  public startExamNoticeModel: boolean = false;
  public singleChoiceQuestions: Array<object> = [];
  public multipleChoiceQuestions: Array<object> = [];
  public judgmentQuestions: Array<object> = [];
  public completion: Array<object> = [];
  public commpleteExamData: CommpleteExamData = new CommpleteExamData();
  public pageOption: PageOption = {
    totalRecord: 10,
    pageSize: 10
  };
  public content: any;
  public id: number;
  public time: number = 0;
  public personnelTrainingRecordId: number;
  public pageNo: number = 1;
  public completedExamTitle: Array<object>  = [
    { field: 'id', header: '试卷id' },
    { field: 'testPaperName', header: '试卷名称' },
    { field: 'processingStatus', header: '完成状态' },
    { field: 'testResults', header: '考试结果' },
    { field: 'startTime', header: '开始考试时间' },
    { field: 'endTime', header: '结束考试时间' },
    { field: 'duration', header: '考试时长' },
    { field: 'personnelTrainingRecordId', header: '人员培训记录id' },
    { field: 'operating', header: '操作' },
  ];
  public completedExamContent: Array<object> = [];
  constructor(
    private stOnlineExamSrv: StOnlineExamService,
    private toolSrv: PublicMethodService,
    private router: Router,
  ) {
  }
  public themeSub: Subscription;
  ngOnInit() {
    this.initCompleteExamData();
  }
  public  initCompleteExamData(): void {
      this.stOnlineExamSrv.getOnlineExamOPageInfo({pageSize: 10, pageNo: this.pageNo, processingStatus: 2}).subscribe(res => {
        this.pageOption = {pageSize: res.data.pageSize, totalRecord: res.data.totalRecord};
        if (res.data.contents){
          this.completedExamContent = res.data.contents.map(v => {
            v.processingStatus = '已完成';
            v.operating = '详情';
            return v;
          });
        }
      });
  }
  public  clickEvent(e): void {
    this.pageNo  = e;
    this.initCompleteExamData();
  }
  public  detailClick(e): void {
    this.stOnlineExamSrv.getCompleteExamInfoDetail({testPapreId: e.id, personnelTrainingRecordId: e.personnelTrainingRecordId}).subscribe(res => {
      this.singleChoiceQuestions = res.data.singleChoiceQuestions;
      this.multipleChoiceQuestions = res.data.multipleChoiceQuestions;
      this.judgmentQuestions = res.data.judgmentQuestions;
      this.completion = res.data.completion;
      this.setSubMitConpleteData(this.singleChoiceQuestions);
      this.setSubMitConpleteData(this.multipleChoiceQuestions);
      this.setSubMitConpleteData(this.judgmentQuestions);
      this.setSubMitConpleteData(this.completion);
    });
    this.showDetail = true;
  }

  public  setSubMitConpleteData(list: Array<object>): void {
    list.forEach(val => {
      // @ts-ignore
      this.commpleteExamData.safeAnswerRecordList.push({rightKey: val.rightKey.split('#') , score: val.score, testPapreId: val.testPapreId, testUestionsId: val.id, answerResults: val.answerResults ? val.answerResults.split('#') : ''});
    });
    console.log(this.commpleteExamData);
  }

  // 点击开始考试
  public  showNoticeModelClick(e): void {
    console.log(e);
    // e.flag = 0;
    if (!e.flag) {
      this.toolSrv.setToast('warn', '考试提示', '未完成学习，不能进行考试');
    } else {
      this.id = e.id;
      this.time = e.duration.slice(0, e.duration.length - 2);
      this.personnelTrainingRecordId = e.personnelTrainingRecordId;
      this.content = e.examNotes;
      this.startExamNoticeModel = true;
    }
  }
// 确认开始考试
  public  startExamClick(): void {
    this.router.navigate(['/home/strain/exam/tasking'], {queryParams: {id: this.id, time: this.time, personnelTrainingRecordId: this.personnelTrainingRecordId}});
  }
  public judgeTimeIsOrInPeriod(beginDateStr, endDateStr): boolean {
    // tslint:disable-next-line:one-variable-per-declaration
    const curDate = new Date(),
      beginDate = new Date(beginDateStr),
      endDate = new Date(endDateStr);
    return curDate >= beginDate && curDate <= endDate;
  }

}
