import {Component, OnInit} from '@angular/core';
import {OrgTree, PageOption, TableHeader, TrainingField, TrainingFieldAddClass} from '../../../../common/public/Api';
import {Es, orgInitializeTree} from '../../../../common/public/contents';
import {GlobalService} from '../../../../common/services/global.service';
import {SafetrainService} from '../../../../common/services/safetrain.service';

@Component({
  selector: 'app-demand-report',
  templateUrl: './demand-report.component.html',
  styleUrls: ['./demand-report.component.scss']
})
export class DemandReportComponent implements OnInit {
  public reportDropdownOptions: any; // 下拉配置项
  public reportDropdownSelected: any; // 下拉选择
  public reportOrgTree: OrgTree[] = []; // 树配置项
  public reportOrgTreeSelect: OrgTree = {}; // 树选择
  public reportOperateField: TrainingField = new TrainingFieldAddClass(); // 操作字段
  public reportOperateModal: boolean = false; // 模态框
  public reportOrgTreeModal: boolean = false; // 组织树模态框
  public reportOperateFlag: any ; // 操作标识
  public reportEs: any = Es;
  public reportPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public reportTableHeader: TableHeader[] = [
    {field: 'name', header: '姓名'},
    {field: 'idCardNo', header: '身份证'},
    {field: 'factoryName', header: '厂矿'},
    {field: 'workshopName', header: '车间'},
    {field: 'teamName', header: '班组'},
  ]; // 表头字段
  public reportTableData: any[]; // 表体数据
  public reportTableSelect: any[]; // 表体数据选择
  public reportTableSelectName: any = '请选择受训单位人员'; // 表体数据选择名字
  public reportNowPage: number = 1; // 当前页

  constructor(
    private globalSrv: GlobalService,
    private safeSrv: SafetrainService,
  ) {
  }

  ngOnInit() {
    this.reportDataInit();
  }

  // 数据初始化
  private reportDataInit() {
    // 初始化培训类型
    this.globalSrv.publicGetSafeTrainingType().subscribe((res) => {
      this.reportDropdownOptions = res.data;
    });
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.reportOrgTree = orgInitializeTree(res.data);
      }
    );
    // 初始化公司人员
    this.reportCompanyDataInit(this.reportNowPage, this.reportPageOption.pageSize);
  }

  //  公司人员分页
  private reportCompanyDataInit(pageNo, pageSize, organizationIds = '') {
    const organizationId = organizationIds ? organizationIds : null;
    this.globalSrv.publicGetCompanyPerson({pageNo, pageSize, organizationId}).subscribe((res) => {
      this.reportTableData = res.data.contents;
      this.reportPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 操作
  public reportOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        if (this.reportDropdownSelected && this.reportOrgTreeSelect && this.reportTableSelect) {
          this.reportOperateField.trainingTypeId = this.reportDropdownSelected.id;
          this.reportOperateField.organizationTrainingDepartmentId = this.reportOrgTreeSelect.id;
          this.reportOperateField.targetSet = this.reportTableSelect.map((res) => res.id).join(',');
          this.safeSrv.addReportsInfo(this.reportOperateField).subscribe(() => {
            this.reportOperateField = new TrainingFieldAddClass();
            window.alert('提交成功');
          });
          break;
        }
        window.alert('请把参数填写完整');
        break;
      case 'tree':
        this.reportOperateModal = true;
        break;
      case 'strain':
        this.reportOperateModal = true;
        break;
      case 'select':
        this.reportOperateModal = false;
        if (this.reportTableSelect) {
          this.reportTableSelectName = this.reportTableSelect.map((res) => res.name).join(',');
        }
        break;
      case 'search':
        this.reportOrgTreeModal = false;
        this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id);
        break;
    }
  }

  // 分页操作
  public reportPageEvent(page) {
    this.reportNowPage = page;
    if (this.reportOrgTreeSelect.id) {
      this.reportCompanyDataInit(this.reportNowPage, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id);
      return;
    }
    this.reportCompanyDataInit(page, this.reportPageOption.pageSize);
  }
}
