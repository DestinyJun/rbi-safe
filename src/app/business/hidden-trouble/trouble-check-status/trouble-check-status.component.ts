import { Component, OnInit } from '@angular/core';
import {TroubleCheckStatusService} from '../../../common/services/trouble-check-status.service';
import {OrgTree} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {orgInitializeTree} from '../../../common/public/contents';

@Component({
  selector: 'app-trouble-check-status',
  templateUrl: './trouble-check-status.component.html',
  styleUrls: ['./trouble-check-status.component.scss']
})
export class TroubleCheckStatusComponent implements OnInit {
  public troubleCheckChart: any = null ; // 柱状图数据
  public troubleCheckYear: any = new Date().getFullYear() ; // 当前年
  public troubleCheckMonth: any = (new Date().getMonth()) + 1 ; // 当前月
  public troubleCheckOperateFlag: any ; // 操作标识
  public troubleCheckOrgTreeModal: boolean = false; // 组织树模态框
  public troubleCheckOrgTree: OrgTree[] = []; // 组织树配置项
  public troubleCheckOrgTreeSelect: OrgTree = {}; // 组织树选择
  public troubleCheckOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  constructor(
    private troubleSrv: TroubleCheckStatusService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化请求
    this.troubleCheckDataInit();
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.troubleCheckOrgTree = orgInitializeTree(res.data);
      }
    );
  }

  // 数据初始化
  private troubleCheckDataInit() {
    this.troubleCheckBarHttp(34, this.troubleCheckYear);
  }

  // 柱状图数据获取
  private troubleCheckBarHttp(organizationId, year) {
    this.troubleSrv.troubleCheckChar({organizationId, year}).subscribe((res) => {
      const xdata = res.data.abscissa;
      const barData = [
        {name: '重大隐患数', value: res.data.seriousHid},
        {name: '一般隐患数', value: res.data.normalHid},
        {name: '重大整改数', value: res.data.seriousDeal},
        {name: '一般整改数', value: res.data.normalDeal},
      ];
      const lineData = [
        {name: '重大整改率', value: res.data.seriousPercentage},
        {name: '一般整改率', value: res.data.normalPercentage}
      ];
      this.troubleCheckChart = {xdata, barData, lineData};
    });
  }

  // 基础操作
  public troubleCheckOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'tree':
        this.troubleCheckOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.troubleCheckOrgTreeModal = false;
        this.troubleCheckOrgTreeSelectLabel = this.troubleCheckOrgTreeSelect.label;
        this.troubleCheckBarHttp(this.troubleCheckOrgTreeSelect.id, this.troubleCheckYear);
        break;
    }
  }

}
