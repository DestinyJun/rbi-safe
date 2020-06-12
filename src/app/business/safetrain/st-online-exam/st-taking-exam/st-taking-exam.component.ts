import {Component, HostListener, OnInit} from '@angular/core';
import {StOnlineExamService} from '../../../../common/services/st-online-exam.service';
import {ActionReducer} from '@ngrx/store';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router} from '@angular/router';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {CommpleteExamData} from '../../../../common/public/Api';
import {ConfirmationService} from 'primeng/api';
import {observable, Observable} from 'rxjs';

@Component({
  selector: 'app-st-taking-exam',
  templateUrl: './st-taking-exam.component.html',
  styleUrls: ['./st-taking-exam.component.scss']
})
export class StTakingExamComponent implements OnInit {
  public paperId: number;
  public paparTime: number;
  public countdownClock: any = '00:00:00';
  public paperTitle: string = '';
  public singleChoiceQuestions: Array<object> = [];
  public multipleChoiceQuestions: Array<object> = [];
  public judgmentQuestions: Array<object> = [];
  public completion: Array<object> = [];
  public commpleteExamData: CommpleteExamData = new CommpleteExamData();
  public commpleteExamDataCopy: CommpleteExamData = new CommpleteExamData();
  public examWarnDialog: boolean = false;
  public moveDialog: boolean = false;
  constructor(
    private stOnlineExamSrv: StOnlineExamService,
    private route: ActivatedRoute,
    private router: Router,
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
      this.commpleteExamData.personnelTrainingRecordId = Number(val.personnelTrainingRecordId);
    });
    this.initTaskExamPaperInfo();
  }

  public  initTaskExamPaperInfo(): void {
      this.stOnlineExamSrv.getExamInfo({id: this.paperId}).subscribe(res => {
        this.intervalTime(res.data.endTime);
        this.setCountdown();
        this.paperTitle = res.data.testPaperName;
        this.singleChoiceQuestions = res.data.singleChoiceQuestions;
        this.multipleChoiceQuestions = res.data.multipleChoiceQuestions;
        this.judgmentQuestions = res.data.judgmentQuestions;
        this.completion = res.data.completion;
        this.setSubMitConpleteData(this.singleChoiceQuestions);
        this.setSubMitConpleteData(this.multipleChoiceQuestions);
        this.setSubMitConpleteData(this.judgmentQuestions);
        this.setSubMitConpleteData(this.completion);

      });
  }

  // 设置倒计时
  public  setCountdown(): void {
    let h: any = Math.floor(this.paparTime / 60 / 60);
    let m: any = (Math.floor(this.paparTime / 60 % 60));
    let s: any = this.paparTime % 60;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    const timeOclock = setInterval(() => {
      if (Number(s) === 0){
        if (Number(m) === 0){
          if (Number(h) === 0){
            h = 0;
            m = 0;
            s = 0;
            clearInterval(timeOclock);
            this.examWarnDialog = true;
          }else {
            m = 59;
            h = h - 1;
          }
          h = h < 10 ? '0' + h : h;
        }else {
          m = m - 1;
          s = 59;
        }
        m = m < 10 ? '0' + m : m;
      }else {
        s = Number(s) - 1;
      }
      s = s < 10 ? '0' + s : s;
      this.countdownClock = h + ':' + m + ':' + s;
    }, 1000);
  }
 // 交卷
  public  submitPaperClik(): void {
     this.toolSrv.setConfirmation('交卷', '交卷', () => {
       this.submitPaper();
     });
  }

  public  setSubMitConpleteData(list: Array<object>): void {
     list.forEach(val => {
       // @ts-ignore
       this.commpleteExamData.safeAnswerRecordList.push({rightKey: val.rightKey, score: val.score, testPapreId: val.testPapreId, testUestionsId: val.id, answerResults: val.subjectType === 4 ? [] : ''});
     });
  }
  // 提交试卷
  public  submitPaper(): void {
    this.commpleteExamDataCopy = JSON.parse(JSON.stringify(this.commpleteExamData));
    this.commpleteExamDataCopy.safeAnswerRecordList.forEach(val => {
      if (Array.isArray(val.answerResults)){
        val.answerResults = val.answerResults.join('#');
      }else {
        val.answerResults =  val.answerResults.toString();
      }
    });
    this.stOnlineExamSrv.completeExamInfo(this.commpleteExamDataCopy).subscribe(val => {
      this.toolSrv.setToast('success', '提交成功', '考试已结束');
      window.history.back();
      // window.navigator.bac
      // this.router.
    });
  }
  // 设置时间
  public  intervalTime(endTime): void {
    const date1 = new Date();  // 开始时间
    const date2 = new Date(endTime);    // 结束时间
    const date3 = date2.getTime() - date1.getTime();  // 时间差的毫秒数
    this.paparTime = Math.floor(date3 / 1000);
  }

  // @HostListener('window:beforeunload', [`$event`])
  // private beforeUnload(event: Event) {
  //   console.log(event);
  //   this.moveDialog = true;
  // }
}
