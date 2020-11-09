import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {Es, orgInitializeTree} from '../../../common/public/contents';
import {GlobalService} from '../../../common/services/global.service';
import {Observable} from 'rxjs';
import {EmergencyService} from '../../../common/services/emergency.service';
import {AddEmergencyPlanFieldClass, EmergencyPlanField, EmergencyPlanHandleField, UpdateEmergencyPlanFieldClass, UpdateEmergencyPlanHandleFieldClass} from '../emergencyApi';

@Component({
  selector: 'app-emergency-plan',
  templateUrl: './emergency-plan.component.html',
  styleUrls: ['./emergency-plan.component.scss']
})
export class EmergencyPlanComponent implements OnInit {

  public emPlanPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public emPlanTableHeader: TableHeader[] = [
    {field: 'emergencyPlanName', header: '应急预案名称'},
    {field: 'preparationUnit', header: '编制单位名称'},
    {field: 'controlOrganization', header: '主控单位名称'},
    {field: 'reservePlanType', header: '预案类别'},
    {field: 'filingOrganization', header: '备案单位'},
    {field: 'reviewStatus', header: '是否通过专家评估'},
  ]; // 表头字段
  public emPlanTableData: any[]; // 表体数据
  public emPlanTableSelect: any = []; // 表格选择数据
  public emPlanNowPage: number = 1; // 当前页
  public emPlanOperateFlag: any ; // 操作标识
  public emPlanOperateField: EmergencyPlanField = new AddEmergencyPlanFieldClass(); // 操作字段
  public emPlanOperateModal: boolean = false; // 模态框
  public emPlanOrgTree: OrgTree[] = []; // 组织树配置项
  public emPlanEs: any = Es; // 组织树配置项


  public emPlanHandleModal: boolean = false; // 处理模态框
  public emPlanHandleField: EmergencyPlanHandleField = new UpdateEmergencyPlanHandleFieldClass(); // 处理操作字段
  public emPlanHandleDropdownOptions: any = [
    {label: '未通过', value: '0'},
    {label: '通过', value: '1'},
  ]; // 处理状态下拉配置项
  public emPlanHandleDropdownSelected: any; // 处理状态下拉选择
  public emPlanHandleDropdownPlaceholder: any = '请选择评审状态'; //  处理状态下拉label

  public emPlanPlaitTreeModal: boolean = false; // 编制单位组织树模态框
  public emPlanPlaitTreeSelect: OrgTree = {}; // 编制单位组织树选择
  public emPlanPlaitTreeSelectLabel: any = '点击选择编制单位'; // 编制单位组织树label

  public emPlanMasterTreeModal: boolean = false; // 主控单位组织树模态框
  public emPlanMasterTreeSelect: OrgTree = {}; // 主控单位组织树选择
  public emPlanMasterTreeSelectLabel: any = '点击选择主控单位'; // 主控单位组织树label

