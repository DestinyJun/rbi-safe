import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {Es, orgInitializeTree} from '../../../common/public/contents';
import {Observable} from 'rxjs';
import {AccidentRecordField, AddAccidentRecordFieldClass, UpdateAccidentRecordFieldClass} from '../accidentApi';
import {AccidentService} from '../../../common/services/accident.service';

@Component({
  selector: 'app-accident-record',
  templateUrl: './accident-record.component.html',
  styleUrls: ['./accident-record.component.scss']
})
export class AccidentRecordComponent implements OnInit {

  public acRecordPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public acRecordTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '组织单位'},
    {field: 'accidentPlace', header: '事故地点'},
    {field: 'accidentAccount', header: '事故数量'},
    {field: 'accidentName', header: '事故类型'},
    {field: 'reasonAnalysis', header: '原因分析'},
    {field: 'detail', header: '详细描述'},
    {field: 'idt', header: '添加时间'},
  ]; // 表头字段
  public acRecordTableData: any[]; // 表体数据
  public acRecordTableSelect: any = []; // 表格选择数据
  public acRecordNowPage: number = 1; // 当前页
  public acRecordOperateFlag: any ; // 操作标识
  public acRecordOperateField: AccidentRecordField = new AddAccidentRecordFieldClass(); // 操作字段
  public acRecordOperateModal: boolean = false; // 模态框
  public acRecordOrgTreeModal: boolean = false; // 组织树模态框
  public acRecordOrgTree: OrgTree[] = []; // 组织树配置项
  public acRecordOrgTreeSelect: OrgTree = {}; // 组织树选择
  public acRecordOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  public acRecordDropdownOptions: any = []; // 状态下拉配置项
  public acRecordDropdownSelected: any; // 状态下拉选择
  public acRecordDropdownPlaceholder: any = '请选择事故类型'; //  状态下拉label
  public acRecordEs: any = Es; // 日期选择插件
  constructor(
    private accidentSrv: AccidentService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.acRecordDataInit(this.acRecordNowPage, this.acRecordPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.acRecordOrgTree = orgInitializeTree(res.data);
      }
    );

    // 初始化组织树
    this.globalSrv.publicGetAccidentTypeList({}).subscribe(
      (res) => {
        this.acRecordDropdownOptions = res.data;
      }
    );
  }
  // 数据初始化
  private acRecordDataInit(pageNo, pageSize) {
    this.accidentSrv.accidentRecordList({pageNo, pageSize}).subscribe((res) => {
      this.acRecordTableData = res.data.contents;
      this.acRecordPageOption.totalRecord = res.data.totalRecord;
      console.log(this.acRecordTableData);
    });
  }

  // 代理请求函数
  private acRecordHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.acRecordOperateModal = false;
      this.acRecordDataInit(this.acRecordNowPage, this.acRecordPageOption.pageSize);
    });
  }

  // 基础操作
  public acRecordOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.acRecordOperateModal = true;
        this.acRecordOrgTreeSelect = {};
        this.acRecordDropdownSelected = null;
        this.acRecordOperateField = Object.assign({}, new AddAccidentRecordFieldClass());
        this.acRecordOrgTreeSelectLabel = '点击选择单位';
        this.acRecordDropdownPlaceholder = '请选择运行状况';
        break;
      // 编辑操作初始化
      case 'update':
        this.acRecordOrgTreeSelect = {};
        this.acRecordDropdownSelected = null;
        this.acRecordOrgTreeSelectLabel = item.organizationName;
        if (item.accidentName) {
          this.acRecordDropdownPlaceholder = item.accidentName;
        } else {
          this.acRecordDropdownPlaceholder = '请选择运行状况';
        }
        this.acRecordOperateField = Object.assign({}, new UpdateAccidentRecordFieldClass(), item);
        this.acRecordOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.acRecordOperateField.id) {
          if ('id' in this.acRecordOrgTreeSelect ) {
            this.acRecordOperateField.organizationId = this.acRecordOrgTreeSelect.id;
          }
          if ( this.acRecordDropdownSelected ) {
            this.acRecordOperateField.accidentTypeId = this.acRecordDropdownSelected.id;
          }
          delete this.acRecordOperateField['organizationName'];
          delete this.acRecordOperateField['operatingStaff'];
          delete this.acRecordOperateField['accidentName'];
          delete this.acRecordOperateField['idt'];
          delete this.acRecordOperateField['udt'];
          this.acRecordHttpOperate(this.accidentSrv.accidentRecordUpdate(this.acRecordOperateField));
        }
        // 新增保存
        else {
          this.acRecordOperateField.organizationId = this.acRecordOrgTreeSelect.id;
          this.acRecordOperateField.accidentTypeId = this.acRecordDropdownSelected.id;
          this.acRecordHttpOperate(this.accidentSrv.accidentRecordAdd(this.acRecordOperateField));
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.acRecordHttpOperate(this.accidentSrv.accidentRecordDel({ids: item.id}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.acRecordTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.acRecordTableSelect.length}项删除吗？`)) {
            this.acRecordHttpOperate(this.accidentSrv.accidentRecordDel({ids: this.acRecordTableSelect.map((val) => val.id).join(',')}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
      // 树操作
      case 'tree':
        this.acRecordOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.acRecordOrgTreeModal = false;
        break;
    }
  }

  // 分页操作
  public acRecordPageEvent(page) {
    this.acRecordNowPage = page;
    this.acRecordDataInit(page, this.acRecordPageOption.pageSize);
  }

}
