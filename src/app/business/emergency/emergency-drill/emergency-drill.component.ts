import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {AddEmergencyDrillFieldClass, EmergencyDrillField, UpdateEmergencyDrillFieldClass} from '../emergencyApi';
import {Es, InitFormGroup, orgInitializeTree} from '../../../common/public/contents';
import {EmergencyService} from '../../../common/services/emergency.service';
import {GlobalService} from '../../../common/services/global.service';
import {Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import {Hidden, Show} from '../../../store/loadstatus.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/loadstatus.state';

@Component({
  selector: 'app-emergency-drill',
  templateUrl: './emergency-drill.component.html',
  styleUrls: ['./emergency-drill.component.scss']
})
export class EmergencyDrillComponent implements OnInit {

  public emDrillPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public emDrillTableHeader: TableHeader[] = [
    {field: 'emergencyPlanName', header: '应急预案名称'},
    {field: 'controlOrganization', header: '主控单位'},
    {field: 'projectUndertaker', header: '计划承办演练单位'},
    {field: 'planDrillTime', header: '计划演练时间'},
    {field: 'plannedDrillForm', header: '计划演练形式'},
    {field: 'actualFrequency', header: '实演练次数'},
    {field: 'actualDrillTime', header: '实际演练时间'},
    {field: 'place', header: '地点'},
  ]; // 表头字段
  public emDrillTableData: any[]; // 表体数据
  public emDrillTableSelect: any = []; // 表格选择数据
  public emDrillNowPage: number = 1; // 当前页
  public emDrillOperateFlag: any ; // 操作标识
  public emDrillOperateField: EmergencyDrillField = new AddEmergencyDrillFieldClass(); // 操作字段
  public emDrillOperateModal: boolean = false; // 模态框
  public emDrillOrgTree: OrgTree[] = []; // 组织树配置项
  public emDrillEs: any = Es; // 事件本地初始化

  public emDrillPlanDropdownOptions: any = [
    {label: '全面实战', value: '全面实战'},
    {label: '功能演练', value: '功能演练'},
    {label: '桌面演练', value: '桌面演练'},
  ]; // 计划演练形式下拉配置项

  public emDrillRealityDropdownOptions: any = [
    {label: '公司级', value: '公司级'},
    {label: '分厂级', value: '分厂级'},
    {label: '车间级', value: '车间级'},
    {label: '班组级', value: '班组级'},
  ]; // 实际演练形式下拉配置项

  public emDrillMasterPlaitTreeModal: boolean = false; // 主控单位组织树模态框
  public emDrillMasterPlaitTreeSelect: OrgTree = {}; // 主控单位组织树选择
  public emDrillMasterPlaitTreeSelectLabel: any = '点击选择主控单位'; // 主控单位组织树label

  public emDrillPlanPlaitTreeModal: boolean = false; // 计划承办演练单位组织树模态框
  public emDrillPlanPlaitTreeSelect: OrgTree = {}; // 计划承办演练单位组织树选择
  public emDrillPlanPlaitTreeSelectLabel: any = '点击选择计划承办演练单位'; // 计划承办演练单位组织树label

  public emDrillImgList: any = []; // 图片文件列表
  public emDrillImgId: any = null; // 图片所属Id

  public emDrillFormModal = this.fbSrv.group(InitFormGroup(new AddEmergencyDrillFieldClass())); // 表单模型

  constructor(
    private emergencySrv: EmergencyService,
    private globalSrv: GlobalService,
    private fbSrv: FormBuilder,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.emDrillDataInit(this.emDrillNowPage, this.emDrillPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.emDrillOrgTree = orgInitializeTree(res.data);
      }
    );
  }
  // 数据初始化
  private emDrillDataInit(currentPage, pageSize) {
    this.emergencySrv.emergencyDrillList({currentPage, pageSize}).subscribe((res) => {
      this.emDrillTableData = res.data.datas;
      this.emDrillPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private emDrillHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.emDrillOperateModal = false;
      this.emDrillDataInit(this.emDrillNowPage, this.emDrillPageOption.pageSize);
    });
  }

  // 基础操作
  public emDrillOperate(flag: string, item?: any, obj?: any) {
    switch (flag) {
      // 取消操作
      case 'cancel':
        this.emDrillOperateModal = false;
        this.emDrillFormModal.reset({});
        break;
      // 图片删除操作
      case 'imgDel':
        if (window.confirm('您确定需要删除吗？')) {
          this.emergencySrv.emergencyDrillImgDel({id: this.emDrillImgId, realPath: item}).subscribe((res) => {
            this.emDrillImgList = this.emDrillImgList.filter((val) => (val !== item));
            this.emDrillDataInit(this.emDrillNowPage, this.emDrillPageOption.pageSize);
          });
        }
        break;
      // 添加操作初始化
      case 'add':
        this.emDrillOperateModal = true;
        this.emDrillOperateField = Object.assign({}, new AddEmergencyDrillFieldClass());
        this.emDrillMasterPlaitTreeSelectLabel = '点击选择主控单位';
        this.emDrillPlanPlaitTreeSelectLabel = '点击选择计划承办演练单位';
        this.emDrillMasterPlaitTreeSelect = {};
        this.emDrillPlanPlaitTreeSelect = {};
        item.clear();
        break;
      // 编辑操作初始化
      case 'update':
        obj.clear();
        this.emDrillImgList = [];
        if (item.attachmentPaths) {
          item.attachmentPaths.forEach(res => {
            this.emDrillImgList.push(res);
          });
        }
        this.emDrillImgId = item.id;
        this.emDrillMasterPlaitTreeSelectLabel = item.controlOrganization;
        this.emDrillPlanPlaitTreeSelectLabel = item.projectUndertaker;
        this.emDrillMasterPlaitTreeSelect = {};
        this.emDrillPlanPlaitTreeSelect = {};
        const objs = new UpdateEmergencyDrillFieldClass();
        for (const keys in objs) {
          if (objs.hasOwnProperty(keys)) {
            this.emDrillOperateField[keys] = item[keys];
          }
        }
        const Obj = {};
        Object.keys(this.emDrillFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.emDrillFormModal.setValue(Obj);
        this.emDrillOperateModal = true;
        break;
      // 保存操作
      case 'save':
        this.store.dispatch(new Show());
        // 修改保存
        if (this.emDrillOperateField.id) {
          if ('id' in this.emDrillMasterPlaitTreeSelect ) {
            this.emDrillFormModal.patchValue({
              controlOrganizationId: this.emDrillMasterPlaitTreeSelect.id,
              controlOrganization: this.emDrillMasterPlaitTreeSelect.label,
            });
          }
          if ('id' in this.emDrillPlanPlaitTreeSelect ) {
            this.emDrillFormModal.patchValue({
              projectUndertakerId: this.emDrillPlanPlaitTreeSelect.id,
              projectUndertaker: this.emDrillPlanPlaitTreeSelect.label,
            });
          }
          if (this.emDrillFormModal.valid) {
            const field = new FormData();
            const eachObjs = {...this.emDrillFormModal.value, id: this.emDrillOperateField.id};
            Object.keys(eachObjs).forEach(res => {
              field.append(res, eachObjs[res]);
            });
            if (item.length > 0) {
              item.forEach(res => {
                field.append('attachment', res);
              });
            }
            this.emDrillHttpOperate(this.emergencySrv.emergencyDrillUpdate(field));
          } else {
            window.confirm('请把参数填写完整!');
            this.store.dispatch(new Hidden());
          }

        }
        // 新增保存
        else {
          if ('id' in this.emDrillMasterPlaitTreeSelect ) {
            this.emDrillFormModal.patchValue({
              controlOrganizationId: this.emDrillMasterPlaitTreeSelect.id,
              controlOrganization: this.emDrillMasterPlaitTreeSelect.label,
            });
          }
          if ('id' in this.emDrillPlanPlaitTreeSelect ) {
            this.emDrillFormModal.patchValue({
              projectUndertakerId: this.emDrillPlanPlaitTreeSelect.id,
              projectUndertaker: this.emDrillPlanPlaitTreeSelect.label,
            });
          }
          if (this.emDrillFormModal.valid) {
            const field = new FormData();
            Object.keys(this.emDrillFormModal.value).forEach(res => {
              field.append(res, this.emDrillFormModal.value[res]);
            });
            if (item.length > 0) {
              item.forEach(res => {
                field.append('attachment', res);
              });
            }
            this.emDrillHttpOperate(this.emergencySrv.emergencyDrillAdd(field));
          }else {
            window.confirm('请把参数填写完整!');
            this.store.dispatch(new Hidden());
          }
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.emDrillHttpOperate(this.emergencySrv.emergencyDrillDel({ids: [item.id]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.emDrillTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.emDrillTableSelect.length}项删除吗？`)) {
            this.emDrillHttpOperate(this.emergencySrv.emergencyDrillDel({ids: this.emDrillTableSelect.map((val) => val.id)}));
          }
        } else {
          window.confirm('请您勾选需要删除的项！');
        }
        break;
      // 主控单位
      case 'masterTree':
        this.emDrillMasterPlaitTreeModal = true;
        break;
      // 计划承办演练单位
      case 'planTree':
        this.emDrillPlanPlaitTreeModal = true;
        break;
    }
  }

  // 分页操作
  public emDrillPageEvent(page) {
    this.emDrillNowPage = page;
    this.emDrillDataInit(page, this.emDrillPageOption.pageSize);
  }

}
