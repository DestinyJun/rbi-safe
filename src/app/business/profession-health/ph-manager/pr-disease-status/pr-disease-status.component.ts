import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pr-disease-status',
  templateUrl: './pr-disease-status.component.html',
  styleUrls: ['./pr-disease-status.component.scss']
})
export class PrDiseaseStatusComponent implements OnInit {


  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public diseaseStatusSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showeditDiseaseStatusDialog: boolean = false;
  public diseaseStatusTitle: Array<object>  = [
    { field: 'healthMaintainWorkshop', header: '车间名称' },
    { field: 'healthMaintainName', header: '防护设备名称' },
    { field: 'healthMaintainType', header: '型号' },
    { field: 'healthMaintainTime', header: '安装时间' },
    { field: 'healthMaintainLocation', header: '安装位置' },
    { field: 'healthMaintainDangerName', header: '产害设备名称' },
    { field: 'healthMaintainSituation', header: '防护设备运行状况' },
    { field: 'healthMaintainCause', header: '防护设备失效原因' },
    { field: 'healthMaintainRemark', header: '备注' },
    { field: 'operating', header: '操作' },
  ];
  public diseaseStatusContent: Array<object> = [];
  public diseaseStatusPageNo: number = 1;
  public editDiseaseStatus: FormGroup;
  public diseaseStatusPageOption: PageOption = {
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
  constructor(
    private toolSrv: PublicMethodService,
    private phealthSrv: ProfessHealthService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }
  ngOnInit() {
    this.initDiseaseProtectData();
    this.editDiseaseStatus = this.fb.group(
      {
        id: new FormControl(''),
        healthMaintainWorkshop: new FormControl('', Validators.required),
        healthMaintainName: new FormControl('', Validators.required),
        healthMaintainType: new FormControl('', Validators.required),
        healthMaintainTime: new FormControl('', Validators.required),
        healthMaintainLocation: new FormControl('', Validators.required),
        healthMaintainDangerName: new FormControl('', Validators.required),
        healthMaintainSituation: new FormControl('', Validators.required),
        healthMaintainCause: new FormControl('', Validators.required),
        healthMaintainRemark: new FormControl('', Validators.required),
      }
    );
  }

  // 初始化分页数据
  public  initDiseaseProtectData(): void {
    this.phealthSrv.getDiseaseStatusPageData({pageNo: this.diseaseStatusPageNo, pageSize: 10}).subscribe(val => {
      this.diseaseStatusContent = val.data.contents;
      this.diseaseStatusPageOption.totalRecord = val.data.totalRecord;
    });

  }
  // 删除单条数据
  public  delDialyTestClick(item): void {
    this.toolSrv.setConfirmation('删除', '删除这条信息', () => {
      this.delDataRequest([{id: item.id}]);
    });
  }
  // 删除多条数据
  public  delMoreDialyTestClick(): void {
    if (this.diseaseStatusSelect.length > 0){
      this.toolSrv.setConfirmation('删除', `删除这${this.diseaseStatusSelect.length}项`, () => {
        const data = [];
        this.diseaseStatusSelect.forEach(v => {
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
    this.phealthSrv.delDiseaseStatusData({data: value}).subscribe(val => {
      this.clearData();
      this.initDiseaseProtectData();
    });
  }

  // 分页点击事件
  public  diseaseStatusPageEvent(e): void {
    this.diseaseStatusPageNo = e;
    this.initDiseaseProtectData();
  }
  // 显示修改重大危险源档案
  public  editDiseaseStatusClcik(data): void {
    // tslint:disable-next-line:forin
    for (const key in JSON.parse(JSON.stringify(this.editDiseaseStatus.value))) {
      const a = {};
      a[key] = data[key];
      this.editDiseaseStatus.patchValue(a);
    }
    this.showeditDiseaseStatusDialog = true;
  }
  public  clearData(): void {
    this.showeditDiseaseStatusDialog = false;
    this.diseaseStatusSelect = [];
    this.editDiseaseStatus.reset();
  }
  // 确定修改
  public  showeditDiseaseStatusClick(): void {
    if (this.editDiseaseStatus.valid){
      const data = JSON.parse(JSON.stringify(this.editDiseaseStatus.value));
      data.healthMaintainTime = this.datePipe.transform(data.healthMaintainTime, 'yyyy-MM-dd');
      if (data.id === '' || data.id === null){
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addDiseaseStatusData(data).subscribe(val => {
            this.initDiseaseProtectData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateDiseaseStatusData(data).subscribe(val => {
            this.initDiseaseProtectData();
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
        this.phealthSrv.occHealthMaintainExcelImport(formData).subscribe(res => {
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
