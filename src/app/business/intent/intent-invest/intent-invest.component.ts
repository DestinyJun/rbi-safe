import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {Es, InitFormGroup, orgInitializeTree} from '../../../common/public/contents';
import {Observable} from 'rxjs';
import {AddIntentInvestField, IntentInvestField, UpdateIntentInvestField} from '../intentApi';
import {IntentService} from '../../../common/services/intent.service';
import {GlobalService} from '../../../common/services/global.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-intent-invest',
  templateUrl: './intent-invest.component.html',
  styleUrls: ['./intent-invest.component.scss']
})
export class IntentInvestComponent implements OnInit {

  public investPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public investTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '组织单位'},
    {field: 'planMoney', header: '计提金额（单位/元）'},
    {field: 'useMoney', header: '支出（单位/元）'},
    {field: 'ifShare', header: '是否共用'},
    {field: 'date', header: '日期'},
  ]; // 表头字段
  public investTableData: any[]; // 表体数据
  public investTableSelect: any = []; // 表格选择数据
  public investNowPage: number = 1; // 当前页
  public investOperateFlag: any ; // 操作标识
  public investOperateField: IntentInvestField = new AddIntentInvestField(); // 操作字段
  public investOperateModal: boolean = false; // 模态框
  public investOrgTreeModal: boolean = false; // 组织树模态框
  public investOrgTree: OrgTree[] = []; // 组织树配置项
  public investOrgTreeSelect: OrgTree = {}; // 组织树选择
  public investOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  public investDropdownOptions: any = [
    {value: '是', label: '是'},
    {value: '否', label: '否'},
  ]; // 状态下拉配置项
  public investEs: any = Es; // 日期选择插件
  public investTotalPlanMoney: any = ''; // 总计提金额
  public investTotalInputMoney: any = ''; // 	总支出金额
  public investFormModal = this.fbSrv.group(InitFormGroup(new AddIntentInvestField(), ['remarks'])); // 表单模型
  constructor(
    private intentSrv: IntentService,
    private globalSrv: GlobalService,
    private fbSrv: FormBuilder
  ) { }

  ngOnInit() {
    // 监控表单模型数据变化
    this.investFormModal.valueChanges.subscribe((res) => {
      this.investFormModal.patchValue({
        planMoney: ((res.outdoorsAmount * res.outdoorsPrice) + (res.wellAmount * res.wellPrice)).toFixed(2),
      }, {onlySelf: false, emitEvent: false});
    });
    this.investDataInit(this.investNowPage, this.investPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.investOrgTree = orgInitializeTree(res.data);
      }
    );
  }
  // 数据初始化
  private investDataInit(pageNo, pageSize) {
    this.intentSrv.intentInvestList({pageNo, pageSize}).subscribe((res) => {
      this.investTableData = res.data.contents;
      this.investPageOption.totalRecord = res.data.totalRecord;
      this.investOperateFlag = 'add';
    });
    this.intentSrv.intentInvestTotal({}).subscribe((res) => {
      this.investTotalPlanMoney  = res.data.totalPlanMoney;
      this.investTotalInputMoney  = res.data.totalInputMoney;
    });
  }

  // 代理请求函数
  private investHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.investOperateModal = false;
      this.investDataInit(this.investNowPage, this.investPageOption.pageSize);
    });
  }

  // 基础操作
  public investOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.investOperateModal = true;
        this.investOperateField = Object.assign({}, new AddIntentInvestField());
        this.investOrgTreeSelectLabel = '点击选择单位';
        this.investOrgTreeSelect = {};
        break;
      // 编辑操作初始化
      case 'update':
        this.investOrgTreeSelectLabel = item.organizationName;
        this.investOrgTreeSelect = {};
        this.investOperateField = Object.assign({}, new UpdateIntentInvestField(), item);
        const Obj = {};
        Object.keys(this.investFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.investFormModal.setValue(Obj);
        this.investOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.investOperateField.id) {
          if ('id' in this.investOrgTreeSelect ) {
            this.investOperateField.organizationId = this.investOrgTreeSelect.id;
            this.investOperateField.organizationName = this.investOrgTreeSelect.label;
            this.investFormModal.patchValue({
              organizationId: this.investOrgTreeSelect.id,
              organizationName: this.investOrgTreeSelect.label,
            }, {onlySelf: false, emitEvent: false});
          }
          if (this.investFormModal.valid) {
            this.investHttpOperate(this.intentSrv.intentInvestUpdate({...this.investFormModal.value, id: this.investOperateField.id}));
          } else {
            window.confirm('请把参数填写完整!');
          }
        }
        // 新增保存
        else {
          this.investFormModal.patchValue({organizationId: this.investOrgTreeSelect.id,
            organizationName: this.investOrgTreeSelect.label,
          }, {onlySelf: false, emitEvent: false});
          if (this.investFormModal.valid) {
            this.investHttpOperate(this.intentSrv.intentInvestAdd(this.investFormModal.value));
          }
          else {
            window.confirm('请把参数填写完整!');
          }
        }
        break;
      // 取消操作
      case 'cancel':
        this.investOperateModal = false;
        this.investFormModal.reset({}, {onlySelf: false, emitEvent: false});
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.investHttpOperate(this.intentSrv.intentInvestDel({data: [{id: item.id}]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.investTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.investTableSelect.length}项删除吗？`)) {
            this.investHttpOperate(this.intentSrv.intentInvestDel({data: this.investTableSelect.map((val) => ({id: val.id}))}));
          }
        } else {
          window.confirm('请您勾选需要删除的项！');
        }
        break;
      // 树操作
      case 'tree':
        this.investOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.investOrgTreeModal = false;
        break;
    }
  }

  // 分页操作
  public investPageEvent(page) {
    this.investNowPage = page;
    this.investDataInit(page, this.investPageOption.pageSize);
  }

}
