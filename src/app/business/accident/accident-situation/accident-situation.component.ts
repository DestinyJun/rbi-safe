import { Component, OnInit } from '@angular/core';
import {orgInitializeTree} from '../../../common/public/contents';
import {AccidentService} from '../../../common/services/accident.service';
import {GlobalService} from '../../../common/services/global.service';
import {OrgTree} from '../../../common/public/Api';

@Component({
  selector: 'app-accident-situation',
  templateUrl: './accident-situation.component.html',
  styleUrls: ['./accident-situation.component.scss']
})
export class AccidentSituationComponent implements OnInit {
  public acSituationBar: any = null ; // 柱状图数据
  public acSituationPie: any = null ; // 饼状图数据
  public acSituationYear: any = new Date().getFullYear() ; // 当前年
  public acSituationMonth: any = (new Date().getMonth()) + 1 ; // 当前月
  public acSituationOperateFlag: any ; // 操作标识
  public acSituationOrgTreeModal: boolean = false; // 组织树模态框
  public acSituationOrgTree: OrgTree[] = []; // 组织树配置项
  public acSituationOrgTreeSelect: OrgTree = {}; // 组织树选择
  public acSituationOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  constructor(
    private accidentSrv: AccidentService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化请求
    this.acSituationDataInit();
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.acSituationOrgTree = orgInitializeTree(res.data);
      }
    );
  }

  // 数据初始化
  private acSituationDataInit() {
    this.acSituationBarHttp(34, this.acSituationYear);
    this.acSituationPieHttp(34, this.acSituationYear, this.acSituationMonth);
  }

  // 柱状图数据获取
  private acSituationBarHttp(organizationId, year) {
    this.accidentSrv.accidentSituationBar({organizationId, year}).subscribe((res) => {
      this.acSituationBar = res.data;
    });
  }

  // 饼状图数据获取
  private acSituationPieHttp(organizationId, year, month) {
    this.accidentSrv.accidentSituationPie({organizationId, year, month}).subscribe((res) => {
      this.acSituationPie = res.data;
    });
  }

  // 基础操作
  public acSituationOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'chart':
        this.acSituationPieHttp(34, this.acSituationYear, item.dataIndex + 1);
        break;
      // 树操作
      case 'tree':
        this.acSituationOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.acSituationOrgTreeModal = false;
        this.acSituationOrgTreeSelectLabel = this.acSituationOrgTreeSelect.label;
        this.acSituationBarHttp(this.acSituationOrgTreeSelect.id, this.acSituationYear);
        this.acSituationPieHttp(this.acSituationOrgTreeSelect.id, this.acSituationYear, this.acSituationMonth);
        break;
    }
  }

}
