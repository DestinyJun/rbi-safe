import { Component, OnInit } from '@angular/core';
import {OrgTree} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {orgInitializeTree} from '../../../common/public/contents';
import {SecurityRiskService} from '../../../common/services/security-risk.service';

@Component({
  selector: 'app-sr-control-status',
  templateUrl: './sr-control-status.component.html',
  styleUrls: ['./sr-control-status.component.scss']
})
export class SrControlStatusComponent implements OnInit {

  public striskStatusYearBar: any = null ; // 柱状图数据
  public striskStatusMonthBar: any = null ; // 饼状图数据
  public striskStatusYear: any = new Date().getFullYear() ; // 当前年
  public striskStatusMonth: any = (new Date().getMonth()) + 1 ; // 当前月
  public striskStatusOperateFlag: any ; // 操作标识
  public striskStatusOrgTreeModal: boolean = false; // 组织树模态框
  public striskStatusOrgTree: OrgTree[] = []; // 组织树配置项
  public striskStatusOrgTreeSelect: OrgTree = {}; // 组织树选择
  public striskStatusOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  constructor(
    private striskSrv: SecurityRiskService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化请求
    this.striskStatusDataInit();
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.striskStatusOrgTree = orgInitializeTree(res.data);
      }
    );
  }

  // 数据初始化
  private striskStatusDataInit() {
    this.striskStatusYearBarHttp(34, this.striskStatusYear);
    this.striskStatusMonthBarHttp(34, this.striskStatusYear, this.striskStatusMonth);
  }

  // 柱状图数据获取
  private striskStatusYearBarHttp(organizationId, year) {
    this.striskSrv.striskStatusYearBar({organizationId, year}).subscribe((res) => {
      const xdata = res.data.abscissa;
      const data = [
        {name: '1级', value: res.data.grade1},
        {name: '2级', value: res.data.grade2},
        {name: '3级', value: res.data.grade3},
        {name: '4级', value: res.data.grade4},
      ];
      this.striskStatusYearBar = {xdata, data};
    });
  }

  // 饼状图数据获取
  private striskStatusMonthBarHttp(organizationId, year, month) {
    this.striskSrv.striskStatusMonthBar({organizationId, year, month}).subscribe((res) => {
      const xdata = res.data.abscissa;
      const data = [
        {name: '等级1', value: res.data.effective1},
        {name: '等级2', value: res.data.effective1},
        {name: '等级3', value: res.data.effective1},
        {name: '等级4', value: res.data.effective1},
        {name: '等级6', value: res.data.effective1},
      ];
      this.striskStatusMonthBar = {xdata, data};
    });
  }

  // 基础操作
  public striskStatusOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'chart':
        this.striskStatusMonthBarHttp(34, this.striskStatusYear, item.dataIndex + 1);
        break;
      // 树操作
      case 'tree':
        this.striskStatusOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.striskStatusOrgTreeModal = false;
        this.striskStatusOrgTreeSelectLabel = this.striskStatusOrgTreeSelect.label;
        this.striskStatusYearBarHttp(this.striskStatusOrgTreeSelect.id, this.striskStatusYear);
        this.striskStatusMonthBarHttp(this.striskStatusOrgTreeSelect.id, this.striskStatusYear, this.striskStatusMonth);
        break;
    }
  }

}
