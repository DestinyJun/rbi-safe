import { Component, OnInit } from '@angular/core';
import {CommpleteExamData} from '../../../../../common/public/Api';
import {StOnlineExamService} from '../../../../../common/services/st-online-exam.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {LocalStorageService} from '../../../../../common/services/local-storage.service';
import {ConfirmationService} from 'primeng/api';
import {PublicMethodService} from '../../../../../common/public/public-method.service';
import {StStartStudyService} from "../../../../../common/services/st-start-study.service";

@Component({
  selector: 'app-practice-test',
  templateUrl: './practice-test.component.html',
  styleUrls: ['./practice-test.component.scss']
})
export class PracticeTestComponent implements OnInit {
  public paperId: number;
  public paparTime: number;
  public countdownClock: any = '加载中';
  public durationTime: any;
  public paperTitle: string = '模拟考试试卷';
  public singleChoiceQuestions: Array<object> = [];
  public multipleChoiceQuestions: Array<object> = [];
  public judgmentQuestions: Array<object> = [];
  public completion: Array<object> = [];
  public commpleteExamData: Array<any> = [];
  public commpleteExamDataCopy: Array<any> = [];
  public examWarnDialog: boolean = false;
  public moveDialog: boolean = false;
  public questionCount = 1;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private localSrv: LocalStorageService,
    private confirmationService: ConfirmationService,
    private toolSrv: PublicMethodService,
    private stStudySrv: StStartStudyService
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
    });
    this.localSrv.set('openExam', '0');
    this.initTaskExamPaperInfo();
  }

  public  initTaskExamPaperInfo(): void {
    // this.paperId
    // this.stStudySrv.getSimulationTestPaper({trainingPlanId: 5 }).subscribe(res => {
    //   console.log(res);
    // });

    this.stStudySrv.getSimulationTestPaper({trainingPlanId: 5 }).subscribe(res => {
      console.log(res);
      this.intervalTime(res.data.endTime);
      this.setCountdown();
      this.paperTitle = res.data.testPaperName || this.paperTitle;
      this.singleChoiceQuestions = res.data.singleChoiceQuestions;
      this.multipleChoiceQuestions = res.data.multipleChoiceQuestions;
      this.judgmentQuestions = res.data.judgmentQuestions;
      this.completion = res.data.completion;
      // 给全部题目之前加上题目编号
      this.singleChoiceQuestions.forEach((value: any) => {
        value.subject = this.questionCount + '. ' + value.subject;
        this.questionCount++;
      });
      this.multipleChoiceQuestions.forEach((value: any) => {
        value.subject = this.questionCount + '. ' + value.subject;
        this.questionCount++;
      });
      this.judgmentQuestions.forEach((value: any) => {
        value.subject = this.questionCount + '. ' + value.subject;
        this.questionCount++;
      });
      this.judgmentQuestions.forEach((value: any) => {
        value.subject = this.questionCount + '. ' + value.subject;
        this.questionCount++;
      });
      this.completion.forEach((value: any) => {
        value.subject = this.questionCount + '. ' + value.subject;
        this.questionCount++;
      });

      this.setSubMitConpleteData(this.singleChoiceQuestions);
      this.setSubMitConpleteData(this.multipleChoiceQuestions);
      this.setSubMitConpleteData(this.judgmentQuestions);
      this.setSubMitConpleteData(this.completion);

    });
  }

  // 设置倒计时, 以秒为单位
  public  setCountdown(): void {
    const timeOclock = setInterval(() => {
      if (this.paparTime === 0) {clearInterval(timeOclock); this.examWarnDialog = true; }
      const h = Math.floor(this.paparTime / (60 * 60));
      const m = Math.floor((this.paparTime - (h * 60 * 60)) / 60 );
      const s = this.paparTime % 60;
      this.paparTime = this.paparTime - 1;
      this.countdownClock = (h < 10 ? ('0' + h) : h) + ':' + (m < 10 ? ('0' + m) : m) + ':' + (s < 10 ? ('0' + s) : s);
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
      window.history.back();
    });
  }

  public  setSubMitConpleteData(list: Array<object>): void {
    list.forEach(val => {
      // @ts-ignore
      this.commpleteExamData.push({rightKey: val.rightKey, score: val.score, id: val.id, answerResults: val.subjectType === 4 ? [] : ''});
    });
  }

  public  submitPaper(): void {
    this.localSrv.set('openExam', '1');
    this.commpleteExamDataCopy = JSON.parse(JSON.stringify(this.commpleteExamData));
    this.commpleteExamDataCopy.forEach(val => {
      if (Array.isArray(val.answerResults)){
        val.answerResults = val.answerResults.join('#');
      }else {
        val.answerResults =  val.answerResults.toString();
      }
    });
    // this.commpleteExamDataCopy.forEach(value => {
    //   value.answerResults = '1#2';
    // });
    console.log({simulationSafeAnswerRecords: this.commpleteExamDataCopy});
    this.stStudySrv.completeSimulationTheExam(JSON.stringify({simulationSafeAnswerRecords: this.commpleteExamDataCopy})).subscribe(val => {
      console.log(val);
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
