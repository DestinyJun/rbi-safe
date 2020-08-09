import {Component, HostListener, OnInit} from '@angular/core';
import {StOnlineExamService} from '../../../../common/services/st-online-exam.service';
import {ActionReducer} from '@ngrx/store';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {CommpleteExamData} from '../../../../common/public/Api';
import {ConfirmationService} from 'primeng/api';
import {observable, Observable} from 'rxjs';
import {LocalStorageService} from '../../../../common/services/local-storage.service';

@Component({
  selector: 'app-st-taking-exam',
  templateUrl: './st-taking-exam.component.html',
  styleUrls: ['./st-taking-exam.component.scss']
})
export class StTakingExamComponent implements OnInit {
  public paperId: number;
  public personnelTrainingRecordId: number;
  public paparTime: number;
  public countdownClock: any = '加载中';
  public countdownTen: any = '10';
  public durationTime: any;
  public paperTitle: string = '';
  public singleChoiceQuestions: Array<object> = []; // 单选
  public multipleChoiceQuestions: Array<object> = []; // 多选
  public judgmentQuestions: Array<object> = []; // 判断
  public completion: Array<object> = []; // 填空
  public examWarnDialog: boolean = false;
  public moveDialog: boolean = false;
  public questionCount = 1;
  private timeOclock;
  constructor(
    private stOnlineExamSrv: StOnlineExamService,
    private route: ActivatedRoute,
    private router: Router,
    private localSrv: LocalStorageService,
    private confirmationService: ConfirmationService,
    private toolSrv: PublicMethodService,
  ) {
    // @ts-ignore
    this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationStart) {
          // this.examWarnDialog = true;
          console.log(event);
        }
      });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      this.paperId = val.id;
      // this.paparTime = new Date();
      this.durationTime = Number(val.time);
      console.log(this.durationTime);
      this.personnelTrainingRecordId = Number(val.personnelTrainingRecordId);
    });
    this.localSrv.set('openExam', '0');
    this.initTaskExamPaperInfo();
  }

  public  initTaskExamPaperInfo(): void {
      this.stOnlineExamSrv.getExamInfo({id: this.paperId}).subscribe(res => {
        console.log(res);
        this.intervalTime(res.data.endTime);
        this.setCountdown();
        this.paperTitle = res.data.testPaperName;
        this.singleChoiceQuestions = res.data.singleChoiceQuestions;
        this.multipleChoiceQuestions = res.data.multipleChoiceQuestions;
        this.judgmentQuestions = res.data.judgmentQuestions;
        this.completion = res.data.completion;
        // 给全部题目之前加上题目编号
        this.singleChoiceQuestions.forEach((value: any) => {
          value.subject = this.questionCount + '. ' + value.subject;
          value.answerResults = '';
          this.questionCount++;
        });
        this.multipleChoiceQuestions.forEach((value: any) => {
          value.subject = this.questionCount + '. ' + value.subject;
          value.answerResults = '';
          this.questionCount++;
        });
        this.judgmentQuestions.forEach((value: any) => {
          value.subject = this.questionCount + '. ' + value.subject;
          value.answerResults = '';
          this.questionCount++;
        });
        this.completion.forEach((value: any) => {
          value.subject = this.questionCount + '. ' + value.subject;
          value.answerResults = [];
          this.questionCount++;
        });
      });
  }

  // 设置倒计时, 以秒为单位
  public  setCountdown(): void {

    // this.paparTime = 10;

    this.timeOclock = setInterval(() => {
      this.paparTime = this.paparTime - 1;
      const h = Math.floor(this.paparTime / (60 * 60));
      const m = Math.floor((this.paparTime - (h * 60 * 60)) / 60 );
      const s = this.paparTime % 60;
      this.countdownClock = (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);


      if (this.paparTime === 0) {
        this.paparTime = 10;
        this.examWarnDialog = true;
        clearInterval(this.timeOclock);
        this.timeOclock = null;
        // 提示十秒钟之后自动提交
        this.timeOclock = setInterval(() => {
          if (this.paparTime === 0) {
            this.submitPaper();
            clearInterval(this.timeOclock);
            this.timeOclock = null;
          }
          const s1 = this.paparTime % 60;
          this.paparTime = this.paparTime - 1;
          this.countdownTen = s1;
        }, 1000);
      }
    }, 1000);
  }
 // 交卷
  public  submitPaperClik(): void {
     this.toolSrv.setConfirmation('交卷', '交卷', () => {
       this.submitPaper();
     });
  }
  public  canclePaperClik(): void {
    this.toolSrv.setConfirmation('退出', '退出', () => {
      this.localSrv.set('openExam', '1');
      if (this.timeOclock) {
        clearInterval(this.timeOclock);
      }
      window.history.back();
    });
  }

  public  setSubMitConpleteData(list: Array<object>): void {
     list.forEach(val => {
       // @ts-ignore
       this.commpleteExamData.safeAnswerRecordList.push({rightKey: val.rightKey, questionBankSubjectId: val.questionBankSubjectId, score: val.score, testPapreId: val.testPapreId, testUestionsId: val.id, answerResults: val.subjectType === 4 ? [] : ''});
     });
  }

  public  submitPaper(): void {
    this.localSrv.set('openExam', '1');
    const data = [];
    const reqData = [];
    data.push(...this.singleChoiceQuestions);
    data.push(...this.multipleChoiceQuestions);
    data.push(...this.judgmentQuestions);
    data.push(...this.completion);
    data.forEach((val: any) => {
      reqData.push({rightKey: val.rightKey,
        questionBankSubjectId: val.questionBankSubjectId,
        score: val.score, testPapreId: val.testPapreId,
        testUestionsId: val.id,
        answerResults: Array.isArray(val.answerResults) ? val.answerResults.join('#') : val.answerResults});
    });
    const reqBody = {
      personnelTrainingRecordId: this.personnelTrainingRecordId,
      safeAnswerRecordList: reqData
    };
    this.stOnlineExamSrv.completeExamInfo(reqBody).subscribe(val => {
      this.toolSrv.setToast('success', '提交成功', '考试已结束');
      window.history.back();
    });
  }
  // 设置时间
  public  intervalTime(endTime): void {
    const date1 = new Date();  // 开始时间
    const date2 = new Date(endTime);    // 结束时间
    const date3 = date2.getTime() - date1.getTime();  // 时间差的毫秒数
    this.paparTime = Math.floor(date3 / 1000) > this.durationTime * 60 ? this.durationTime * 60  : Math.floor(date3 / 1000);
  }
}
