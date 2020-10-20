import { Component, OnInit } from '@angular/core';
import {OrgTree} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {orgInitializeTree} from '../../../common/public/contents';
import {EmergencyService} from '../../../common/services/emergency.service';

@Component({
  selector: 'app-emergency-situation',
  templateUrl: './emergency-situation.component.html',
  styleUrls: ['./emergency-situation.component.scss']
})
export class EmergencySituationComponent implements OnInit {

  public emSituationBar: any = null ; // 柱状图数据
  public emSituationPie: any = null ; // 饼状图数据
  public emSituationYear: any = new Date().getFullYear() ; // 当前年
  public emSituationMonth: any = (new Date().getMonth()) + 1 ; // 当前月
  public emSituationOperateFlag: any ; // 操作标识
  public emSituationOrgTreeModal: boolean = false; // 组织树模态框
  public emSituationOrgTree: OrgTree[] = []; // 组织树配置项
  public emSituationOrgTreeSelect: OrgTree = {}; // 组织树选择
  public emSituationOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  constructor(
    private emergencySrv: EmergencyService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化请求
    this.emSituationDataInit();
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.emSituationOrgTreeSelectLabel = res.data[0].organizationName;
        this.emSituationChartHttp(res.data[0].id, this.emSituationYear);
        this.emSituationOrgTree = orgInitializeTree(res.data);
      }
    );
  }

  // 数据初始化
  private emSituationDataInit() {
    this.emSituationChartHttp(34, this.emSituationYear);
  }

  // 柱状图数据获取
  private emSituationChartHttp(organizationId, year) {
    this.emergencySrv.emergencySituationChart({organizationId, year}).subscribe((res) => {
      this.emSituationBar = {
        xdata: res.data.drillDate.xDate,
        ydata: res.data.drillDate.yDate,
      };
      this.emSituationPie = res.data.planDate.map((item) => ({name: item.name, value: item.values}));
    });
  }

  // 基础操作
  public emSituationOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'tree':
        this.emSituationOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.emSituationOrgTreeModal = false;
        this.emSituationOrgTreeSelectLabel = this.emSituationOrgTreeSelect.label;
        this.emSituationChartHttp(this.emSituationOrgTreeSelect.id, this.emSituationYear);
        break;
    }
  }

}
