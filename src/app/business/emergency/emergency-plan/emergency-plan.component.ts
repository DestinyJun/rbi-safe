import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {Es, InitFormGroup, orgInitializeTree} from '../../../common/public/contents';
import {GlobalService} from '../../../common/services/global.service';
import {Observable} from 'rxjs';
import {EmergencyService} from '../../../common/services/emergency.service';
import {AddEmergencyOrgAgencyFieldClass, AddEmergencyPlanFieldClass, EmergencyPlanField, EmergencyPlanHandleField, UpdateEmergencyPlanFieldClass, UpdateEmergencyPlanHandleFieldClass} from '../emergencyApi';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/loadstatus.state';
import {Hidden, Show} from '../../../store/loadstatus.actions';
import {FormBuilder} from '@angular/forms';

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
    {field: 'reviewStatus', header: '是否通过专家评审'},
  ]; // 表头字段
  public emPlanTableData: any[]; // 表体数据
  public emPlanTableSelect: any = []; // 表格选择数据
  public emPlanNowPage: number = 1; // 当前页
  public emPlanOperateFlag: any ; // 操作标识
  public emPlanOperateHeaderFlag: string = 'add' ; // 头部操作标识
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

  public emPlanPlaitTreeModal: boolean = false; // 编制单位组织树模态框
  public emPlanPlaitTreeSelect: OrgTree = {}; // 编制单位组织树选择
  public emPlanPlaitTreeSelectLabel: any = '点击选择编制单位'; // 编制单位组织树label

  public emPlanMasterTreeModal: boolean = false; // 主控单位组织树模态框
  public emPlanMasterTreeSelect: OrgTree = {}; // 主控单位组织树选择
  public emPlanMasterTreeSelectLabel: any = '点击选择主控单位'; // 主控单位组织树label

  public emPlanDropdownOptions: any = [
    {label: '现场处置预案', value: '现场处置预案'},
    {label: '专项预案', value: '专项预案'},
    {label: '综合预案', value: '综合预案'},
  ]; // 状态下拉配置项
  public emPlanFormModal = this.fbSrv.group(InitFormGroup(new AddEmergencyPlanFieldClass())); // 表单模型
  public emPlanHandleFormModal = this.fbSrv.group(InitFormGroup(new UpdateEmergencyPlanHandleFieldClass())); // 处理表单模型
  constructor(
    private emergencySrv: EmergencyService,
    private globalSrv: GlobalService,
    private store: Store<AppState>,
    private fbSrv: FormBuilder
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
      case 'cancel':
        this.emPlanOperateModal = false;
        this.emPlanFormModal.reset({}, {onlySelf: false, emitEvent: false});
        this.emPlanHandleFormModal.reset({}, {onlySelf: false, emitEvent: false});
        break;
      // 添加操作初始化
      case 'add':
        this.emPlanOperateModal = true;
        this.emPlanOperateHeaderFlag = 'add';
        this.emPlanOperateField = Object.assign({}, new AddEmergencyPlanFieldClass());
        this.emPlanPlaitTreeSelectLabel = '点击选择编制单位';
        this.emPlanMasterTreeSelectLabel = '点击选择主控单位';
        this.emPlanPlaitTreeSelect = {};
        this.emPlanPlaitTreeSelect = {};
        item.clear();
        break;
      // 编辑操作初始化
      case 'update':
        this.emPlanOperateHeaderFlag = 'update';
        obj.clear();
        this.emPlanPlaitTreeSelectLabel = item.preparationUnit;
        this.emPlanMasterTreeSelectLabel = item.controlOrganization;
        this.emPlanPlaitTreeSelect = {};
        this.emPlanPlaitTreeSelect = {};
        const objs = new UpdateEmergencyPlanFieldClass();
        for (const keys in objs) {
          if (objs.hasOwnProperty(keys)) {
            this.emPlanOperateField[keys] = item[keys];
          }
        }
        const Obj = {};
        Object.keys(this.emPlanFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.emPlanFormModal.setValue(Obj);
        this.emPlanOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.emPlanOperateField.id) {
          this.store.dispatch(new Show());
          if ('id' in this.emPlanMasterTreeSelect ) {
            this.emPlanFormModal.patchValue({
              controlOrganizationId: this.emPlanMasterTreeSelect.id,
              controlOrganization: this.emPlanMasterTreeSelect.label,
            });
          }
          if ('id' in this.emPlanPlaitTreeSelect ) {
            this.emPlanFormModal.patchValue({
              preparationUnitId: this.emPlanPlaitTreeSelect.id,
              preparationUnit: this.emPlanPlaitTreeSelect.label,
            });
          }
          if (this.emPlanFormModal.valid) {
            const field = new FormData();
            const forObj = {
              ...this.emPlanFormModal.value,
              id: this.emPlanOperateField.id,
              reviewStatus: this.emPlanOperateField.reviewStatus,
              reviewTime: this.emPlanOperateField.reviewTime,
              reviewOrganization: this.emPlanOperateField.reviewOrganization,
              reviewAttachmentPath: this.emPlanOperateField.reviewAttachmentPath,
            };
            Object.keys(forObj).forEach((res, index, eachObj) => {
              field.append(res, forObj[res]);
            });
            if (item.length > 0) {
              item.forEach(res => {
                field.append('filingAttachment', res);
              });
              this.emPlanHttpOperate(this.emergencySrv.emergencyPlanUpdate(field));
            } else {
              window.alert('必须上传文件!');
              this.store.dispatch(new Hidden());
              this.emPlanOperateFlag = 'update';
            }
          }
          else {
            window.alert('请把参数填写完整!');
            this.emPlanOperateFlag = 'update';
            this.store.dispatch(new Hidden());
          }
        }
        // 新增保存
        else {
          this.store.dispatch(new Show());
          if ('id' in this.emPlanMasterTreeSelect ) {
            this.emPlanFormModal.patchValue({
              controlOrganizationId: this.emPlanMasterTreeSelect.id,
              controlOrganization: this.emPlanMasterTreeSelect.label,
            });
          }
          if ('id' in this.emPlanPlaitTreeSelect ) {
            this.emPlanFormModal.patchValue({
              preparationUnitId: this.emPlanPlaitTreeSelect.id,
              preparationUnit: this.emPlanPlaitTreeSelect.label,
            });
          }
          if (this.emPlanFormModal.valid) {
            const field = new FormData();
            Object.keys(this.emPlanFormModal.value).forEach(res => {
              field.append(res, this.emPlanFormModal.value[res]);
            });
            if (item.length > 0) {
              item.forEach(res => {
                field.append('filingAttachment', res);
              });
              this.emPlanHttpOperate(this.emergencySrv.emergencyPlanAdd(field));
            } else {
              window.alert('必须上传文件!');
              this.store.dispatch(new Hidden());
            }
          }
          else {
            window.alert('请把参数填写完整!');
            this.store.dispatch(new Hidden());
          }
        }
        break;
      // 文件下载
      case 'open':
        window.open(item);
        break;
      // 处理操作
      case 'handle':
        obj.clear();
        this.emPlanMasterTreeSelectLabel = item.controlOrganization;
        const objsHandle = new UpdateEmergencyPlanHandleFieldClass();
        for (const keys in objsHandle) {
          if (objsHandle.hasOwnProperty(keys)) {
            if (item[keys] === 'null') {
              this.emPlanHandleField[keys] = null;
            } else {
              this.emPlanHandleField[keys] = item[keys];
            }
          }
        }
        this.emPlanHandleFormModal.setValue(this.emPlanHandleField);
        this.emPlanHandleModal = true;
        break;
      // 处理保存操作
      case 'handleSave':
        this.store.dispatch(new Show());
        if (this.emPlanHandleFormModal.valid) {
          const handleField = new FormData();
          Object.keys(this.emPlanHandleFormModal.value).forEach(res => {
            handleField.append(res, this.emPlanHandleFormModal.value[res]);
          });
          if (item.length > 0) {
            item.forEach(res => {
              handleField.append('reviewAttachment', res);
            });
          }
          this.emPlanHttpOperate(this.emergencySrv.emergencyPlanHandle(handleField));
        } else {
          window.alert('请把参数填写完整!');
          this.store.dispatch(new Hidden());
        }
        break;
      // 编制单位
      case 'plaitTree':
        this.emPlanPlaitTreeModal = true;
        break;
      // 主控单位
      case 'masterTree':
        this.emPlanMasterTreeModal = true;
        break;
      // 批量删除
      case 'multiple':
        if (this.emPlanTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.emPlanTableSelect.length}项删除吗？`)) {
            this.emPlanHttpOperate(this.emergencySrv.emergencyPlanDel({ids: this.emPlanTableSelect.map((val) => val.id)}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
    }
  }

  // 分页操作
  public emPlanPageEvent(page) {
    this.emPlanNowPage = page;
    this.emPlanDataInit(page, this.emPlanPageOption.pageSize);
  }
}
