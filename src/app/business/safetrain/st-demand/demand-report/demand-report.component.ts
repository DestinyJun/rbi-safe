import {Component, OnInit} from '@angular/core';
import {OrgTree, PageOption, TableHeader, TrainingField, TrainingFieldAddClass} from '../../../../common/public/Api';
import {Es, orgInitializeTree} from '../../../../common/public/contents';
import {GlobalService} from '../../../../common/services/global.service';
import {SafetrainService} from '../../../../common/services/safetrain.service';
import {PublicMethodService} from "../../../../common/public/public-method.service";

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
  public selectAllBox: string[] = []; // 全选元素
  public selectBoxes = []; // 全选元素
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
    {field: 'workType', header: '工种'},
    {field: 'teamName', header: '班组'},
    {field: 'workType', header: '工种'},
  ]; // 表头字段
  public reportTableData: any[] = []; // 表体数据
  public reportTableSelect: any[] = []; // 表体数据选择
  public reportTableSelectName: any = '请选择受训单位人员'; // 表体数据选择名字
  public reportNowPage: number = 1; // 当前页
  public reportWorkType: string = null; // 当前页

  constructor(
    private globalSrv: GlobalService,
    private safeSrv: SafetrainService,
    private publicSrc: PublicMethodService
  ) {
  }

  ngOnInit() {
    const bj = {
      a : 1,
      b : '2',
      cc: {
        r: '12'
      }
    };
    this.clearObject(bj);
    console.log(bj);

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
  private reportCompanyDataInit(pageNo, pageSize, organizationIds = '', workType= '') {
    const organizationId = organizationIds ? organizationIds : null;
    this.globalSrv.publicGetCompanyPerson({pageNo, pageSize, organizationId, workType}).subscribe((res) => {
      this.reportTableData = res.data.contents;
      this.selectBoxes = [];
      this.reportPageOption.totalRecord = res.data.totalRecord;
      this.reportTableData.forEach(value => {
        this.selectBoxes.push([0]);
      });
      //  判断当前表单项是否被全选
      let f = true;
      this.reportTableData.forEach((value, index) => {
        let flag = false;
        this.reportTableSelect.forEach(value1 => {
          if (value1.id === value.id) {
            flag = true;
          }
        });
        if (!flag) {
          f = false;
          this.selectBoxes[index] = [0];
        } else {
          this.selectBoxes[index] = [1];
        }
      });
      if (this.reportTableSelect.length > 0) {
        this.setCheckBox(f);
      }
    });
  }

  // 操作
  public reportOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.reportOperateField.trainingTypeId = this.reportDropdownSelected ? this.reportDropdownSelected.id : '';
        this.reportOperateField.organizationTrainingDepartmentId = this.reportOrgTreeSelect ? this.reportOrgTreeSelect.id : '';
        this.reportOperateField.targetSet = this.reportTableSelect.map((res) => res.id).join(',');
        console.log(JSON.stringify(this.reportOperateField));
        if (this.validObject(this.reportOperateField)) {
          this.safeSrv.addReportsInfo(this.reportOperateField).subscribe(() => {
            this.publicSrc.setToast('success', '提示', '提交成功');
            this.reportDropdownSelected = null;
            this.reportTableSelectName = '请选择受训单位人员';
            this.clearObject(this.reportOperateField);
            this.clearObject(this.reportDropdownSelected);
            this.clearObject(this.reportOrgTreeSelect);
            this.reportTableSelect = [];
            this.setCheckBox(false);
            for (let i = 0; i < this.selectBoxes.length; i++) {
              this.selectBoxes[i] = 0;
            }
          });
          break;
        }
        this.publicSrc.setToast('error', '提示', '请把参数填写完整');
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
        if (this.reportWorkType && this.reportOrgTreeSelect.id) {
          this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id, this.reportWorkType);
        } else if (this.reportWorkType) {
          this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, '', this.reportWorkType);
        } else {
          this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id);
        }
        console.log(this.reportWorkType , this.reportOrgTreeSelect.id);
        // if (this.reportWorkType && this.reportOrgTreeSelect.id) {
        //   this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id, this.reportWorkType);
        // } else if (this.reportWorkType && this.reportWorkType !== '') {
        //   this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, '', this.reportWorkType);
        // } else {
        //   this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id);
        // }
        this.reportOrgTreeModal = false;
        break;
    }
  }

  // 分页操作
  public reportPageEvent(page) {
    this.reportNowPage = page;
    // if (this.reportWorkType && this.reportOrgTreeSelect.id) {
    //   this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id, this.reportWorkType);
    // } else if (this.reportWorkType) {
    //   this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, '', this.reportWorkType);
    // }else if (this.reportOrgTreeSelect.id) {
    //   this.reportCompanyDataInit(this.reportNowPage = 1, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id);
    // } else {
    //   this.reportCompanyDataInit(page, this.reportPageOption.pageSize);
    // }
    // this.reportNowPage = page;
    // if (this.reportOrgTreeSelect.id) {
    //   this.reportCompanyDataInit(this.reportNowPage, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id);
    //   return;
    // }
    this.reportCompanyDataInit(page, this.reportPageOption.pageSize, this.reportOrgTreeSelect.id, this.reportWorkType);
  }

  //
  test(item) {
    console.log(item);
  }

  // 当前页的全部选择或不选择全部
  public selectAll(e): void {
    if (e.checked) {
      this.setCheckBox(true);
      this.selectBoxes = this.selectBoxes.map(val => val = [1]);
      // 在全选之前，如果选项已经在被选中，则不添加。没有则添加
      this.reportTableData.forEach(value => {
        // 是否在 plInputTableSelect 里面
        let flag = false;
        this.reportTableSelect.forEach(value1 => {
          if (value.id === value1.id) {
            flag = true;
          }
        });
        if (!flag) { // 不存在则添加
          this.reportTableSelect.push(value);
        }
      });
      // const newObj = [];
      // Object.assign(newObj, this.reportTableSelect);
      // this.reportTableSelect = newObj;
    } else {
      // 只有这样才能触发box的改变
      this.setCheckBox(false);
      this.selectBoxes = this.selectBoxes.map(val => val = [0]);
      this.reportTableData.forEach(value => {
        this.reportTableSelect.forEach(value1 => {
          if (value.id === value1.id) {
            this.reportTableSelect.splice(this.reportTableSelect.indexOf(value1), 1);
          }
        });
      });
      // const newObj = [];
      // Object.assign(newObj, this.reportTableSelect);
      // this.reportTableSelect = newObj;
    }
  }

  // 单选
  public select(e, data): void {
    console.log(e.checked);
    if (e.checked) {
      this.reportTableSelect.push(data);
    } else {
      let i = -1;
      this.reportTableSelect.forEach((value, index) => {
        if (value.id === data.id) {
          i = index;
        }
      });
      if (i > -1) {
        this.reportTableSelect.splice(i, 1);
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

  // 递归
  private clearObject(obj: any): void {
    // 拿到数据类型
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === 'Object' || type === 'Array') {
      // tslint:disable-next-line:forin
      for (const objKey in obj) {
        const type1 = Object.prototype.toString.call(obj[objKey]).slice(8, -1);
        if (type1 === 'Object' || type === 'Array') {
          this.clearObject(obj[objKey]);
        } else {
          obj[objKey] = null;
        }
      }
    }
  }

  // 递归判断对象是否有空值
  private validObject(obj: any): boolean {
    let ret = true; // 默认对象有效
    // 拿到数据类型
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === 'Object' || type === 'Array') {
      // tslint:disable-next-line:forin
      for (const objKey in obj) {
        ret  = ret && this.validObject(obj[objKey]);
      }
    } else {
      if (!obj || obj === '') {ret =  false; }
    }
    return ret;
  }
}
