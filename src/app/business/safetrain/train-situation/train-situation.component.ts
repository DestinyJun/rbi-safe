import { Component, OnInit } from '@angular/core';
import {OrgTree} from '../../../common/public/Api';
import {AccidentService} from '../../../common/services/accident.service';
import {GlobalService} from '../../../common/services/global.service';
import {orgInitializeTree} from '../../../common/public/contents';
import {SafetrainService} from '../../../common/services/safetrain.service';

@Component({
  selector: 'app-train-situation',
  templateUrl: './train-situation.component.html',
  styleUrls: ['./train-situation.component.scss']
})
export class TrainSituationComponent implements OnInit {

  public trainSituationTopChart: any = null ; // 教育培训平均成绩/覆盖率统计统计图
  public trainSituationBottomChart: any = null ; // 教育培训月数量统计图
  public trainSituationYear: any = new Date().getFullYear() ; // 当前年
  public trainSituationOperateFlag: any ; // 操作标识
  public trainSituationOrgTreeModal: boolean = false; // 组织树模态框
  public trainSituationOrgTree: OrgTree[] = []; // 组织树配置项
  public trainSituationOrgTreeSelect: OrgTree = {}; // 组织树选择
  public trainSituationOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  constructor(
    private trainSrv: SafetrainService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.trainSituationOrgTreeSelectLabel = res.data[0].organizationName;
        this.trainSituationChartHttp(res.data[0].id, this.trainSituationYear);
        this.trainSituationOrgTree = orgInitializeTree(res.data);
      }
    );
  }

  // 柱状图数据获取
  private trainSituationChartHttp(organizationId, year) {
    this.trainSrv.trainSituationTopChart({organizationId, year}).subscribe((res) => {
      const xdata = res.data.xDate;
      const barData = [
        {name: '未参加人数', value: res.data.yColumn},
      ];
      const lineData = [
        {name: '平均成绩', value: res.data.yLine},
      ];
      this.trainSituationTopChart = {xdata, barData, lineData};
    });
    this.trainSrv.trainSituationBottomChart({organizationId, year}).subscribe((res) => {
      const xdata = res.data.xDate;
      const data = [
        {name: '公司级', value: res.data.gongsiji},
        {name: '分厂级', value: res.data.fenchangji},
        {name: '车间级', value: res.data.chejianji},
        {name: '班组级', value: res.data.banzhuji},
      ];
      this.trainSituationBottomChart = {xdata, data};
    });
  }

  // 基础操作
  public trainSituationOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'tree':
        this.trainSituationOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.trainSituationOrgTreeModal = false;
        this.trainSituationOrgTreeSelectLabel = this.trainSituationOrgTreeSelect.label;
        this.trainSituationChartHttp(this.trainSituationOrgTreeSelect.id, this.trainSituationYear);
        break;
    }
  }

}
