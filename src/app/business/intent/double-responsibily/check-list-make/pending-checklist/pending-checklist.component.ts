import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PageOption, TableHeader} from '../../../../../common/public/Api';
import {ChecklistMakeService} from '../../../../../common/services/checklist-make.service';
import {PublicMethodService} from '../../../../../common/public/public-method.service';

@Component({
  selector: 'app-pending-checklist',
  templateUrl: './pending-checklist.component.html',
  styleUrls: ['./pending-checklist.component.scss']
})
export class PendingChecklistComponent implements OnInit {
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
    // {field: 'badSituation', header:	'未履职情况'},
    // {field: 'correctSituati', header:	'纠正与考核情况'},
    {field: 'position', header:	'岗位'},
    {field: 'personnelName', header:	'测评人'},
    {field: 'writeTime', header:	'填写时间'},
    // {field: 'status', header:	'状态'},
    {field: 'auditTime', header:	'审核时间'},
    {field: 'auditorName', header:	'审核人'},
    // {field: 'organizationNa', header:	'组织名'},
    {field: 'statusName', header:	'状态名'}, // 已转成汉字 显示这个
    // {field: 'content', header:	'检查内容'},
    // {field: 'fraction', header:	'分值'},
    // {field: 'selfEvaluation', header:	'自评内容'},
    // {field: 'selfFraction', header: '自评得分'},
    // {field: 'checkResult', header: '检查结果'},
    // {field: 'checkFraction', header: '得分'},
  ]; // 表头字段
  public items: any[]; // 表体数据
  public item: any; // 用来做详情数据
  public checkItem = {
    badSituation: '',
    id: '',
    correctSituation: '',
    content: []
  }; // 审核数据
  public displayDetail = false;
  public curPage = 1;
  constructor(
    private checkListSrv: ChecklistMakeService,
    private toolSrv: PublicMethodService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataInit(this.curPage, this.pageOption.pageSize);
  }
  // 数据初始化
  private dataInit(pageNo, pageSize) {
    this.checkListSrv.dbEvaluationFindAuditByPage({pageNo, pageSize}).subscribe((res) => {
      this.items = res.data ? res.data.contents : [];
      this.items.forEach(item => {
        item.doubleDutyEvaluationContents.forEach(content => {
          content.checkResult = '符合';
          content.checkFraction = content.fraction;
        });
      });
      this.pageOption.totalRecord = res.data ? res.data.totalRecord : 0;
    });
  }
  // 操作
  public detail(item?: any) {
    this.item = item;
    this.displayDetail = true;
  }

  // 分页操作
  public contentsPageEvent(page) {
    this.curPage = page;
    this.dataInit(page, this.pageOption.pageSize);
  }

  public save(): void {
    this.checkItem.id = this.item.id;
    this.item.doubleDutyEvaluationContents.forEach(value => {
      this.checkItem.content.push({ id: value.id,
        checkResult: value.checkResult,
        checkFraction: value.checkFraction});
    });
    // 先检验数据的合法性
    let valid = true;
    this.item.doubleDutyEvaluationContents.forEach(content => {
      if (content.selfFraction > content.fraction) {
        valid = false;
      }
    });
    if (!valid) {
      this.toolSrv.setToast('error', '提示', '检查得分不能大于总分');
      return;
    }
    if (this.validObject(this.checkItem)) {
      this.checkListSrv.dbEvaluationAudit(this.checkItem).subscribe(res => {
        this.toolSrv.setToast('success', '提示', '提交成功');
        this.displayDetail = false;
        this.dataInit(this.curPage, this.pageOption.pageSize);
        this.checkItem = {
          badSituation: '',
          id: '',
          correctSituation: '',
          content: []
        };
      });
    } else {
      this.toolSrv.setToast('error', '提示', '全部数据必填');
    }
  }


  // 递归判断对象是否有空值
  private validObject(obj: any): boolean {
    let ret = true; // 默认对象有效
    // 拿到数据类型
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === 'Object' || type === 'Array') {
      if (type === 'Object' && Object.keys(obj).length === 0) { // 判断是否为{}
        return false;
      }
      if (type === 'Array' && obj.length === 0) { // 判断是否为[]
        return false;
      }
      for (const objKey in obj) {
        if (objKey !== 'safeTestQuestionsList') {
          ret = ret && this.validObject(obj[objKey]);
        }
      }
    } else {
      if (!obj || obj === '') {
        ret = false;
      }
    }
    return ret;
  }

}
