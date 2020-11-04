import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../../common/public/Api';
import {AddIntentAimsLedgerContentFieldClass, IntentAimsLedgerContentField, IntentAimsLedgerField, UpdateIntentAimsLedgerField} from '../../intentApi';
import {IntentService} from '../../../../common/services/intent.service';
import {GlobalService} from '../../../../common/services/global.service';
import {orgInitializeTree} from '../../../../common/public/contents';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {

  public intentAimsLedgerPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public intentAimsLedgerTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '组织名称'},
    {field: 'name', header: '清单名称'},
    {field: 'maker', header: '制定人员'},
    {field: 'idt', header: '制定时间'},
  ]; // 表头字段
  public intentAimsLedgerTableData: any[]; // 表体数据
  public intentAimsLedgerTableSelect: any = []; // 表格选择数据
  public intentAimsLedgerNowPage: number = 1; // 当前页
  public intentAimsLedgerOperateFlag: any ; // 操作标识
  public intentAimsLedgerOperateField: IntentAimsLedgerField = new UpdateIntentAimsLedgerField(); // 操作字段
  public intentAimsLedgerOperateModal: boolean = false; // 模态框
  public intentAimsLedgerList: IntentAimsLedgerContentField[] = []; // 清单列表
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
    this.intentAimsLedgerDataInit(this.intentAimsLedgerNowPage, this.intentAimsLedgerPageOption.pageSize);
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
  private intentAimsLedgerDataInit(pageNo, pageSize) {
    this.intentSrv.intentAimsLedgerList({pageNo, pageSize}).subscribe((res) => {
      this.intentAimsLedgerTableData = res.data.contents;
      this.intentAimsLedgerPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private intentAimsLedgerHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.intentAimsLedgerOperateModal = false;
      this.intentAimsLedgerDataInit(this.intentAimsLedgerNowPage, this.intentAimsLedgerPageOption.pageSize);
    });
  }

  // 基础操作
  public intentAimsLedgerOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.intentAimsOrgTreeSelectLabel = '点击选择组织单位';
        this.intentAimsOrgTreeSelect = {};
        this.intentAimsLedgerList = [];
        this.intentAimsLedgerOperateModal = true;
        this.intentAimsLedgerOperateField = Object.assign({}, new UpdateIntentAimsLedgerField());
        break;
      // 编辑操作初始化
      case 'update':
        this.intentAimsOrgTreeSelectLabel = item.organizationName;
        this.intentAimsOrgTreeSelect = {};
        this.intentAimsLedgerOperateField = Object.assign({}, new UpdateIntentAimsLedgerField(), item);
        this.intentAimsLedgerList = [...this.intentAimsLedgerOperateField.targetDutyContent];
        this.intentAimsLedgerOperateModal = true;
        break;
      // 保存操作
      case 'save':
        this.intentAimsLedgerHttpOperate(this.intentSrv.intentAimsLedgerAdd(this.intentAimsLedgerOperateField));
        break;
      // 组织单位
      case 'orgTree':
        this.intentAimsOrgTreeModal = true;
        break;
      // 组织单位
      case 'selectTree':
        this.intentSrv.intentAimsLedgerChecklist({organizationId: item}).subscribe((res) => {
          this.intentAimsLedgerList = res.data.targetDutyContent.map((val) => (Object.assign(new AddIntentAimsLedgerContentFieldClass(), val)));
          this.intentAimsLedgerOperateField.maker = res.data.maker;
          this.intentAimsLedgerOperateField.name = res.data.name;
          this.intentAimsLedgerOperateField.makerId = res.data.makerId;
          this.intentAimsLedgerOperateField.organizationId = res.data.organizationId;
          this.intentAimsLedgerOperateField.organizationName = res.data.organizationName;
          this.intentAimsLedgerOperateField.targetDutyContent = this.intentAimsLedgerList;
        });
        break;
      // 人员添加
      case 'addList':
        this.intentAimsLedgerList.push(new AddIntentAimsLedgerContentFieldClass());
        break;
    }
  }

  // 分页操作
  public intentAimsLedgerPageEvent(page) {
    this.intentAimsLedgerNowPage = page;
    this.intentAimsLedgerDataInit(page, this.intentAimsLedgerPageOption.pageSize);
  }

}
