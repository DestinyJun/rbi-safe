import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../../common/public/Api';
import {EmergencyService} from '../../../../common/services/emergency.service';
import {Observable} from 'rxjs';
import {AddEmergencyOrgExternalFieldClass, EmergencyOrgExternalField, UpdateEmergencyOrgExternalFieldClass} from '../../emergencyApi';
import {InitFormGroup} from '../../../../common/public/contents';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
  styleUrls: ['./external.component.scss']
})
export class ExternalComponent implements OnInit {

  public eoExternalPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public eoExternalTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '外部应急组织名称'},
    {field: 'ontactNumber', header: '联系电话'},
    {field: 'remarks', header: '备注'},
    {field: 'idt', header: '添加时间'},
  ]; // 表头字段
  public eoExternalTableData: any[]; // 表体数据
  public eoExternalTableSelect: any = []; // 表格选择数据
  public eoExternalNowPage: number = 1; // 当前页
  public eoExternalOperateFlag: any ; // 操作标识
  public eoExternalOperateField: EmergencyOrgExternalField = new AddEmergencyOrgExternalFieldClass(); // 操作字段
  public eoExternalOperateModal: boolean = false; // 模态框
  public eoExternalFormModal = this.fbSrv.group(InitFormGroup(new AddEmergencyOrgExternalFieldClass())); // 表单模型
  constructor(
    private emergencySrv: EmergencyService,
    private fbSrv: FormBuilder
  ) { }

  ngOnInit() {
    this.eoExternalDataInit(this.eoExternalNowPage, this.eoExternalPageOption.pageSize);
  }
  // 数据初始化
  private eoExternalDataInit(currentPage, pageSize) {
    this.emergencySrv.emergencyOrgExternalList({currentPage, pageSize}).subscribe((res) => {
      this.eoExternalTableData = res.data.datas;
      this.eoExternalPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private eoExternalHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.eoExternalOperateModal = false;
      this.eoExternalDataInit(this.eoExternalNowPage, this.eoExternalPageOption.pageSize);
    });
  }

  // 基础操作
  public eoExternalOperate(flag: string, item?: any) {
    switch (flag) {
      case 'cancel':
        this.eoExternalOperateModal = false;
        this.eoExternalFormModal.reset({}, {onlySelf: false, emitEvent: false});
        break;
      // 添加操作初始化
      case 'add':
        this.eoExternalOperateModal = true;
        this.eoExternalOperateField = Object.assign({}, new AddEmergencyOrgExternalFieldClass());
        break;
      // 编辑操作初始化
      case 'update':
        this.eoExternalOperateField = Object.assign({}, new UpdateEmergencyOrgExternalFieldClass(), item);
        this.eoExternalOperateModal = true;
        const Obj = {};
        Object.keys(this.eoExternalFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.eoExternalFormModal.setValue(Obj);
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.eoExternalOperateField.id) {
          if (this.eoExternalFormModal.valid) {
            this.eoExternalHttpOperate(this.emergencySrv.emergencyOrgExternalUpdate({...this.eoExternalFormModal.value, id: this.eoExternalOperateField.id}));
          } else {
            window.confirm('请把参数填写完整！');
          }
        }
        // 新增保存
        else {
          if (this.eoExternalFormModal.valid) {
            this.eoExternalHttpOperate(this.emergencySrv.emergencyOrgExternalAdd(this.eoExternalFormModal.value));
          }else {
            window.confirm('请把参数填写完整！');
          }
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.eoExternalHttpOperate(this.emergencySrv.emergencyOrgExternalDel({ids: [item.id]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.eoExternalTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.eoExternalTableSelect.length}项删除吗？`)) {
            this.eoExternalHttpOperate(this.emergencySrv.emergencyOrgExternalDel({ids: this.eoExternalTableSelect.map((val) => val.id)}));
          }
        } else {
          window.confirm('请您勾选需要删除的项！');
        }
        break;
    }
  }

  // 分页操作
  public eoExternalPageEvent(page) {
    this.eoExternalNowPage = page;
    this.eoExternalDataInit(page, this.eoExternalPageOption.pageSize);
  }

}
