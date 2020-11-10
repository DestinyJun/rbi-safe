import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {Observable} from 'rxjs';
import {InstitutionService} from '../../../common/services/institution.service';
import {AddInstitutionManageFieldClass, InstitutionManageAssessField, InstitutionManageAssessFieldClass, InstitutionManageField, InstitutionManageUpdateField, UpdateInstitutionManageFieldClass} from '../institutionApi';

@Component({
  selector: 'app-institution-manage',
  templateUrl: './institution-manage.component.html',
  styleUrls: ['./institution-manage.component.scss']
})
export class InstitutionManageComponent implements OnInit {

  public institutionManagePageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public institutionManageTableHeader: TableHeader[] = [
    {field: 'name', header: '制度名称'},
    {field: 'typeName', header: '制度类型'},
    {field: 'suit', header: '适宜性'},
    {field: 'effective', header: '有效性'},
    {field: 'execute', header: '执行性'},
    {field: 'idt', header: '上传时间'},
  ]; // 表头字段
  public institutionManageTableData: any[]; // 表体数据
  public institutionManageTableSelect: any = []; // 表格选择数据
  public institutionManageNowPage: number = 1; // 当前页
  public institutionManageOperateFlag: any ; // 操作标识
  public institutionManageOperateField: InstitutionManageField = new AddInstitutionManageFieldClass(); // 添加操作字段
  public institutionManageUpdateField: InstitutionManageUpdateField =  new UpdateInstitutionManageFieldClass(); // 修改操作字段
  public institutionManageAssessField: InstitutionManageAssessField =  new InstitutionManageAssessFieldClass(); // 评估操作字段
  public institutionManageAddModal: boolean = false; // 模态框
  public institutionManageUpdateModal: boolean = false; // 更新模态框
  public institutionManageAssessModal: boolean = false; // 评估模态框

  public institutionManageDropdownOptions: any = []; // 状态下拉配置项
  public institutionManageDropdownPlaceholder: any = '请选择类型'; //  状态下拉label

  public institutionManageAssessDropdownOptions: any = [
    {label: '是',  value: '是'},
    {label: '否',  value: '否'}
  ]; // 是否状态下拉配置项

  constructor(
    private institutionSrv: InstitutionService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.institutionManageDataInit(this.institutionManageNowPage, this.institutionManagePageOption.pageSize);
    // 初始化类型
    this.globalSrv.publicGetInstitutionType({}).subscribe(
      (res) => {
        this.institutionManageDropdownOptions = res.data.map((item) => ({label: item.categoryName, value: item.id}));
      }
    );
  }
  // 数据初始化
  private institutionManageDataInit(pageNo, pageSize) {
    this.institutionSrv.institutionManageList({pageNo, pageSize}).subscribe((res) => {
      this.institutionManageTableData = res.data.contents;
      this.institutionManagePageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private institutionManageHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.institutionManageAddModal = false;
      this.institutionManageUpdateModal = false;
      this.institutionManageAssessModal = false;
      this.institutionManageDataInit(this.institutionManageNowPage, this.institutionManagePageOption.pageSize);
    });
  }

  // 基础操作
  public institutionManageOperate(flag: string, item?: any, obj?: any, obj2?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.institutionManageAddModal = true;
        this.institutionManageOperateField = Object.assign({}, new AddInstitutionManageFieldClass());
        this.institutionManageDropdownPlaceholder = '请选择类型';
        item.clear();
        break;
      // 编辑操作初始化
      case 'update':
        obj.clear();
        obj2.clear();
        Object.keys(this.institutionManageUpdateField).forEach(res => {
          if (res === 'systemId') {
            this.institutionManageUpdateField[res] = item.id;
          } else {
            this.institutionManageUpdateField[res] = item[res];
          }
        });
        this.institutionManageUpdateModal = true;
        break;
      // 添加保存操作
      case 'save':
        const field = new FormData();
        Object.keys(this.institutionManageOperateField).forEach(res => {
          field.append(res, this.institutionManageOperateField[res]);
        });
        if (item.length > 0) {
          item.forEach(res => {
            field.append('file', res);
          });
        }
        this.institutionManageHttpOperate(this.institutionSrv.institutionManageAdd(field));
        break;
      // 修改保存操作
      case 'updateSave':
        const updateField = new FormData();
        Object.keys(this.institutionManageUpdateField).forEach(res => {
          updateField.append(res, this.institutionManageUpdateField[res]);
        });
        if (item.length > 0) {
          item.forEach(res => {
            updateField.append('sysFile', res);
          });
        }
        if (obj.length > 0) {
          obj.forEach(res => {
            updateField.append('updateFile', res);
          });
        }
        this.institutionManageHttpOperate(this.institutionSrv.institutionManageUpdate(updateField));
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.institutionManageHttpOperate(this.institutionSrv.institutionManageDel({data: [{id: item.id}]}));
        }
        break;
      // 评估操作初始化
      case 'assess':
        obj.clear();
        Object.keys(this.institutionManageAssessField).forEach(res => {
          if (res === 'systemId') {
            this.institutionManageAssessField[res] = item.id;
          } else {
            this.institutionManageAssessField[res] = item[res];
          }
        });
        this.institutionManageAssessModal = true;
        break;
      // 评估保存操作
      case 'assessSave':
        const assessField = new FormData();
        Object.keys(this.institutionManageAssessField).forEach(res => {
          assessField.append(res, this.institutionManageAssessField[res]);
        });
        if (item.length > 0) {
          item.forEach(res => {
            assessField.append('file', res);
          });
        }
        this.institutionManageHttpOperate(this.institutionSrv.institutionManageAssess(assessField));
        break;
      // 批量删除
      case 'multiple':
        if (this.institutionManageTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.institutionManageTableSelect.length}项删除吗？`)) {
            this.institutionManageHttpOperate(this.institutionSrv.institutionManageDel({data: this.institutionManageTableSelect.map((val) => ({id: val.id}))}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
      // 文件下载
      case 'open':
        window.open(item);
        break;
    }
  }

  // 分页操作
  public institutionManagePageEvent(page) {
    this.institutionManageNowPage = page;
    this.institutionManageDataInit(page, this.institutionManagePageOption.pageSize);
  }

}
