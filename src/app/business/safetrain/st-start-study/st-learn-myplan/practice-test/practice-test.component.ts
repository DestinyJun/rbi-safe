import { Component, OnInit } from '@angular/core';
import {CommpleteExamData} from '../../../../../common/public/Api';
import {StOnlineExamService} from '../../../../../common/services/st-online-exam.service';
import {ActivatedRoute, NavigationStart, Router} from '@angular/router';
import {LocalStorageService} from '../../../../../common/services/local-storage.service';
import {ConfirmationService} from 'primeng/api';
import {PublicMethodService} from '../../../../../common/public/public-method.service';
import {StStartStudyService} from '../../../../../common/services/st-start-study.service';

@Component({
  selector: 'app-practice-test',
  templateUrl: './practice-test.component.html',
  styleUrls: ['./practice-test.component.scss']
})
export class PracticeTestComponent implements OnInit {
  public paperId: number;
  public paparTime: number;
  public durationTime: any;
  public paperTitle: string = '模拟考试试卷';
  public singleChoiceQuestions: Array<object> = []; // 单选
  public multipleChoiceQuestions: Array<object> = []; // 多选
  public judgmentQuestions: Array<object> = []; // 判断
  public completion: Array<object> = []; // 填空
  public moveDialog: boolean = false;
  public questionCount = 1;
  public examState = 'doing';
  public totalScore = '';
  public result = '';
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
    console.log(this.paperId);
    this.stStudySrv.getSimulationTestPaper({trainingPlanId: this.paperId }).subscribe(res => {
      console.log(res);
      this.paperTitle = res.data.testPaperName || this.paperTitle;
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

  public  submitPaper(): void {
    this.localSrv.set('openExam', '1');
    const reqBody = [];
    reqBody.push(...this.singleChoiceQuestions);
    reqBody.push(...this.multipleChoiceQuestions);
    reqBody.push(...this.judgmentQuestions);
    reqBody.push(...this.completion);
    reqBody.forEach(val => {
      if (Array.isArray(val.answerResults)){
        val.answerResults = val.answerResults.join('#');
      }else {
        val.answerResults =  val.answerResults.toString();
      }
    });

    this.stStudySrv.completeSimulationTheExam(JSON.stringify({simulationSafeAnswerRecords: reqBody})).subscribe(val => {
      this.totalScore = val.data.totalScore;
      this.result = val.data.result;
      // 进行得分和失分匹配
      // val.data.simulationSafeAnswerRecords.forEach(value1 => {
      //   this.commpleteExamData.forEach((value2: any) => {
      //       if (value2.id === value1.id) {
      //         value2.corrent = value1.correct + '';
      //       }
      //   });
      // });
      this.examState = 'did';
      this.toolSrv.setToast('success', '提交成功', '考试已结束');
      // window.history.back();
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
