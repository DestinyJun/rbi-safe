import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {Observable} from 'rxjs';
import {AddEquipmentSafeFieldClass, EquipmentSafeField, UpdateEquipmentSafeFieldClass} from '../equipmentApi';
import {EquipmentService} from '../../../common/services/equipment.service';
import {InitFormGroup, orgInitializeTree} from '../../../common/public/contents';
import {GlobalService} from '../../../common/services/global.service';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-equipment-safe',
  templateUrl: './equipment-safe.component.html',
  styleUrls: ['./equipment-safe.component.scss']
})
export class EquipmentSafeComponent implements OnInit {

  public eqSafePageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public eqSafeTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '使用单位'},
    {field: 'type', header: '类型'},
    {field: 'majorEquipment', header: '主要设备设施'},
    {field: 'modelAndSpecification', header: '型号及规则'},
    {field: 'unit', header: '单位'},
    {field: 'number', header: '数量'},
    {field: 'position', header: '安装位置'},
    {field: 'operationStatus', header: '运行情况'},
    {field: 'modelAndSpecification', header: '备注'},
    {field: 'idt', header: '添加时间'},
  ]; // 表头字段
  public eqSafeTableData: any[]; // 表体数据
  public eqSafeTableSelect: any = []; // 表格选择数据
  public eqSafeNowPage: number = 1; // 当前页
  public eqSafeOperateFlag: any ; // 操作标识
  public eqSafeOperateField: EquipmentSafeField = new AddEquipmentSafeFieldClass(); // 操作字段
  public eqSafeOperateModal: boolean = false; // 模态框
  public eqSafeOrgTreeModal: boolean = false; // 组织树模态框
  public eqSafeOrgTree: OrgTree[] = []; // 组织树配置项
  public eqSafeOrgTreeSelect: OrgTree = {}; // 组织树选择
  public eqSafeOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  public eqSafeDropdownOptions: any = [
    {value: 1, label: '正常'},
    {value: 2, label: '异常'},
  ]; // 状态下拉配置项
  public eqSafeFormModal = this.fbSrv.group(InitFormGroup(new AddEquipmentSafeFieldClass(), ['remarks'])); // 表单模型
  public eqSafeImportFieldModal: boolean = false; // 导入模态框
  public eqSafeExcelTemplate: string = ''; // 导入模板地址
  public eqSafeImportField: FormData = new FormData(); // 导入操作字段
  constructor(
    private equipmentSrv: EquipmentService,
    private globalSrv: GlobalService,
    private fbSrv: FormBuilder
  ) { }

  ngOnInit() {
    this.eqSafeDataInit(this.eqSafeNowPage, this.eqSafePageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.eqSafeOrgTree = orgInitializeTree(res.data);
      }
    );
    // 模板下载初始化
    this.globalSrv.publicGetExcelTemplate().subscribe((res) => {
      this.eqSafeExcelTemplate = res.data[18].path;
    });
  }
  // 数据初始化
  private eqSafeDataInit(currentPage, pageSize) {
    this.equipmentSrv.equipmentSafeList({currentPage, pageSize}).subscribe((res) => {
      this.eqSafeTableData = res.data.datas;
      this.eqSafePageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private eqSafeHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.eqSafeOperateModal = false;
      this.eqSafeDataInit(this.eqSafeNowPage, this.eqSafePageOption.pageSize);
    });
  }

  // 基础操作
  public eqSafeOperate(flag: string, item?: any) {
    switch (flag) {
      // 模板文件下载
      case 'download':
        window.open(this.eqSafeExcelTemplate);
        break;
      // 文件导出操作
      case 'export':
        this.equipmentSrv.equipmentSafeExport().subscribe((res) => {
          window.open(res.token);
        });
        break;
      // 文件导入操作
      case 'import':
        this.eqSafeImportField.append('multipartFile', item.files[0]);
        this.equipmentSrv.equipmentSafeImport(this.eqSafeImportField).subscribe((res) => {
          this.eqSafeImportFieldModal = false;
          window.confirm('导入成功');
          this.eqSafeDataInit(this.eqSafeNowPage, this.eqSafePageOption.pageSize);
        });
        break;
      // 取消操作
      case 'cancel':
        this.eqSafeOperateModal = false;
        this.eqSafeFormModal.reset({}, {onlySelf: false, emitEvent: false});
        break;
      // 添加操作初始化
      case 'add':
        this.eqSafeOperateModal = true;
        this.eqSafeOperateField = Object.assign({}, new AddEquipmentSafeFieldClass());
        this.eqSafeOrgTreeSelectLabel = '点击选择单位';
        this.eqSafeOrgTreeSelect = {};
        break;
      // 编辑操作初始化
      case 'update':
        this.eqSafeOrgTreeSelectLabel = item.organizationName;
        this.eqSafeOrgTreeSelect = {};
        this.eqSafeOperateField = Object.assign({}, new UpdateEquipmentSafeFieldClass(), item);
        const Obj = {};
        Object.keys(this.eqSafeFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.eqSafeFormModal.setValue(Obj);
        this.eqSafeOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.eqSafeOperateField.id) {
          if ('id' in this.eqSafeOrgTreeSelect) {
            this.eqSafeFormModal.patchValue({
              organizationId: this.eqSafeOrgTreeSelect.id
            });
          }
          if (this.eqSafeFormModal.valid) {
            this.eqSafeHttpOperate(this.equipmentSrv.equipmentSafeUpdate({...this.eqSafeFormModal.value, id: this.eqSafeOperateField.id}));
          } else {
            window.confirm('请把参数填写完整！');
          }
        }
        // 新增保存
        else {
          this.eqSafeFormModal.patchValue({
            organizationId: this.eqSafeOrgTreeSelect.id
          });
          if (this.eqSafeFormModal.valid) {
            this.eqSafeHttpOperate(this.equipmentSrv.equipmentSafeAdd(this.eqSafeFormModal.value));
          }else {
            window.confirm('请把参数填写完整！');
          }
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.eqSafeHttpOperate(this.equipmentSrv.equipmentSafeDel({ids: [item.id]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.eqSafeTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.eqSafeTableSelect.length}项删除吗？`)) {
            this.eqSafeHttpOperate(this.equipmentSrv.equipmentSafeDel({ids: this.eqSafeTableSelect.map((val) => val.id)}));
          }
        } else {
          window.confirm('请您勾选需要删除的项！');
        }
        break;
      // 树操作
      case 'tree':
        this.eqSafeOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.eqSafeOrgTreeModal = false;
        break;
    }
  }

  // 分页操作
  public eqSafePageEvent(page) {
    this.eqSafeNowPage = page;
    this.eqSafeDataInit(page, this.eqSafePageOption.pageSize);
  }
}
