import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrgTree, PageOption, TableHeader, TrainingField, TrainingFieldUpdateClass} from '../../../../../common/public/Api';
import {Es, objectCopy, orgInitializeTree} from '../../../../../common/public/contents';
import {GlobalService} from '../../../../../common/services/global.service';
import {SafetrainService} from '../../../../../common/services/safetrain.service';
import {ActivatedRoute } from '@angular/router';
import {LocalStorageService} from '../../../../../common/services/local-storage.service';

@Component({
  selector: 'app-pl-input',
  templateUrl: './pl-input.component.html',
  styleUrls: ['./pl-input.component.scss']
})
export class PlInputComponent implements OnInit {
  @Output() nextChange: EventEmitter<any> = new EventEmitter<any>();
  public plInputDropdownOptions: any; // 下拉配置项
  public plInputDropdownSelected: any; // 下拉选择
  public plInputOrgTree: OrgTree[] = []; // 树配置项
  public plInputOrgTreeSelect: OrgTree = {}; // 树选择
  public plInputOperateUpdateField: TrainingField = new TrainingFieldUpdateClass(); // 操作字段
  public plInputOperateModal: boolean = false; // 模态框
  public plInputOrgTreeModal: boolean = false; // 组织树模态框
  public plInputOperateFlag: any ; // 操作标识
  public plInputEs: any = Es; // 时间选择器语言本地化
  public workType: string = null; // 时间选择器语言本地化
  public plInputPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public plInputTableHeader: TableHeader[] = [
    {field: 'name', header: '姓名'},
    {field: 'employeeNumber', header: '员工号'},
    {field: 'idCardNo', header: '身份证'},
    {field: 'factoryName', header: '厂矿'},
    {field: 'workshopName', header: '车间'},
    {field: 'teamName', header: '班组'},
    {field: 'workType', header: '工种'},
  ]; // 表头字段
  public plInputTableData: any[]; // 表体数据
  public plInputTableSelect: any[]; // 表体数据选择
  public plInputTableSelectName: any = '请选择受训单位人员'; // 受训人员label
  public plInputDropdownPlaceholder: string = '请选择培训类别'; // 培训类别label
  public plInputOrgTreeSelectLabel: string = '点击选择单位'; // 组织单位label
  public plInputNowPage: number = 1; // 当前页
  constructor(
    private globalSrv: GlobalService,
    private safeSrv: SafetrainService,
    private routeInfo: ActivatedRoute,
    private localSrv: LocalStorageService
  ) { }
  ngOnInit() {
    this.plInputDataInit();
  }
  // 数据初始化
  private plInputDataInit() {
    // 初始化培训类型
    this.globalSrv.publicGetSafeTrainingType().subscribe((res) => {
      this.plInputDropdownOptions = res.data;
    });
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.plInputOrgTree = orgInitializeTree(res.data);
      }
    );
    // 初始化公司人员
    this.plInputCompanyDataInit(this.plInputNowPage, this.plInputPageOption.pageSize);
    // 初始化表单数据
    this.routeInfo.queryParams.subscribe(
      (params) => {
        if (params.id) {
          this.safeSrv.getReportsInfo({id: params.id}).subscribe((res) => {
            this.plInputOperateUpdateField = objectCopy(Object.assign({}, new TrainingFieldUpdateClass()), res.data);
            this.plInputDropdownPlaceholder = res.data.trainingTypeName;
            this.plInputOrgTreeSelectLabel = res.data.organizationName;
            this.plInputTableSelectName = res.data.targetNameSet.join('\n');
          });
        }
      }
    );
  }

  //  公司人员分页
  private plInputCompanyDataInit(pageNo, pageSize, organizationIds = '', workType ?: string) {
    const organizationId = organizationIds ? organizationIds : null;
    workType = (this.workType && this.workType.trim() !== '') ? this.workType.trim() : null;
    let body;
    if (workType) {
      body = {pageNo, pageSize, organizationId, workType};
    } else {
      body = {pageNo, pageSize, organizationId};
    }
    this.globalSrv.publicGetCompanyPerson(body).subscribe((res) => {
      this.plInputTableData = res.data.contents;
      this.plInputPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 操作
  public plInputOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        if (this.plInputDropdownSelected && this.plInputOrgTreeSelect && this.plInputTableSelect) {
          this.plInputOperateUpdateField.trainingTypeId = this.plInputDropdownSelected.id;
          this.plInputOperateUpdateField.organizationTrainingDepartmentId = this.plInputOrgTreeSelect.id;
          this.plInputOperateUpdateField.targetSet = this.plInputTableSelect.map((res) => res.id).join(',');
        }
        this.nextChange.emit({activeIndex: 1});
        this.plInputOperateUpdateField.processingStatus = '2';
        this.localSrv.setObject('safeTrainingNeeds', this.plInputOperateUpdateField);
        break;
      case 'tree':
        this.plInputOperateModal = true;
        break;
      case 'strain':
        this.plInputOperateModal = true;
        break;
      case 'select':
        this.plInputOperateModal = false;
        if (this.plInputTableSelect) {
          this.plInputTableSelectName = this.plInputTableSelect.map((res) => res.name).join(',');
        }
        break;
      // 筛选搜索
      case 'search':
        this.workType = this.workType.trim() === '' ? null : this.workType.trim();
        this.plInputOrgTreeModal = false;
        this.plInputCompanyDataInit(this.plInputNowPage = 1, this.plInputPageOption.pageSize, this.plInputOrgTreeSelect.id);
        break;
    }
  }

  // 分页操作
  public plInputPageEvent(page) {
    this.plInputNowPage = page;
    if (this.plInputOrgTreeSelect.id) {
      this.plInputCompanyDataInit(this.plInputNowPage, this.plInputPageOption.pageSize, this.plInputOrgTreeSelect.id);
      return;
    }
    this.plInputCompanyDataInit(page, this.plInputPageOption.pageSize);
  }
}
