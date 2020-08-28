import {Component, Input, OnInit} from '@angular/core';
import {PageOption, TableHeader} from "../../../../common/public/Api";
import {SafetrainService} from "../../../../common/services/safetrain.service";
import {PublicMethodService} from "../../../../common/public/public-method.service";
import {Observable} from "rxjs";
import {ChecklistMakeService} from "../../../../common/services/checklist-make.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-checklist',
  templateUrl: './my-checklist.component.html',
  styleUrls: ['./my-checklist.component.scss']
})
export class MyChecklistComponent implements OnInit {

  public pageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public tableHeader: TableHeader[] = [
    {field: 'companyName', header:	'分公司'},
    {field: 'factoryName', header:	'厂矿'},
    {field: 'workshopName', header:	'车间'},
    {field: 'className', header:	'班组'},
    {field: 'templateName', header:	'清单名称'},
    {field: 'position', header:	'岗位'},
    // {field: 'badSituation', header:	'未履职情况'},
    // {field: 'correctSituati', header:	'纠正与考核情况'},
    {field: 'personnelName', header:	'测评人'},
    {field: 'writeTime', header:	'填写时间'},
    {field: 'auditTime', header:	'审核时间'},
    // {field: 'status', header:	'状态'},
    {field: 'auditorName', header:	'审核人'},
    {field: 'statusName', header:	'状态名'}, // 已转成汉字 显示这个
    // {field: 'organizationNa', header:	'组织名'},
    // {field: 'content', header:	'检查内容'},
    // {field: 'fraction', header:	'分值'},
    // {field: 'selfEvaluation', header:	'自评内容'},
    // {field: 'selfFraction', header: '自评得分'},
    // {field: 'checkResult', header: '检查结果'},
    // {field: 'checkFraction', header: '得分'},
  ]; // 表头字段
  public items: any[]; // 表体数据
  public item: any; // 用来做详情数据
  public displayDetail = false;
  constructor(
    private checkListSrv: ChecklistMakeService,
    private toolSrv: PublicMethodService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataInit(1, this.pageOption.pageSize);
  }
  // 数据初始化
  private dataInit(pageNo, pageSize) {
    this.checkListSrv.dbEvaluationFindPersonelByPage({pageNo, pageSize}).subscribe((res) => {
      this.items = res.data.contents;
      this.pageOption.totalRecord = res.data.totalRecord;
    });
  }
  // 操作
  public detail(item?: any) {
    this.item = item;
    this.displayDetail = true;
  }

  // 分页操作
  public contentsPageEvent(page) {
      this.dataInit(page, this.pageOption.pageSize);
  }
}
