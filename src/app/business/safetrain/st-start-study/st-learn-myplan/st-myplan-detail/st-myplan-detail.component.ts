import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StStartStudyService} from '../../../../../common/services/st-start-study.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-st-myplan-detail',
  templateUrl: './st-myplan-detail.component.html',
  styleUrls: ['./st-myplan-detail.component.scss']
})
export class StMyplanDetailComponent implements OnInit {

  public title: any;
  public planId: any;
  public startExamNoticeModel: boolean = false;
  public fileContent: Array<object> = [];
  public videoContent: Array<object> = [];

  public fileName = '';
  public fileUrl: SafeResourceUrl;
  public url: SafeResourceUrl;
  public openDialog = false;
  constructor(
    private route: ActivatedRoute,
    private stStudySrv: StStartStudyService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(res => {
      // 拿到计划Id和计划标题
      this.title = res.title;
      this.planId = res.id;
      this.initMyplanDetailData(res.id);
    });
  }
  public  initMyplanDetailData(value): void {
      this.stStudySrv.getMyPlanInfoById({id: value}).subscribe(res => {
        this.fileContent = res.data.file;
        this.videoContent = res.data.video;
      });
  }
  // 返回上一级
  public  backPreviouClick(): void {
    history.go(-1);
  }

  // 文件学习
  public  openFileClick(item): void {
    // 只要是点击，就已经完成学习
    // 判断是否已经学习了
    if (item.whetherStudy !== 1) {
      this.stStudySrv.addFinishStudyTime({planId: this.planId, contentId: item.id}).subscribe(res => {
        item.whetherStudy = 1;
      });
    }
    this.fileName = item.label;
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.resourcePath);
    this.url = item.filePath;
    this.openDialog = true;
    // window.open(item.resourcePath);
  }

  // 视频学习
  public videoPlay(btn, video, item): void {
    video.play();
    // 隐藏播放按钮
    btn.style.display = 'none';
    // 添加播放控件
    video.setAttribute('controls', 'controls');
    if (item.whetherStudy !== 1) {
      this.stStudySrv.addFinishStudyTime({planId: this.planId, contentId: item.id}).subscribe(res => {
        console.log(res);
        item.whetherStudy = 1;
      });
    }
  }


  // 确认开始模拟考试
  public  startTestPaper(): void {
    this.router.navigate(['/home/strain/learn/practice'], {queryParams: {id: this.planId}});
  }

  // 提交试卷
  public  submitPaper(): void {

    this.stStudySrv.getSimulationTestPaper({trainingPlanId: this.planId}).subscribe(res => {
      console.log(res);
    });
  }
}
