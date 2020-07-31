import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StStartStudyService} from '../../../../../common/services/st-start-study.service';

@Component({
  selector: 'app-st-myplan-detail',
  templateUrl: './st-myplan-detail.component.html',
  styleUrls: ['./st-myplan-detail.component.scss']
})
export class StMyplanDetailComponent implements OnInit {

  public title: any;
  public testId: any;
  public startExamNoticeModel: boolean = false;
  public fileContent: Array<object> = [];
  public videoContent: Array<object> = [];
  constructor(
    private route: ActivatedRoute,
    private stStudySrv: StStartStudyService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      this.title = res.title;
      this.testId = res.id;
      this.initMyplanDetailData(res.id);
    });
  }
  public  initMyplanDetailData(value): void {
      this.stStudySrv.getMyPlanInfoById({id: value}).subscribe(res => {
        console.log(res);
        this.fileContent = res.data.file;
        this.videoContent = res.data.video;
      });
  }
  // 返回上一级
  public  backPreviouClick(): void {
    history.go(-1);
  }

  public  openFileClick(e): void {
    window.open(e.resourcePath);
  }


  // 确认开始模拟考试
  public  startTestPaper(): void {
    this.router.navigate(['/home/strain/learn/practice'], {queryParams: {id: this.testId}});
  }

  // 提交试卷
  public  submitPaper(): void {

    this.stStudySrv.getSimulationTestPaper({trainingPlanId: this.testId}).subscribe(res => {
      console.log(res);
    });

    // this.stStudySrv.set('openExam', '1');
    // this.commpleteExamDataCopy = JSON.parse(JSON.stringify(this.commpleteExamData));
    // this.commpleteExamDataCopy.safeAnswerRecordList.forEach(val => {
    //   if (Array.isArray(val.answerResults)){
    //     val.answerResults = val.answerResults.join('#');
    //   }else {
    //     val.answerResults =  val.answerResults.toString();
    //   }
    // });
    // this.stOnlineExamSrv.completeExamInfo(this.commpleteExamDataCopy).subscribe(val => {
    //   this.toolSrv.setToast('success', '提交成功', '考试已结束');
    //   window.history.back();
    // });
  }
}
