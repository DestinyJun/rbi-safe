import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {Observable} from 'rxjs';
import {InstitutionService} from '../../../common/services/institution.service';
import {AddInstitutionManageFieldClass, InstitutionManageAssessField, InstitutionManageAssessFieldClass, InstitutionManageField, InstitutionManageUpdateField, UpdateInstitutionManageFieldClass} from '../institutionApi';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/loadstatus.state';
import {Hidden, Show} from '../../../store/loadstatus.actions';
import {FormBuilder} from '@angular/forms';
import {InitFormGroup} from '../../../common/public/contents';

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

  public institutionManageAssessDropdownOptions: any = [
    {label: '是',  value: '是'},
    {label: '否',  value: '否'}
  ]; // 是否状态下拉配置项
  public institutionManageAddFormModal = this.fbSrv.group(InitFormGroup(new AddInstitutionManageFieldClass())); // 新增表单模型
  public institutionManageUpdateFormModal = this.fbSrv.group(InitFormGroup({name: '', type: null, updateExplain: ''})); // 修改表单模型
  public institutionManageAssessFormModal = this.fbSrv.group(InitFormGroup(new InstitutionManageAssessFieldClass())); // 评估表单模型

  constructor(
    private institutionSrv: InstitutionService,
    private globalSrv: GlobalService,
    private store: Store<AppState>,
    private fbSrv: FormBuilder
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
      // 取消操作
      case 'cancel':
        this.institutionManageAddModal = false;
        this.institutionManageUpdateModal = false;
        this.institutionManageAddFormModal.reset({}, {onlySelf: true, emitEvent: false});
        this.institutionManageUpdateFormModal.reset({}, {onlySelf: true, emitEvent: false});
        break;
      // 添加操作初始化
      case 'add':
        this.institutionManageAddModal = true;
        this.institutionManageOperateField = Object.assign({}, new AddInstitutionManageFieldClass());
        item.clear();
        break;
      // 添加保存操作
      case 'save':
        this.store.dispatch(new Show());
        if (this.institutionManageAddFormModal.valid) {
          const field = new FormData();
          Object.keys(this.institutionManageAddFormModal.value).forEach(res => {
            field.append(res, this.institutionManageAddFormModal.value[res]);
          });
          if (item.length > 0) {
            item.forEach(res => {
              field.append('file', res);
            });
            this.institutionManageHttpOperate(this.institutionSrv.institutionManageAdd(field));
          }
          else {
            window.alert('必须上传文件！');
            this.store.dispatch(new Hidden());
          }
        } else {
          window.alert('请把参数填写完整!');
          this.store.dispatch(new Hidden());
        }
        break;
      // 编辑操作初始化
      case 'update':
        obj.clear();
        obj2.clear();
        const Obj = {};
        Object.keys(this.institutionManageUpdateFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        Object.keys(this.institutionManageUpdateField).forEach(res => {
          if (res === 'systemId') {
            this.institutionManageUpdateField[res] = item.id;
          } else {
            this.institutionManageUpdateField[res] = item[res];
          }
        });
        this.institutionManageUpdateFormModal.setValue(Obj);
        this.institutionManageUpdateModal = true;
        break;
      // 编辑保存操作
      case 'updateSave':
        this.store.dispatch(new Show());
        if (this.institutionManageUpdateFormModal.valid) {
          const updateField = new FormData();
          Object.keys(this.institutionManageUpdateFormModal.value).forEach(res => {
            updateField.append(res, this.institutionManageUpdateFormModal.value[res]);
          });
          Object.keys(this.institutionManageUpdateField).forEach(res => {
            if (res === 'systemId') {
              updateField.append('systemId', this.institutionManageUpdateField[res]);
            }
            if (res === 'organizationId') {
              updateField.append('organizationId', this.institutionManageUpdateField[res]);
            }
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
        } else {
          window.alert('请把参数填写完整!');
          this.store.dispatch(new Hidden());
        }
        break;
      // 评估操作初始化
      case 'assess':
        obj.clear();
        this.institutionManageAssessFormModal.patchValue({
          systemId: item.id,
          organizationId: item.organizationId,
          name: item.name,
          type: item.type,
        });
        this.institutionManageAssessModal = true;
        break;
      // 评估保存操作
      case 'assessSave':
        this.store.dispatch(new Show());
        if (this.institutionManageAssessFormModal.valid) {
          const assessField = new FormData();
          Object.keys(this.institutionManageAssessFormModal.value).forEach(res => {
            assessField.append(res, this.institutionManageAssessFormModal.value[res]);
          });
          if (item.length > 0) {
            item.forEach(res => {
              assessField.append('file', res);
            });
          }
          this.institutionManageHttpOperate(this.institutionSrv.institutionManageAssess(assessField));
        } else {
          window.alert('请把参数填写完整!');
          this.store.dispatch(new Hidden());
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.institutionManageHttpOperate(this.institutionSrv.institutionManageDel({data: [{id: item.id}]}));
        }
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
