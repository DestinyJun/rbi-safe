import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {AddEquipmentOtherFieldClass, EquipmentOtherField, UpdateEquipmentOtherFieldClass} from '../equipmentApi';
import {EquipmentService} from '../../../common/services/equipment.service';
import {GlobalService} from '../../../common/services/global.service';
import {orgInitializeTree} from '../../../common/public/contents';
import {Observable} from 'rxjs';

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
  public eqOtherDropdownSelected: any; // 状态下拉选择
  public eqOtherDropdownPlaceholder: any = '请选择运行状况'; //  状态下拉label
  constructor(
    private equipmentSrv: EquipmentService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.eqOtherDataInit(this.eqOtherNowPage, this.eqOtherPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.eqOtherOrgTree = orgInitializeTree(res.data);
      }
    );
  }
  // 数据初始化
  private eqOtherDataInit(currentPage, pageSize) {
    this.equipmentSrv.equipmentOtherList({currentPage, pageSize}).subscribe((res) => {
      this.eqOtherTableData = res.data.datas;
      this.eqOtherPageOption.totalRecord = res.data.totalRecord;
      this.eqOtherOperateFlag = 'add';
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
      // 添加操作初始化
      case 'add':
        this.eqOtherOperateModal = true;
        this.eqOtherOperateField = Object.assign({}, new AddEquipmentOtherFieldClass());
        this.eqOtherOrgTreeSelectLabel = '点击选择单位';
        this.eqOtherDropdownPlaceholder = '请选择运行状况';
        this.eqOtherOrgTreeSelect = {};
        this.eqOtherDropdownSelected = null;
        break;
      // 编辑操作初始化
      case 'update':
        this.eqOtherOrgTreeSelectLabel = item.organizationName;
        this.eqOtherDropdownPlaceholder = item.operationStatus === 1 ? '正常' : '异常';
        this.eqOtherOrgTreeSelect = {};
        this.eqOtherDropdownSelected = null;
        this.eqOtherOperateField = Object.assign({}, new UpdateEquipmentOtherFieldClass(), item);
        this.eqOtherOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.eqOtherOperateField.id) {
          if ('id' in this.eqOtherOrgTreeSelect ) {
            this.eqOtherOperateField.organizationId = this.eqOtherOrgTreeSelect.id;
          }
          delete this.eqOtherOperateField['organizationName'];
          delete this.eqOtherOperateField['idt'];
          delete this.eqOtherOperateField['no'];
          this.eqOtherHttpOperate(this.equipmentSrv.equipmentOtherUpdate(this.eqOtherOperateField));
        }
        // 新增保存
        else {
          this.eqOtherOperateField.organizationId = this.eqOtherOrgTreeSelect.id;
          this.eqOtherHttpOperate(this.equipmentSrv.equipmentOtherAdd(this.eqOtherOperateField));
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
          window.alert('请您勾选需要删除的项！');
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
