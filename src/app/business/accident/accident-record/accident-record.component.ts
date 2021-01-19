import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {Es, InitFormGroup, orgInitializeTree, SAFE_TREE} from '../../../common/public/contents';
import {Observable} from 'rxjs';
import {AccidentRecordField, AddAccidentRecordFieldClass, UpdateAccidentRecordFieldClass} from '../accidentApi';
import {AccidentService} from '../../../common/services/accident.service';
import {FormBuilder} from '@angular/forms';

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
    {field: 'organizationName', header: '上报单位'},
    {field: 'accidentPlace', header: '事故地点'},
    {field: 'accidentName', header: '事故类型'},
    {field: 'accidentTime', header: '事故时间'},
    {field: 'accidentAccount', header: '涉及人员数量'},
    {field: 'changeStatus', header: '整改落实情况'},
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
  public acRecordEs: any = Es; // 日期选择插件
  public acRecordFormModal = this.fbSrv.group(InitFormGroup(new AddAccidentRecordFieldClass())); // 表单模型
  public acRecordSafeTree: OrgTree[] = SAFE_TREE; // 安全原因分析树
  public acRecordSafeTreeModel: boolean = false; // 安全原因树模态
  public acRecordSafeTreeSelect: OrgTree[] = []; // 安全原因树选择
  constructor(
    private accidentSrv: AccidentService,
    private globalSrv: GlobalService,
    private fbSrv: FormBuilder
  ) { }

  ngOnInit() {
    this.acRecordDataInit(this.acRecordNowPage, this.acRecordPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.acRecordOrgTree = orgInitializeTree(res.data);
      }
    );

    // 初始化下拉菜单
    this.globalSrv.publicGetAccidentTypeList({}).subscribe(
      (res) => {
        this.acRecordDropdownOptions = res.data.map((item) => ({label: item.typeName, value: item.id}));
      }
    );
  }
  // 数据初始化
  private acRecordDataInit(pageNo, pageSize) {
    this.accidentSrv.accidentRecordList({pageNo, pageSize}).subscribe((res) => {
      this.acRecordTableData = res.data.contents;
      this.acRecordPageOption.totalRecord = res.data.totalRecord;
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
      case 'cancel':
        this.acRecordOperateModal = false;
        this.acRecordFormModal.reset({}, {onlySelf: false, emitEvent: false});
        break;
      // 添加操作初始化
      case 'add':
        this.acRecordOperateModal = true;
        this.acRecordOperateField = Object.assign({}, new AddAccidentRecordFieldClass());
        this.acRecordOrgTreeSelect = {id: this.acRecordOrgTree[0].id, label: this.acRecordOrgTree[0].label};
        break;
      // 编辑操作初始化
      case 'update':
        this.acRecordOrgTreeSelect = {};
        this.acRecordOrgTreeSelectLabel = item.organizationName;
        this.acRecordOperateField = Object.assign({}, new UpdateAccidentRecordFieldClass(), item);
        const Obj = {};
        Object.keys(this.acRecordFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.acRecordFormModal.setValue(Obj);
        this.acRecordOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.acRecordOperateField.id) {
          if ('id' in this.acRecordOrgTreeSelect ) {
            this.acRecordFormModal.patchValue({
              organizationId: this.acRecordOrgTreeSelect.id
            });
          }
          if (this.acRecordFormModal.valid) {
            this.acRecordHttpOperate(this.accidentSrv.accidentRecordUpdate({...this.acRecordFormModal.value, id: this.acRecordOperateField.id}));
          } else {
            window.confirm('请把参数填写完整！');
          }
        }
        // 新增保存
        else {
          this.acRecordFormModal.patchValue({
            organizationId: this.acRecordOrgTreeSelect.id
          });
          if (this.acRecordFormModal.valid) {
            this.acRecordHttpOperate(this.accidentSrv.accidentRecordAdd(this.acRecordFormModal.value));
          }else {
            window.confirm('请把参数填写完整！');
          }
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
          window.confirm('请您勾选需要删除的项！');
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
      // 安全树操作
      case 'safeTree':
        this.acRecordSafeTreeModel = true;
        break;
      // 安全树选择确定
      case 'safeTreeSelect':
        this.acRecordSafeTreeModel = false;
        let str = '';
        this.acRecordSafeTreeSelect.forEach((val) => {
          str += val.label + '，';
        });
        str = str.substr(0, str.length - 1);
        str = str + '。';
        this.acRecordFormModal.patchValue({
          reasonAnalysis: str
        });
        break;
      // 导出
      case 'export':
        this.accidentSrv.accidentRecordExport().subscribe((res) => {
          console.log(res);
          window.open(res.data.path);
        });
        break;
    }
  }

  // 分页操作
  public acRecordPageEvent(page) {
    this.acRecordNowPage = page;
    this.acRecordDataInit(page, this.acRecordPageOption.pageSize);
  }

}
