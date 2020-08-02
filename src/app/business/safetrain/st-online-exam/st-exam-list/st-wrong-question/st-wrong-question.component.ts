import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CommpleteExamData, PageOption, WrongQuestion} from '../../../../../common/public/Api';
import {StOnlineExamService} from '../../../../../common/services/st-online-exam.service';
import {PublicMethodService} from '../../../../../common/public/public-method.service';

@Component({
  selector: 'app-st-wrong-question',
  templateUrl: './st-wrong-question.component.html',
  styleUrls: ['./st-wrong-question.component.scss']
})
export class StWrongQuestionComponent implements OnInit {

  @Output()
  public NumData: EventEmitter<any> = new EventEmitter<any>();
  public commpleteExamData: CommpleteExamData = new CommpleteExamData();
  public wrongQuestionList: Array<object>  = [];
  public pageOption: PageOption = {
    totalRecord: 10,
    pageSize: 10
  };
  public wrongQuestion: WrongQuestion = new WrongQuestion();
  public pageNo: number = 1;
  constructor(
    private stWrongSrv: StOnlineExamService,
    private toolSrv: PublicMethodService
  ) { }

  ngOnInit() {
     this.initWrongData();
  }
  public  initWrongData(): void {
      this.stWrongSrv.getWrongQuestionPageData({pageNo: this.pageNo, pageSize: 10}).subscribe(res => {
        this.commpleteExamData = new CommpleteExamData();
        this.setSubMitConpleteData(res.data.contents);
        this.NumData.emit(res.data.totalRecord);
        this.pageOption.totalRecord = res.data.totalRecord;
      });
  }

  public  setSubMitConpleteData(list: Array<object>): void {
    list.forEach(val => {
      // @ts-ignore
      this.commpleteExamData.safeAnswerRecordList.push({rightKey: val.rightKey.split('#') , subjectType: val.subjectType, safeTestQuestionOptionsList: val.safeTestQuestionOptionsList, subject: val.subject,  score: val.score, id: val.id, answerResults: []});
    });
  }

  public  clickEvent(e): void {
    this.pageNo = e;
    this.commpleteExamData.safeAnswerRecordList.forEach(val => {
      if (val.answerResults.length !== 0){
        this.wrongQuestion.rightKey = val.rightKey.join('#');
        this.wrongQuestion.id = val.id;
        this.wrongQuestion.answerResults = val.answerResults.join('#');
        this.wrongQuestionList.push(this.wrongQuestion);
        this.wrongQuestion = new WrongQuestion();
      }
    });
    this.initWrongData();
  }
  public submitClick(): void {
    const  flag = this.commpleteExamData.safeAnswerRecordList.some(v => {
      return v.answerResults.length !== 0;
    });
    if (flag){
      this.commpleteExamData.safeAnswerRecordList.forEach(val => {
        if (val.answerResults.length !== 0){
          this.wrongQuestion.rightKey = val.rightKey.join('#');
          this.wrongQuestion.id = val.id;
          this.wrongQuestion.answerResults = val.answerResults.join('#');
          this.wrongQuestionList.push(this.wrongQuestion);
          this.wrongQuestion = new WrongQuestion();
        }
      });
      this.toolSrv.setConfirmation('确认', '确认', () => {
         this.stWrongSrv.subWrongQuestion({handlePersonalMistakes: this.wrongQuestionList}).subscribe(res => {
           this.pageNo = 1;
           this.initWrongData();
         });
      });
    }else {
      console.log(123);
    }
  }
}
