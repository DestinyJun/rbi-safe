import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, SpecialDay, SpecialDayClass, TableHeader} from '../../../common/public/Api';
import {AddEquipmentSpecialFieldClass, EquipmentSpecialField, UpdateEquipmentSpecialFieldClass} from '../equipmentApi';
import {EquipmentService} from '../../../common/services/equipment.service';
import {GlobalService} from '../../../common/services/global.service';
import {Es, InitFormGroup, objectCopy, orgInitializeTree} from '../../../common/public/contents';
import {Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';

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
  public eqSpecialEs: any = Es; // 日期选择插件
  public eqSpecialFormModal = this.fbSrv.group(InitFormGroup(
    new AddEquipmentSpecialFieldClass(),
    ['operationTime', 'specialParameters', 'factoryNumber', 'licenseNo', 'registeredUnit', 'manufacturer', 'inspectionUnit', 'equipmentCode', 'reportNo', 'remarks']
  )); // 表单模型
  public eqSpecialDay: SpecialDay = new SpecialDayClass(); // 提前通知时间
  public eqSpecialDayModal: boolean = false; // 提前通知修改模态框
  public eqSpecialImportFieldModal: boolean = false; // 导入模态框
  public eqSpecialExcelTemplate: string = ''; // 导入模板地址
  public eqSpecialImportField: FormData = new FormData(); // 导入操作字段
  constructor(
    private equipmentSrv: EquipmentService,
    private globalSrv: GlobalService,
    private fbSrv: FormBuilder
  ) { }

  ngOnInit() {
    this.eqSpecialDataInit(this.eqSpecialNowPage, this.eqSpecialPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.eqSpecialOrgTree = orgInitializeTree(res.data);
      }
    );
    // 初始化提前通知时间
    this.equipmentSrv.equipmentSpecialRemindList().subscribe((res) => {
      this.eqSpecialDay = objectCopy(new SpecialDayClass(), res.data);
    });
    // 模板下载初始化
    this.globalSrv.publicGetExcelTemplate().subscribe((res) => {
      this.eqSpecialExcelTemplate = res.data[17].path;
    });
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
      // 模板文件下载
      case 'download':
        window.open(this.eqSpecialExcelTemplate);
        break;
      // 文件导出操作
      case 'export':
        this.equipmentSrv.equipmentSpecialExport().subscribe((res) => {
          window.open(res.token);
        });
        break;
      // 文件导入操作
      case 'import':
        this.eqSpecialImportField.append('multipartFile', item.files[0]);
        this.equipmentSrv.equipmentSpecialImport(this.eqSpecialImportField).subscribe((res) => {
          this.eqSpecialImportFieldModal = false;
          window.confirm('导入成功');
          this.eqSpecialDataInit(this.eqSpecialNowPage, this.eqSpecialPageOption.pageSize);
        });
        break;
      // 取消操作
      case 'cancel':
        this.eqSpecialOperateModal = false;
        this.eqSpecialFormModal.reset({}, {onlySelf: false, emitEvent: false});
        break;
      // 添加操作初始化
      case 'add':
        this.eqSpecialOperateModal = true;
        this.eqSpecialOperateField = Object.assign({}, new AddEquipmentSpecialFieldClass());
        this.eqSpecialOrgTreeSelectLabel = '点击选择单位';
        this.eqSpecialOrgTreeSelect = {};
        break;
      // 编辑操作初始化
      case 'update':
        this.eqSpecialOrgTreeSelectLabel = item.organizationName;
        this.eqSpecialOrgTreeSelect = {};
        this.eqSpecialOperateField = Object.assign({}, new UpdateEquipmentSpecialFieldClass(), item);
        const Obj = {};
        Object.keys(this.eqSpecialFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.eqSpecialFormModal.setValue(Obj);
        this.eqSpecialOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.eqSpecialOperateField.id) {
          if ('id' in this.eqSpecialOrgTreeSelect) {
            this.eqSpecialFormModal.patchValue({
              organizationId: this.eqSpecialOrgTreeSelect.id
            });
          }
          if (this.eqSpecialFormModal.valid) {
            this.eqSpecialHttpOperate(this.equipmentSrv.equipmentSpecialUpdate({...this.eqSpecialFormModal.value, id: this.eqSpecialOperateField.id}));
          } else {
            window.confirm('请把参数填写完整！');
          }
        }
        // 新增保存
        else {
          this.eqSpecialFormModal.patchValue({
            organizationId: this.eqSpecialOrgTreeSelect.id
          });
          if (this.eqSpecialFormModal.valid) {
            this.eqSpecialHttpOperate(this.equipmentSrv.equipmentSpecialAdd(this.eqSpecialFormModal.value));
          }else {
            window.confirm('请把参数填写完整！');
          }
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
          window.confirm('请您勾选需要删除的项！');
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
      // 提前通知时间修改
      case 'remind':
        this.equipmentSrv.equipmentSpecialRemindUpdate(this.eqSpecialDay).subscribe((res) => {
          this.eqSpecialDayModal = false;
        });
        break;
    }
  }

  // 分页操作
  public eqSpecialPageEvent(page) {
    this.eqSpecialNowPage = page;
    this.eqSpecialDataInit(page, this.eqSpecialPageOption.pageSize);
  }

}
