import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {AddEquipmentSpecialFieldClass, EquipmentSpecialField, UpdateEquipmentSpecialFieldClass} from '../equipmentApi';
import {EquipmentService} from '../../../common/services/equipment.service';
import {GlobalService} from '../../../common/services/global.service';
import {Es, orgInitializeTree} from '../../../common/public/contents';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-equipment-special',
  templateUrl: './equipment-special.component.html',
  styleUrls: ['./equipment-special.component.scss']
})
export class EquipmentSpecialComponent implements OnInit {

  public eqSpecialPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public eqSpecialTableHeader: TableHeader[] = [
    {field: 'equipmentName', header: '设备名称'},
    {field: 'position', header: '安装位置'},
    {field: 'organizationName', header: '所属车间'},
    {field: 'specialParameters', header: '特种参数'},
    {field: 'factoryNumber', header: '出厂编号'},
    {field: 'operationTime', header: '投用时间'},
    {field: 'inspectionDate', header: '检验日期'},
    {field: 'inspectionPeriod', header: '检验周期'},
    {field: 'nextInspectionDate', header: '下次检验日期'},
    {field: 'operationStatus', header: '运行状态'},
  ]; // 表头字段
  public eqSpecialTableData: any[]; // 表体数据
  public eqSpecialTableSelect: any = []; // 表格选择数据
  public eqSpecialNowPage: number = 1; // 当前页
  public eqSpecialOperateFlag: any ; // 操作标识
  public eqSpecialOperateField: EquipmentSpecialField = new AddEquipmentSpecialFieldClass(); // 操作字段
  public eqSpecialOperateModal: boolean = false; // 模态框
  public eqSpecialOrgTreeModal: boolean = false; // 组织树模态框
  public eqSpecialOrgTree: OrgTree[] = []; // 组织树配置项
  public eqSpecialOrgTreeSelect: OrgTree = {}; // 组织树选择
  public eqSpecialOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  public eqSpecialDropdownOptions: any = [
    {value: 1, label: '正常'},
    {value: 2, label: '异常'},
  ]; // 状态下拉配置项
  public eqSpecialDropdownSelected: any; // 状态下拉选择
  public eqSpecialDropdownPlaceholder: any = '请选择运行状况'; //  状态下拉label
  public eqSpecialEs: any = Es; // 日期选择插件
  constructor(
    private equipmentSrv: EquipmentService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.eqSpecialDataInit(this.eqSpecialNowPage, this.eqSpecialPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.eqSpecialOrgTree = orgInitializeTree(res.data);
      }
    );
  }
  // 数据初始化
  private eqSpecialDataInit(currentPage, pageSize) {
    this.equipmentSrv.equipmentSpecialList({currentPage, pageSize}).subscribe((res) => {
      this.eqSpecialTableData = res.data.datas;
      this.eqSpecialPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private eqSpecialHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.eqSpecialOperateModal = false;
      this.eqSpecialDataInit(this.eqSpecialNowPage, this.eqSpecialPageOption.pageSize);
    });
  }

  // 基础操作
  public eqSpecialOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.eqSpecialOperateModal = true;
        this.eqSpecialOperateField = Object.assign({}, new AddEquipmentSpecialFieldClass());
        this.eqSpecialOrgTreeSelectLabel = '点击选择单位';
        this.eqSpecialDropdownPlaceholder = '请选择运行状况';
        this.eqSpecialOrgTreeSelect = {};
        this.eqSpecialDropdownSelected = null;
        break;
      // 编辑操作初始化
      case 'update':
        this.eqSpecialOrgTreeSelectLabel = item.organizationName;
        this.eqSpecialDropdownPlaceholder = item.operationStatus === 1 ? '正常' : '异常';
        this.eqSpecialOrgTreeSelect = {};
        this.eqSpecialDropdownSelected = null;
        this.eqSpecialOperateField = Object.assign({}, new UpdateEquipmentSpecialFieldClass(), item);
        this.eqSpecialOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.eqSpecialOperateField.id) {
          if ('id' in this.eqSpecialOrgTreeSelect) {
            this.eqSpecialOperateField.organizationId = this.eqSpecialOrgTreeSelect.id;
          }
          if (this.eqSpecialDropdownSelected ) {
            this.eqSpecialOperateField.operationStatus = this.eqSpecialDropdownSelected.value;
          }
          delete this.eqSpecialOperateField['organizationName'];
          delete this.eqSpecialOperateField['idt'];
          delete this.eqSpecialOperateField['no'];
          this.eqSpecialHttpOperate(this.equipmentSrv.equipmentSpecialUpdate(this.eqSpecialOperateField));
        }
        // 新增保存
        else {
          this.eqSpecialOperateField.organizationId = this.eqSpecialOrgTreeSelect.id;
          this.eqSpecialOperateField.operationStatus = this.eqSpecialDropdownSelected.value;
          this.eqSpecialHttpOperate(this.equipmentSrv.equipmentSpecialAdd(this.eqSpecialOperateField));
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.eqSpecialHttpOperate(this.equipmentSrv.equipmentSpecialDel({ids: [item.id]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.eqSpecialTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.eqSpecialTableSelect.length}项删除吗？`)) {
            this.eqSpecialHttpOperate(this.equipmentSrv.equipmentSpecialDel({ids: this.eqSpecialTableSelect.map((val) => val.id)}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
      // 树操作
      case 'tree':
        this.eqSpecialOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.eqSpecialOrgTreeModal = false;
        break;
    }
  }

  // 分页操作
  public eqSpecialPageEvent(page) {
    this.eqSpecialNowPage = page;
    this.eqSpecialDataInit(page, this.eqSpecialPageOption.pageSize);
  }

}
