import { Component, OnInit } from '@angular/core';
import {OrgTree} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {orgInitializeTree} from '../../../common/public/contents';
import {IntentService} from '../../../common/services/intent.service';

@Component({
  selector: 'app-intent-status',
  templateUrl: './intent-status.component.html',
  styleUrls: ['./intent-status.component.scss']
})
export class IntentStatusComponent implements OnInit {

  public intentStatusTopBar: any = null ; // 各级安全活动数量统计图
  public intentStatusTopLine: any = null ; // 安全生产投入支出统计图
  public intentStatusBottomLeftBar: any = null ; // 一岗双责职责分数统计图
  public intentStatusBottomRightBar: any = null ; // 目标完成情况分数统计图
  public intentStatusYear: any = new Date().getFullYear() ; // 当前年
  public intentStatusOperateFlag: any ; // 操作标识
  public intentStatusOrgTreeModal: boolean = false; // 组织树模态框
  public intentStatusOrgTree: OrgTree[] = []; // 组织树配置项
  public intentStatusOrgTreeSelect: OrgTree = {}; // 组织树选择
  public intentStatusOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  constructor(
    private intentSrv: IntentService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.intentStatusOrgTreeSelectLabel = res.data[0].organizationName;
        this.intentStatusChartHttp(res.data[0].id, this.intentStatusYear);
        this.intentStatusOrgTree = orgInitializeTree(res.data);
      }
    );
  }

  // 柱状图数据获取
  private intentStatusChartHttp(organizationId, year) {

    // 各级安全活动数量统计图
    this.intentSrv.intentStatusTopBar({organizationId, year}).subscribe((res) => {
      const xdata = res.data.abscissa;
      const data = [
        {name: '总活动数', value: res.data.total},
        {name: '公司级', value: res.data.company},
        {name: '分厂级', value: res.data.factory},
        {name: '车间级', value: res.data.workshop},
        {name: '班组级', value: res.data.team},
      ];
      this.intentStatusTopBar = {xdata, data};
    });

    // 安全生产投入支出统计图
    this.intentSrv.intentStatusTopLine({organizationId, year}).subscribe((res) => {
      const xdata = res.data.abscissa;
      const data = [
        {name: '总计提金额', value: res.data.planMoney},
        {name: '总投入金额', value: res.data.inputMoney},
      ];
      this.intentStatusTopLine = {xdata, data};
    });

    // 一岗双责职责分数统计图
    this.intentSrv.intentStatusBottomLeftBar({organizationId, year}).subscribe((res) => {
      this.intentStatusBottomLeftBar = {
        xdata: res.data.abscissa,
        ydata: res.data.average,
      };
    });

    // 目标完成情况分数统计图
    this.intentSrv.intentStatusBottomRightBar({organizationId, year}).subscribe((res) => {
      this.intentStatusBottomRightBar = {
        xdata: res.data.abscissa,
        ydata: res.data.average,
      };
    });
  }

  // 基础操作
  public intentStatusOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'tree':
        this.intentStatusOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.intentStatusOrgTreeModal = false;
        this.intentStatusOrgTreeSelectLabel = this.intentStatusOrgTreeSelect.label;
        this.intentStatusChartHttp(this.intentStatusOrgTreeSelect.id, this.intentStatusYear);
        break;
    }
  }

}
