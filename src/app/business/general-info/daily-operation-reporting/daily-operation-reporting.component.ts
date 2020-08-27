import { Component, OnInit } from '@angular/core';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {GeneralInfoService} from '../../../common/services/general-info.service';
import {Es} from "../../../common/public/contents";

@Component({
  selector: 'app-daily-operation-reporting',
  templateUrl: './daily-operation-reporting.component.html',
  styleUrls: ['./daily-operation-reporting.component.scss']
})
export class DailyOperationReportingComponent implements OnInit {
  public lcp: any; // 铝产品..
  public hjsc: any; // 合金产品
  public wxk: any; // 外销
  public zck: any; // 自采矿
  public zj: any; // 最后一个表
  public date: Date;
  public esDate: any = Es;
  constructor(
    private toolSrv: PublicMethodService,
    private builletinSrv: GeneralInfoService
  ) { }

  ngOnInit() {
    // 获取前一天的日期
    const timeStamp = new Date().getTime() - 24 * 60 * 60 * 1000;
    this.date = new Date(timeStamp);
    this.getData(this.date);
  }

  public getData(e): void {
    const date = new Date(e);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const param = date.getFullYear() + '-' + (month < 10 ? ('0' + month) : month) + '-' +  (day < 10 ? ('0' + day) : day);
    this.getTablesData(param);
  }

  private getTablesData(param): void {
    console.log(param);
    this.builletinSrv.complainProductionFindAll({'date': param}).subscribe(res => {
      console.log(res);
      if (res.values) {
        this.lcp = res.values.lcp;
        this.hjsc = res.values.hj;
        this.wxk = res.values.wxk;
        this.zck = res.values.zck;
        this.zj = res.values.zj;
        if (this.zj.zyjs) {
          this.zj.zyjs = this.zj.zyjs.toString().replace(/。/g, '。');
          console.log(this.zj.zyjs);
        }
      }
    });
  }

}
