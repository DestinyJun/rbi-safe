import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {AddEquipmentOtherFieldClass, EquipmentOtherField, UpdateEquipmentOtherFieldClass} from '../equipmentApi';
import {EquipmentService} from '../../../common/services/equipment.service';
import {GlobalService} from '../../../common/services/global.service';
import {InitFormGroup, orgInitializeTree} from '../../../common/public/contents';
import {Observable} from 'rxjs';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-equipment-other',
  templateUrl: './equipment-other.component.html',
  styleUrls: ['./equipment-other.component.scss']
})
export class EquipmentOtherComponent implements OnInit {

  public eqOtherPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public eqOtherTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '组织单位'},
    {field: 'numberOfSets', header: '台数'},
    {field: 'intactNumber', header: '完好台数'},
    {field: 'idt', header: '添加时间'},
  ]; // 表头字段
  public eqOtherTableData: any[]; // 表体数据
  public eqOtherTableSelect: any = []; // 表格选择数据
  public eqOtherNowPage: number = 1; // 当前页
  public eqOtherOperateFlag: any ; // 操作标识
  public eqOtherOperateField: EquipmentOtherField = new AddEquipmentOtherFieldClass(); // 操作字段
  public eqOtherOperateModal: boolean = false; // 模态框
  public eqOtherOrgTreeModal: boolean = false; // 组织树模态框
  public eqOtherOrgTree: OrgTree[] = []; // 组织树配置项
  public eqOtherOrgTreeSelect: OrgTree = {}; // 组织树选择
  public eqOtherOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  public eqOtherFormModal = this.fbSrv.group(InitFormGroup(new AddEquipmentOtherFieldClass(), ['remarks'])); // 表单模型
  public eqOtherImportFieldModal: boolean = false; // 导入模态框
  public eqOtherExcelTemplate: string = ''; // 导入模板地址
  public eqOtherImportField: FormData = new FormData(); // 导入操作字段
  constructor(
    private equipmentSrv: EquipmentService,
    private globalSrv: GlobalService,
    private fbSrv: FormBuilder
  ) { }

  ngOnInit() {
    this.eqOtherDataInit(this.eqOtherNowPage, this.eqOtherPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.eqOtherOrgTree = orgInitializeTree(res.data);
      }
    );
    // 模板下载初始化
    this.globalSrv.publicGetExcelTemplate().subscribe((res) => {
      this.eqOtherExcelTemplate = res.data[19].path;
    });
  }
  // 数据初始化
  private eqOtherDataInit(currentPage, pageSize) {
    this.equipmentSrv.equipmentOtherList({currentPage, pageSize}).subscribe((res) => {
      this.eqOtherTableData = res.data.datas;
      this.eqOtherPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private eqOtherHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.eqOtherOperateModal = false;
      this.eqOtherDataInit(this.eqOtherNowPage, this.eqOtherPageOption.pageSize);
    });
  }

  // 基础操作
  public eqOtherOperate(flag: string, item?: any) {
    switch (flag) {
      // 模板文件下载
      case 'download':
        window.open(this.eqOtherExcelTemplate);
        break;
      // 文件导出操作
      case 'export':
        this.equipmentSrv.equipmentOtherExport().subscribe((res) => {
          window.open(res.token);
        });
        break;
      // 文件导入操作
      case 'import':
        this.eqOtherImportField.append('multipartFile', item.files[0]);
        this.equipmentSrv.equipmentOtherImport(this.eqOtherImportField).subscribe((res) => {
          this.eqOtherImportFieldModal = false;
          window.confirm('导入成功');
          this.eqOtherDataInit(this.eqOtherNowPage, this.eqOtherPageOption.pageSize);
        });
        break;
      // 取消操作
      case 'cancel':
        this.eqOtherOperateModal = false;
        this.eqOtherFormModal.reset({}, {onlySelf: false, emitEvent: false});
        break;
      // 添加操作初始化
      case 'add':
        this.eqOtherOperateModal = true;
        this.eqOtherOperateField = Object.assign({}, new AddEquipmentOtherFieldClass());
        this.eqOtherOrgTreeSelectLabel = '点击选择单位';
        this.eqOtherOrgTreeSelect = {};
        break;
      // 编辑操作初始化
      case 'update':
        this.eqOtherOrgTreeSelectLabel = item.organizationName;
        this.eqOtherOrgTreeSelect = {};
        this.eqOtherOperateField = Object.assign({}, new UpdateEquipmentOtherFieldClass(), item);
        const Obj = {};
        Object.keys(this.eqOtherFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.eqOtherFormModal.setValue(Obj);
        this.eqOtherOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.eqOtherOperateField.id) {
          if ('id' in this.eqOtherOrgTreeSelect) {
            this.eqOtherFormModal.patchValue({
              organizationId: this.eqOtherOrgTreeSelect.id
            });
          }
          if (this.eqOtherFormModal.valid) {
            this.eqOtherHttpOperate(this.equipmentSrv.equipmentOtherUpdate({...this.eqOtherFormModal.value, id: this.eqOtherOperateField.id}));
          } else {
            window.confirm('请把参数填写完整！');
          }
        }
        // 新增保存
        else {
          this.eqOtherFormModal.patchValue({
            organizationId: this.eqOtherOrgTreeSelect.id
          });
          if (this.eqOtherFormModal.valid) {
            this.eqOtherHttpOperate(this.equipmentSrv.equipmentOtherAdd(this.eqOtherFormModal.value));
          }else {
            window.confirm('请把参数填写完整！');
          }
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.eqOtherHttpOperate(this.equipmentSrv.equipmentOtherDel({ids: [item.id]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.eqOtherTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.eqOtherTableSelect.length}项删除吗？`)) {
            this.eqOtherHttpOperate(this.equipmentSrv.equipmentOtherDel({ids: this.eqOtherTableSelect.map((val) => val.id)}));
          }
        } else {
          window.confirm('请您勾选需要删除的项！');
        }
        break;
      // 树操作
      case 'tree':
        this.eqOtherOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.eqOtherOrgTreeModal = false;
        break;
    }
  }

  // 分页操作
  public eqOtherPageEvent(page) {
    this.eqOtherNowPage = page;
    this.eqOtherDataInit(page, this.eqOtherPageOption.pageSize);
  }

}