  public emPlanDropdownOptions: any = [
    {label: '现场处理预案', value: '现场处理预案'},
    {label: '专项预案', value: '专项预案'},
    {label: '综合预案', value: '综合预案'},
  ]; // 状态下拉配置项
  public emPlanDropdownSelected: any; // 状态下拉选择
  public emPlanDropdownPlaceholder: any = '请选择预案类别'; //  状态下拉label
  constructor(
    private emergencySrv: EmergencyService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.emPlanDataInit(this.emPlanNowPage, this.emPlanPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.emPlanOrgTree = orgInitializeTree(res.data);
      }
    );
  }
  // 数据初始化
  private emPlanDataInit(currentPage, pageSize) {
    this.emergencySrv.emergencyPlanList({currentPage, pageSize}).subscribe((res) => {
      this.emPlanTableData = res.data.datas;
      this.emPlanPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private emPlanHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.emPlanOperateModal = false;
      this.emPlanHandleModal = false;
      this.emPlanDataInit(this.emPlanNowPage, this.emPlanPageOption.pageSize);
    });
  }

  // 基础操作
  public emPlanOperate(flag: string, item?: any, obj?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.emPlanOperateModal = true;
        this.emPlanOperateField = Object.assign({}, new AddEmergencyPlanFieldClass());
        this.emPlanPlaitTreeSelectLabel = '点击选择编制单位';
        this.emPlanMasterTreeSelectLabel = '点击选择主控单位';
        this.emPlanDropdownPlaceholder = '请选择预案类别';
        this.emPlanPlaitTreeSelect = {};
        this.emPlanPlaitTreeSelect = {};
        this.emPlanDropdownSelected = null;
        item.clear();
        break;
      // 编辑操作初始化
      case 'update':
        obj.clear();
        this.emPlanPlaitTreeSelectLabel = item.preparationUnit;
        this.emPlanMasterTreeSelectLabel = item.controlOrganization;
        this.emPlanDropdownPlaceholder = item.reservePlanType;
        this.emPlanPlaitTreeSelect = {};
        this.emPlanPlaitTreeSelect = {};
        this.emPlanDropdownSelected = null;
        const objs = new UpdateEmergencyPlanFieldClass();
        for (const keys in objs) {
          if (objs.hasOwnProperty(keys)) {
            this.emPlanOperateField[keys] = item[keys];
          }
        }
        this.emPlanOperateModal = true;
        break;
      // 处理操作
      case 'handle':
        obj.clear();
        this.emPlanDropdownPlaceholder = item.reservePlanType;
        this.emPlanDropdownSelected = null;
        this.emPlanHandleDropdownPlaceholder = item.reviewStatus === '0' ? '未通过' : '通过';
        this.emPlanHandleDropdownSelected = null;
        const objsHandle = new UpdateEmergencyPlanHandleFieldClass();
        for (const keys in objsHandle) {
          if (objsHandle.hasOwnProperty(keys)) {
            this.emPlanHandleField[keys] = item[keys];
          }
        }
        this.emPlanHandleModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.emPlanOperateField.id) {
          if ('id' in this.emPlanMasterTreeSelect ) {
            this.emPlanOperateField.controlOrganizationId = this.emPlanMasterTreeSelect.id;
            this.emPlanOperateField.controlOrganization = this.emPlanMasterTreeSelect.label;
          }
          if ('id' in this.emPlanPlaitTreeSelect ) {
            this.emPlanOperateField.preparationUnitId = this.emPlanPlaitTreeSelect.id;
            this.emPlanOperateField.preparationUnit = this.emPlanPlaitTreeSelect.label;
          }
          if (this.emPlanDropdownSelected ) {
            this.emPlanOperateField.reservePlanType = this.emPlanDropdownSelected.value;
          }
          const field = new FormData();
          Object.keys(this.emPlanOperateField).forEach(res => {
            field.append(res, this.emPlanOperateField[res]);
          });
          if (item.length > 0) {
            item.forEach(res => {
              field.append('filingAttachment', res);
            });
          }
          this.emPlanHttpOperate(this.emergencySrv.emergencyPlanUpdate(field));
        }
        // 新增保存
        else {
          if ('id' in this.emPlanMasterTreeSelect ) {
            this.emPlanOperateField.controlOrganizationId = this.emPlanMasterTreeSelect.id;
            this.emPlanOperateField.controlOrganization = this.emPlanMasterTreeSelect.label;
          }
          if ('id' in this.emPlanPlaitTreeSelect ) {
            this.emPlanOperateField.preparationUnitId = this.emPlanPlaitTreeSelect.id;
            this.emPlanOperateField.preparationUnit = this.emPlanPlaitTreeSelect.label;
          }
          if (this.emPlanDropdownSelected ) {
            this.emPlanOperateField.reservePlanType = this.emPlanDropdownSelected.value;
          }
          const field = new FormData();
          Object.keys(this.emPlanOperateField).forEach(res => {
            field.append(res, this.emPlanOperateField[res]);
          });
          if (item.length > 0) {
            item.forEach(res => {
              field.append('filingAttachment', res);
            });
          }
          this.emPlanHttpOperate(this.emergencySrv.emergencyPlanAdd(field));
        }
        break;
      // 处理保存操作
      case 'handleSave':
        if (this.emPlanDropdownSelected ) {
          this.emPlanHandleField.reservePlanType = this.emPlanDropdownSelected.value;
        }
        if (this.emPlanHandleDropdownSelected ) {
          this.emPlanHandleField.reviewStatus = this.emPlanHandleDropdownSelected.value;
        }
        const handleField = new FormData();
        Object.keys(this.emPlanHandleField).forEach(res => {
          handleField.append(res, this.emPlanHandleField[res]);
        });
        if (item.length > 0) {
          item.forEach(res => {
            handleField.append('reviewAttachment', res);
          });
        }
        this.emPlanHttpOperate(this.emergencySrv.emergencyPlanHandle(handleField));
        break;
      // 编制单位
      case 'plaitTree':
        this.emPlanPlaitTreeModal = true;
        break;
      // 主控单位
      case 'masterTree':
        this.emPlanMasterTreeModal = true;
        break;
    }
  }

  // 分页操作
  public emPlanPageEvent(page) {
    this.emPlanNowPage = page;
    this.emPlanDataInit(page, this.emPlanPageOption.pageSize);
  }
}
