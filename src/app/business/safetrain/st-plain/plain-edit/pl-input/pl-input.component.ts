import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  OrgTree,
  PageOption,
  TableHeader,
  TrainingField,
  TrainingFieldUpdateClass
} from '../../../../../common/public/Api';
import {Es, objectCopy, orgInitializeTree} from '../../../../../common/public/contents';
import {GlobalService} from '../../../../../common/services/global.service';
import {SafetrainService} from '../../../../../common/services/safetrain.service';
import {ActivatedRoute} from '@angular/router';
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
  public selectAllBox: string[] = []; // 全选元素
  public plInputOperateUpdateField: TrainingField = new TrainingFieldUpdateClass(); // 操作字段
  public plInputOperateModal: boolean = false; // 模态框
  public plInputOrgTreeModal: boolean = false; // 组织树模态框
  public plInputOperateFlag: any; // 操作标识
  public plInputEs: any = Es; // 时间选择器语言本地化
  public workType: string = null; // 时间选择器语言本地化
  // selectedCategories: string = 'Technolog';
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
  public plInputTableSelect = []; // 表体数据选择
  public plInputTableCurPageSelect: any[]; // 当前页表体数据选择
  public plInputTableSelectName: any = '请选择受训单位人员'; // 受训人员label
  public plInputDropdownPlaceholder: string = '请选择培训类别'; // 培训类别label
  public plInputOrgTreeSelectLabel: string = '点击选择单位'; // 组织单位label
  public plInputNowPage: number = 1; // 当前页
  constructor(
    private globalSrv: GlobalService,
    private safeSrv: SafetrainService,
    private routeInfo: ActivatedRoute,
    private localSrv: LocalStorageService
  ) {
  }

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
      //  判断当前表单项是否被全选
      let f = true;
      this.plInputTableData.forEach(value => {
        let flag = false;
        this.plInputTableSelect.forEach(value1 => {
          if (value1.id === value.id) {
            flag = true;
          }
        });
        if (!flag) {
          f = false;
        }
      });
      if (this.plInputTableSelect.length > 0) {
        this.setCheckBox(f);
      }
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
        if (this.workType && this.plInputOrgTreeSelect.id) {
          this.plInputCompanyDataInit(this.plInputNowPage = 1, this.plInputPageOption.pageSize, this.plInputOrgTreeSelect.id, this.workType);
        } else if (this.workType) {
          this.plInputCompanyDataInit(this.plInputNowPage = 1, this.plInputPageOption.pageSize, '', this.workType);
        } else {
          this.plInputCompanyDataInit(this.plInputNowPage = 1, this.plInputPageOption.pageSize, this.plInputOrgTreeSelect.id);
        }
        // this.workType = this.workType.trim() === '' ? null : this.workType.trim();
        this.plInputOrgTreeModal = false;
        // this.plInputCompanyDataInit(this.plInputNowPage = 1, this.plInputPageOption.pageSize, this.plInputOrgTreeSelect.id);
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

  // 当前页的全部选择或不选择全部
  public selectAll(e): void {
    if (e.checked) {
      this.setCheckBox(true);
      // 在全选之前，如果选项已经在被选中，则不添加。没有则添加
      this.plInputTableData.forEach(value => {
        // 是否在 plInputTableSelect 里面
        let flag = false;
        this.plInputTableSelect.forEach(value1 => {
          if (value.id === value1.id) {
            flag = true;
          }
        });
        if (!flag) { // 不存在则添加
          this.plInputTableSelect.push(value);
        }
      });
      const newObj = [];
      Object.assign(newObj, this.plInputTableSelect);
      this.plInputTableSelect = newObj;
    } else {
      // 只有这样才能触发box的改变
      this.setCheckBox(false);
      this.plInputTableData.forEach(value => {
        this.plInputTableSelect.forEach(value1 => {
          if (value.id === value1.id) {
            this.plInputTableSelect.splice(this.plInputTableSelect.indexOf(value1), 1);
          }
        });
      });
      const newObj = [];
      Object.assign(newObj, this.plInputTableSelect);
      this.plInputTableSelect = newObj;
    }
  }

  // 单选
  public select(e, data): void {
    console.log(e.checked);
    if (e.checked) {
      this.plInputTableSelect.push(data);
    } else {
      let i = -1;
      this.plInputTableSelect.forEach((value, index) => {
        if (value.id === data.id) {
          i = index;
        }
      });
      if (i > -1) {
        this.plInputTableSelect.splice(i, 1);
      }
      this.setCheckBox(false);
    }
  }

  public setCheckBox(checked: boolean): void {
    if (checked) {
      this.selectAllBox = ['selectAll'];
    } else {
      this.selectAllBox = [];
    }
  }

}
