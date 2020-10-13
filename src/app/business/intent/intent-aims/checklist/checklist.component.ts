import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../../common/public/Api';
import {Observable} from 'rxjs';
import {IntentService} from '../../../../common/services/intent.service';
import {AddIntentAimsChecklistContentFieldClass, AddIntentAimsChecklistField, IntentAimsChecklistContentField, IntentAimsChecklistField, UpdateIntentAimsChecklistField} from '../../intentApi';
import {GlobalService} from '../../../../common/services/global.service';
import {orgInitializeTree} from '../../../../common/public/contents';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss']
})
export class ChecklistComponent implements OnInit {

  public intentAimsCheckPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public intentAimsCheckTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '组织名称'},
    {field: 'maker', header: '制定人'},
    {field: 'idt', header: '制定时间'},
  ]; // 表头字段
  public intentAimsCheckTableData: any[]; // 表体数据
  public intentAimsCheckTableSelect: any = []; // 表格选择数据
  public intentAimsCheckNowPage: number = 1; // 当前页
  public intentAimsCheckOperateFlag: any ; // 操作标识
  public intentAimsCheckOperateField: IntentAimsChecklistField = new AddIntentAimsChecklistField(); // 操作字段
  public intentAimsCheckOperateModal: boolean = false; // 模态框
  public intentAimsCheckList: IntentAimsChecklistContentField[] = []; // 清单列表
  public intentAimsDropdownOptions: any = []; // 清单类型下拉配置项
  public intentAimsDropdownPlaceholder: any = '请选择清单类型'; //  清单类型下拉label
  public intentAimsOrgTree: OrgTree[] = []; // 组织单位树配置项
  public intentAimsOrgTreeModal: boolean = false; // 组织单位组织树模态框
  public intentAimsOrgTreeSelect: OrgTree = {}; // 组织单位组织树选择
  public intentAimsOrgTreeSelectLabel: any = '点击选择组织单位'; // 组织单位组织树label
  constructor(
    private intentSrv: IntentService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.intentAimsCheckDataInit(this.intentAimsCheckNowPage, this.intentAimsCheckPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.intentAimsOrgTree = orgInitializeTree(res.data);
      }
    );
    // 初始化类型选择
    this.globalSrv.getHidConfigData({data: [{settingType: 'TARGET_TYPE'}]}).subscribe(
      (res) => {
        this.intentAimsDropdownOptions = res.data.TARGET_TYPE.map((item) => ({label: item.settingName, value: item.settingCode}));
      }
    );
  }
  // 数据初始化
  private intentAimsCheckDataInit(pageNo, pageSize) {
    this.intentSrv.intentAimsCheckList({pageNo, pageSize}).subscribe((res) => {
      this.intentAimsCheckTableData = res.data.contents;
      this.intentAimsCheckPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private intentAimsCheckHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.intentAimsCheckOperateModal = false;
      this.intentAimsCheckDataInit(this.intentAimsCheckNowPage, this.intentAimsCheckPageOption.pageSize);
    });
  }

  // 基础操作
  public intentAimsCheckOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.intentAimsOrgTreeSelectLabel = '点击选择组织单位';
        this.intentAimsOrgTreeSelect = {};
        this.intentAimsCheckList = [];
        this.intentAimsCheckOperateModal = true;
        this.intentAimsCheckOperateField = Object.assign({}, new AddIntentAimsChecklistField());
        break;
      // 编辑操作初始化
      case 'update':
        this.intentAimsOrgTreeSelectLabel = item.organizationName;
        this.intentAimsOrgTreeSelect = {};
        this.intentAimsCheckOperateField = Object.assign({}, new UpdateIntentAimsChecklistField(), item);
        this.intentAimsCheckList = [...this.intentAimsCheckOperateField.targetDutyContent];
        this.intentAimsCheckOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.intentAimsCheckOperateField.id) {
          if ('id' in this.intentAimsOrgTreeSelect ) {
            this.intentAimsCheckOperateField.organizationId = this.intentAimsOrgTreeSelect.id;
            this.intentAimsCheckOperateField.organizationName = this.intentAimsOrgTreeSelect.label;
          }
          this.intentAimsCheckOperateField.targetDutyContent = this.intentAimsCheckList;
          this.intentAimsCheckHttpOperate(this.intentSrv.intentAimsCheckUpdate(this.intentAimsCheckOperateField));
        }
        // 新增保存
        else {
          if ('id' in this.intentAimsOrgTreeSelect ) {
            this.intentAimsCheckOperateField.organizationId = this.intentAimsOrgTreeSelect.id;
            this.intentAimsCheckOperateField.organizationName = this.intentAimsOrgTreeSelect.label;
          }
          this.intentAimsCheckOperateField.targetDutyContent = this.intentAimsCheckList;
          this.intentAimsCheckHttpOperate(this.intentSrv.intentAimsCheckAdd(this.intentAimsCheckOperateField));
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.intentAimsCheckHttpOperate(this.intentSrv.intentAimsCheckDel({data: [{id: item.id}]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.intentAimsCheckTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.intentAimsCheckTableSelect.length}项删除吗？`)) {
            this.intentAimsCheckHttpOperate(this.intentSrv.intentAimsCheckDel({data: this.intentAimsCheckTableSelect.map((val) => ({id: val.id}))}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
      // 组织单位
      case 'orgTree':
        this.intentAimsOrgTreeModal = true;
        break;
      // 人员添加
      case 'addList':
        this.intentAimsCheckList.push(new AddIntentAimsChecklistContentFieldClass());
        break;
      // 人员删除
      case 'delList':
        if ('id' in this.intentAimsCheckOperateField ) {
          // 初始化类型选择
          this.intentSrv.intentAimsCheckSingleDel({id: this.intentAimsCheckList[item].id}).subscribe(
            () => {
              this.intentAimsCheckDataInit(this.intentAimsCheckNowPage, this.intentAimsCheckPageOption.pageSize);
              window.alert('删除成功！');
            }
          );
        }
        this.intentAimsCheckList = this.intentAimsCheckList.filter((res, index) => (index !== item));
        break;
    }
  }

  // 分页操作
  public intentAimsCheckPageEvent(page) {
    this.intentAimsCheckNowPage = page;
    this.intentAimsCheckDataInit(page, this.intentAimsCheckPageOption.pageSize);
  }


}
