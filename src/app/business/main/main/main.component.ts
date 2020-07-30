import { Component, OnInit } from '@angular/core';
import {GeneralInfoService} from '../../../common/services/general-info.service';
import {Router} from '@angular/router';
import {GeneralInfoClass} from '../../../common/public/Api';
import {SecurityRiskService} from "../../../common/services/security-risk.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public lineData = [];
  public lineTilte: any = '风险等级数量统计';
  public mainPageNo: number = 1;
  public genneralInfoList: Array<object> = [];
  public showDetailDialog: boolean = false;
  public genneralInfoData: GeneralInfoClass = new GeneralInfoClass();
  constructor(
    private builletinSrv: GeneralInfoService,
    private router: Router,
    private srService: SecurityRiskService
  ) {
  }

  ngOnInit() {
    // 风险等级
    this.srService.findByGrade().subscribe(res => {
      const lineDataKey = [];
      for (const dataKey in res.data) {
        lineDataKey.push(dataKey);
      }
      this.lineData = [];
      for (const datumKey in res.data[lineDataKey[0]]) {
        this.lineData.push({name: datumKey, value1: res.data[lineDataKey[0]][datumKey], value2: res.data[lineDataKey[1]][datumKey]});
      }
      // 排序根据名称
      this.lineData = this.lineData.sort((a, b) => {
        return this.getZhCode(a.name) - this.getZhCode(b.name);
      });
    });

     this.initMainData();
  }

  public initMainData(): void {
    this.builletinSrv.getBulletinBoradPageData({pageNo: this.mainPageNo, pageSize: 3}).subscribe((res) => {
      this.genneralInfoList = res.data.contents;
      console.log(this.genneralInfoList);
    });
  }
  // 查看更多信息
  public  lookGenneralInfoClick(): void {
      this.router.navigate(['/home/genneral/board']);
  }
  // 点击查看详情
  public  generalInfoItemClick(data): void {
      this.genneralInfoData.content = data.content;
      this.genneralInfoData.title = data.title;
      this.genneralInfoData.file = data.annex.slice(data.annex.lastIndexOf('/') + 1);
      this.genneralInfoData.filePath = data.annex;
      this.showDetailDialog = true;
  }
  // 下载附件
  public downFile(e): void {
    window.open(e);
  }

  private getZhCode(str: string) {
    switch (str) {
      case '一级': return 1;
      case '二级': return 2;
      case '三级': return 4;
      case '四级': return 6;
      case '五级': return 16;
      default: return 0;
    }
  }
}
