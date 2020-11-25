import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../../common/services/global.service';

@Component({
  selector: 'app-pr-hazards-summary',
  templateUrl: './pr-hazards-summary.component.html',
  styleUrls: ['./pr-hazards-summary.component.scss']
})
export class PrHazardsSummaryComponent implements OnInit {
  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public hazardsSummarySelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showEditHazardsSummaryDialog: boolean = false;
  public hazardsSummaryTitle: Array<object>  = [
    { field: 'healthEndangerName', header: '职业病危害名称（代码）' },
    { field: 'healthEndangerPosition', header: '作业场所名称' },
    { field: 'healthEndangerSource', header: '职业病危害因素来源' },
    { field: 'healthEndangerStatus', header: '设备状态' },
    { field: 'healthEndangerMode', header: '操作方式' },
    { field: 'healthEndangerInsulate', header: '是否隔离' },
    { field: 'healthEndangerPeopleNumber', header: '接触职业病危害人数' },
    { field: 'healthEndangerFemaleNumber', header: '接触职业病危害女工人数' },
    { field: 'healthEndangerStrength', header: '作业场所强度（浓度）' },
    { field: 'healthEndangerEquipment', header: '工程防护设施名称' },
    { field: 'healthEndangerGoods', header: '个体防护用品有名称' },
    { field: 'healthEndangerDepartment', header: '填表部门' },
    { field: 'healthEndangerOperation', header: '填表人' },
    { field: 'healthEndangerAuditor', header: '审核人' },
    { field: 'healthEndangerOperationTime', header: '填表时间' },
    { field: 'healthEndangerTest', header: '职业病危害因素检测机构' },
    { field: 'healthEndangerTestTime', header: '检测时间' },
    { field: 'operating', header: '操作' },
  ];
  public hazardsSummaryContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editHazardsSummary: FormGroup;
  public hazardsSummaryPageOption: PageOption = {
    pageSize: 10,
    totalRecord: ''
  };
  public esDate = Es;
  public file: any;
  public fileName = '';
  public uploadSubjectFinishDialog = false;
  public fileDialog = false;
  public finishData = {
    'successSize': 0,
    'failSize': 0,
    'failTecord': []
  };
  public regularExcelTemplate: string = ''; // 导入模板地址
  constructor(
    private toolSrv: PublicMethodService,
    private phealthSrv: ProfessHealthService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private globalSrv: GlobalService
  ) { }
  ngOnInit() {
    // 模板下载初始化
    this.globalSrv.publicGetExcelTemplate().subscribe((res) => {
      this.regularExcelTemplate = res.data[9].path;
    });
    this.initHygieneData();
    this.editHazardsSummary = this.fb.group(
      {
        id: new FormControl(''),
        healthEndangerName: new FormControl('', Validators.required),
        healthEndangerPosition: new FormControl('', Validators.required),
        healthEndangerSource: new FormControl('', Validators.required),
        healthEndangerStatus: new FormControl('', Validators.required),
        healthEndangerMode: new FormControl('', Validators.required),
        healthEndangerInsulate: new FormControl('', Validators.required),
        healthEndangerPeopleNumber: new FormControl('', Validators.required),
        healthEndangerFemaleNumber: new FormControl('', Validators.required),
        healthEndangerStrength: new FormControl('', Validators.required),
        healthEndangerEquipment: new FormControl('', Validators.required),
        healthEndangerGoods: new FormControl('', Validators.required),
        healthEndangerDepartment: new FormControl('', Validators.required),
        healthEndangerOperation: new FormControl('', Validators.required),
        healthEndangerAuditor: new FormControl('', Validators.required),
        healthEndangerOperationTime: new FormControl('', Validators.required),
        healthEndangerTest: new FormControl('', Validators.required),
        healthEndangerTestTime: new FormControl('', Validators.required),
      }
    );
  }

  // 题库模板下载
  public regularDownloadClick() {
    window.open(this.regularExcelTemplate);
  }

  // 初始化分页数据
  public  initHygieneData(): void {
    this.phealthSrv.getHazardSummaryPageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      this.hazardsSummaryContent = val.data.contents;
      this.hazardsSummaryPageOption.totalRecord = val.data.totalRecord;
    });

  }
  // 删除单条数据
  public  delHazardsSummaryClick(item): void {
    this.toolSrv.setConfirmation('删除', '删除这条信息', () => {
      this.delDataRequest([{id: item.id}]);
    });
  }
  // 删除多条数据
  public  delMoreHazardsSummaryClick(): void {
    if (this.hazardsSummarySelect.length > 0){
      this.toolSrv.setConfirmation('删除', `删除这${this.hazardsSummarySelect.length}项`, () => {
        const data = [];
        this.hazardsSummarySelect.forEach(v => {
          data.push({id: v.id});
        });
        this.delDataRequest(data);
      });
    }else {
      this.toolSrv.setToast('error', '操作错误', '请选择需要删除的项');
    }
  }
  // 删除请求
  public  delDataRequest(value): void {
    this.phealthSrv.delHazardSummaryData({data: value}).subscribe(val => {
      this.clearData();
      this.initHygieneData();
    });
  }

  // 分页点击事件
  public  hazardsSummaryPageEvent(e): void {
    this.archivePageNo = e;
    this.initHygieneData();
  }
  // 显示修改重大危险源档案
  public  editRiskArchiveClcik(data): void {
    for (const key in JSON.parse(JSON.stringify(this.editHazardsSummary.value))) {
      const a = {};
      a[key] = data[key];
      this.editHazardsSummary.patchValue(a);
    }
    this.showEditHazardsSummaryDialog = true;
  }
  public  clearData(): void {
    this.showEditHazardsSummaryDialog = false;
    this.hazardsSummarySelect = [];
    this.editHazardsSummary.reset();
  }
  // 确定修改
  public  sureeditHazardsSummaryClick(): void {
    console.log(this.editHazardsSummary.value);
    if (this.editHazardsSummary.valid){
      const data = JSON.parse(JSON.stringify(this.editHazardsSummary.value));
      data.healthEndangerTestTime = this.datePipe.transform(data.healthEndangerTestTime, 'yyyy-MM-dd');
      data.healthEndangerOperationTime = this.datePipe.transform(data.healthEndangerOperationTime, 'yyyy-MM-dd');
      if (data.id === '' || data.id === null){
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addHazardSummaryData(data).subscribe(val => {
            this.initHygieneData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateHazardSummaryData(data).subscribe(val => {
            this.initHygieneData();
            this.clearData();
          });
        });
      }
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }

  public openImport(): void  {
    this.fileDialog = true;
  }


  public  selectFile(e): void {
    this.fileName = e.files[0].name;
    this.file = e.files[0];
  }

  public  submitClick(): void {
    if (this.file){
      this.toolSrv.setConfirmation('导入', '导入', () => {
        const formData = new FormData();
        formData.append('file', this.file);
        console.log(formData);
        this.phealthSrv.occHealthEndangerExcelImport(formData).subscribe(res => {
          console.log(res);
          this.toolSrv.setToast('info', '提示', '操作成功');
          this.finishData = res.data;
          this.file = null;
          this.fileName = '';
          this.uploadSubjectFinishDialog = true;
          this.fileDialog = false;
        });
      });
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }
}
