import { Component, OnInit } from '@angular/core';
import {OrgTree} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {orgInitializeTree} from '../../../common/public/contents';
import {InstitutionService} from '../../../common/services/institution.service';

@Component({
  selector: 'app-institution-main',
  templateUrl: './institution-main.component.html',
  styleUrls: ['./institution-main.component.scss']
})
export class InstitutionMainComponent implements OnInit {

  public institutionMainBar: any = null ; // 柱状图数据
  public institutionMainYear: any = new Date().getFullYear() ; // 当前年
  public institutionMainMonth: any = (new Date().getMonth()) + 1 ; // 当前月
  public institutionMainOperateFlag: any ; // 操作标识
  public institutionMainOrgTreeModal: boolean = false; // 组织树模态框
  public institutionMainOrgTree: OrgTree[] = []; // 组织树配置项
  public institutionMainOrgTreeSelect: OrgTree = {}; // 组织树选择
  public institutionMainOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  constructor(
    private institutionSrv: InstitutionService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化请求
    this.institutionMainDataInit();
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.institutionMainOrgTree = orgInitializeTree(res.data);
      }
    );
  }

  // 数据初始化
  private institutionMainDataInit() {
    this.institutionMainBarHttp(34, this.institutionMainYear);
  }

  // 柱状图数据获取
  private institutionMainBarHttp(organizationId, year) {
    this.institutionSrv.institutionMainBar({organizationId, year}).subscribe((res) => {
      const xdata = res.data.abscissa;
      const data = [
        {name: '有效性低', value: res.data.lowEffective},
        {name: '执行度低', value: res.data.lowExecute},
        {name: '不适宜', value: res.data.lowSuit},
      ];
      this.institutionMainBar = {xdata, data};
    });
  }

  // 基础操作
  public institutionMainOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'tree':
        this.institutionMainOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.institutionMainOrgTreeModal = false;
        this.institutionMainOrgTreeSelectLabel = this.institutionMainOrgTreeSelect.label;
        this.institutionMainBarHttp(this.institutionMainOrgTreeSelect.id, this.institutionMainYear);
        break;
    }
  }

}
