import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../../common/public/Api';
import {Observable} from 'rxjs';
import {EmergencyService} from '../../../../common/services/emergency.service';
import {AddEmergencyOrgAgencyFieldClass, AddEmergencyOrgPersonFieldClass, EmergencyOrgAgencyField, EmergencyOrgPersonField, UpdateEmergencyOrgAgencyFieldClass} from '../../emergencyApi';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.scss']
})
export class AgencyComponent implements OnInit {

  public eoAgencyPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public eoAgencyTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '组织名称'},
    {field: 'leadingCadre', header: '负责人'},
    {field: 'mobilePhone', header: '手机'},
    {field: 'idt', header: '添加时间'},
  ]; // 表头字段
  public eoAgencyTableData: any[]; // 表体数据
  public eoAgencyTableSelect: any = []; // 表格选择数据
  public eoAgencyNowPage: number = 1; // 当前页
  public eoAgencyOperateFlag: any ; // 操作标识
  public eoAgencyOperateField: EmergencyOrgAgencyField = new AddEmergencyOrgAgencyFieldClass(); // 操作字段
  public eoAgencyOperateModal: boolean = false; // 模态框
  public eoAgencyPersonal: EmergencyOrgPersonField[] = [];
  constructor(
    private emergencySrv: EmergencyService,
  ) { }

  ngOnInit() {
    this.eoAgencyDataInit(this.eoAgencyNowPage, this.eoAgencyPageOption.pageSize);
  }
  // 数据初始化
  private eoAgencyDataInit(currentPage, pageSize) {
    this.emergencySrv.emergencyOrgAgencyList({currentPage, pageSize}).subscribe((res) => {
      this.eoAgencyTableData = res.data.datas;
      this.eoAgencyPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private eoAgencyHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.eoAgencyOperateModal = false;
      this.eoAgencyDataInit(this.eoAgencyNowPage, this.eoAgencyPageOption.pageSize);
    });
  }

  // 基础操作
  public eoAgencyOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.eoAgencyPersonal = [];
        this.eoAgencyOperateModal = true;
        this.eoAgencyOperateField = Object.assign({}, new AddEmergencyOrgAgencyFieldClass());
        break;
      // 编辑操作初始化
      case 'update':
        this.eoAgencyOperateField = Object.assign({}, new UpdateEmergencyOrgAgencyFieldClass(), item);
        this.eoAgencyPersonal = [...this.eoAgencyOperateField.mineEmergencyOrganizationPersonnels];
        this.eoAgencyOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.eoAgencyOperateField.id) {
          this.eoAgencyOperateField.mineEmergencyOrganizationPersonnels = this.eoAgencyPersonal;
          this.eoAgencyHttpOperate(this.emergencySrv.emergencyOrgAgencyUpdate(this.eoAgencyOperateField));
        }
        // 新增保存
        else {
          this.eoAgencyOperateField.mineEmergencyOrganizationPersonnels = this.eoAgencyPersonal;
          this.eoAgencyHttpOperate(this.emergencySrv.emergencyOrgAgencyAdd(this.eoAgencyOperateField));
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.eoAgencyHttpOperate(this.emergencySrv.emergencyOrgAgencyDel({ids: [item.id]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.eoAgencyTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.eoAgencyTableSelect.length}项删除吗？`)) {
            this.eoAgencyHttpOperate(this.emergencySrv.emergencyOrgAgencyDel({ids: this.eoAgencyTableSelect.map((val) => val.id)}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
      // 人员添加
      case 'addPersonal':
        this.eoAgencyPersonal.push(new AddEmergencyOrgPersonFieldClass());
        break;
      // 人员删除
      case 'delPersonal':
        this.eoAgencyPersonal = this.eoAgencyPersonal.filter((res, index) => (index !== item));
        break;
    }
  }

  // 分页操作
  public eoAgencyPageEvent(page) {
    this.eoAgencyNowPage = page;
    this.eoAgencyDataInit(page, this.eoAgencyPageOption.pageSize);
  }

}