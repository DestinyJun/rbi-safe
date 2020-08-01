import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PageOption} from '../../../../common/public/Api';
import {StStartStudyService} from '../../../../common/services/st-start-study.service';
import {Router} from '@angular/router';
import {PublicMethodService} from '../../../../common/public/public-method.service';

@Component({
  selector: 'app-st-learn-myplan',
  templateUrl: './st-learn-myplan.component.html',
  styleUrls: ['./st-learn-myplan.component.scss']
})
export class StLearnMyplanComponent implements OnInit {
  public pageNo: number = 1;
  public myPlanList: Array<object> = [];
  public pageOption: PageOption = {
    totalRecord: 10,
    pageSize: 6
  };
  @Output()
  public eventEmit: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private stStudySrv: StStartStudyService,
    private toolSrv: PublicMethodService,
    private router: Router
  ) { }
  ngOnInit() {
    this.initMyPlanData();
  }

  public  initMyPlanData(): void {
    this.stStudySrv.getMyPlanPageInfo({pageNo: this.pageNo, pageSize: 6}).subscribe(res => {
      console.log(res);
      // 计算百分比进度
      res.data.contents.forEach(value => {
        value.finishStudyTime = value.finishStudyTime || 0;
        value.trainingDuration = value.trainingDuration || 100;
        value.progress = Math.ceil((value.finishStudyTime / value.trainingDuration) * 100);
      });
      this.myPlanList = res.data.contents;
      console.log(this.myPlanList);
      this.pageOption.totalRecord = res.data.totalRecord;
      this.eventEmit.emit(res.data.totalRecord);
    });
  }
  public  clickEvent(e): void {
    this.pageNo = e;
    this.initMyPlanData();
  }

  public  myPlanItemClick(e): void {
    if (this.judgeTimeIsOrInPeriod(e.startTime, e.endTime)) {
      this.router.navigate(['home/strain/learn/detail'], {queryParams: {id: e.id, title: e.trainingContent}});
    }else {
      this.toolSrv.setToast('error', '操作错误', '时间未到或者时间已过期');
    }
  }
  public judgeTimeIsOrInPeriod(beginDateStr, endDateStr): boolean {
    // tslint:disable-next-line:one-variable-per-declaration
    const curDate = new Date(),
      beginDate = new Date(beginDateStr),
      endDate = new Date(endDateStr);
    return curDate >= beginDate && curDate <= endDate;
  }
}
