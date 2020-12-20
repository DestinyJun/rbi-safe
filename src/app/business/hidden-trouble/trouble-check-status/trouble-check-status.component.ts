import {Component, OnInit} from '@angular/core';
import {TroubleCheckStatusService} from '../../../common/services/trouble-check-status.service';
import {OrgTree} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {Es, orgInitializeTree} from '../../../common/public/contents';

@Component({
  selector: 'app-trouble-check-status',
  templateUrl: './trouble-check-status.component.html',
  styleUrls: ['./trouble-check-status.component.scss']
})
export class TroubleCheckStatusComponent implements OnInit {
  public troubleCheckChart: any = null ; // 柱状图数据
  public troubleCheckPie: any = null ; // 饼状图数据
  public troubleCheckYear: any = new Date().getFullYear() ; // 当前年
  public troubleCheckOperateFlag: any ; // 操作标识
  public troubleCheckOrgTreeModal: boolean = false; // 组织树模态框
  public troubleCheckOrgTree: OrgTree[] = []; // 组织树配置项
  public troubleCheckOrgTreeSelect: OrgTree = {}; // 组织树选择
  public troubleCheckOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  public troubleCheckEs: any = Es; // 日期选择插件
  public troubleCheckStartTime: string = ''; // 日期选择之开始日期
  public troubleCheckEndTime: string = ''; // 日期选择之结束日期
  constructor(
    private troubleSrv: TroubleCheckStatusService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.troubleCheckOrgTreeSelectLabel = res.data[0].organizationName;
        this.troubleCheckBarHttp(res.data[0].id, this.troubleCheckYear);
        this.troubleCheckPieHttp('2020-11-24', '2020-12-24');
        this.troubleCheckOrgTree = orgInitializeTree(res.data);
      }
    );
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

  // 饼状图数据获取
  private troubleCheckPieHttp(startTime, endTime) {
    this.troubleSrv.troubleCheckBar({startTime, endTime}).subscribe((res) => {
      this.troubleCheckPie = Object.keys(res.data).map((key) => ({name: key, value: res.data[key]}));
    });
  }

  // 基础操作
  public troubleCheckOperate(flag: string, item?: any) {
    switch (flag) {
      // 柱状图交互
      case 'chart':
        this.troubleCheckPieHttp(item.dataIndex + 1, item.dataIndex + 1);
        break;
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
      // 饼状图日期区间查询
      case 'changeChart':
        if (this.troubleCheckEndTime && this.troubleCheckStartTime) {
          if (new Date(this.troubleCheckEndTime) > new Date(this.troubleCheckStartTime)) {
            this.troubleSrv.troubleCheckBar({
              startTime: this.troubleCheckStartTime,
              endTime: this.troubleCheckEndTime,
            }).subscribe((res) => {
              this.troubleCheckPie = Object.keys(res.data).map((key) => ({name: key, value: res.data[key]}));
            });
          } else {
            window.confirm('结束时间必须大于开始时间！');
          }
          break;
        } else {
          window.confirm('必须选择日期区间！');
          break;
        }
    }
  }

}
