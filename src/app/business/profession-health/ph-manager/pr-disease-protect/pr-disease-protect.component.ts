import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../../common/services/global.service';

@Component({
  selector: 'app-pr-disease-protect',
  templateUrl: './pr-disease-protect.component.html',
  styleUrls: ['./pr-disease-protect.component.scss']
})
export class PrDiseaseProtectComponent implements OnInit {

  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public diseaseProtectSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showeditDiseaseProtectDialog: boolean = false;
  public diseaseStatusTitle: Array<object>  = [
    { field: 'healthEquipmentOrganization', header: '使用单位' },
    { field: 'healthEquipmentName', header: '设施名称' },
    { field: 'healthEquipmentModel', header: '设备型号' },
    { field: 'healthEquipmentProduction', header: '制造单位' },
    { field: 'healthEquipmentLocation', header: '安装地点' },
    { field: 'healthEquipmentTime', header: '校验日期（年月日）' },
    { field: 'healthEquipmentRemark', header: '备注' },
    { field: 'operating', header: '操作' },
  ];
  public diseaseStatusContent: Array<object> = [];
  public archivePageNo: number = 1;
  public eidtDiseaseProtect: FormGroup;
  public diseaseProtectPageOption: PageOption = {
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
      this.regularExcelTemplate = res.data[13].path;
    });
    this.initDiseaseStatusData();
    this.eidtDiseaseProtect = this.fb.group(
      {
        id: new FormControl(''),
        healthEquipmentOrganization: new FormControl('', Validators.required),
        healthEquipmentName: new FormControl('', Validators.required),
        healthEquipmentModel: new FormControl('', Validators.required),
        healthEquipmentProduction: new FormControl('', Validators.required),
        healthEquipmentLocation: new FormControl('', Validators.required),
        healthEquipmentTime: new FormControl('', Validators.required),
        healthEquipmentRemark: new FormControl('', Validators.required),
      }
    );
  }

  // 题库模板下载
  public regularDownloadClick() {
    window.open(this.regularExcelTemplate);
  }

  // 初始化分页数据
  public  initDiseaseStatusData(): void {
    this.phealthSrv.getDiseaseProtectPageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      this.diseaseStatusContent = val.data.contents;
      this.diseaseProtectPageOption.totalRecord = val.data.totalRecord;
    });

  }
  // 删除单条数据
  public  delDiseaseStatusClick(item): void {
    this.toolSrv.setConfirmation('删除', '删除这条信息', () => {
      this.delDataRequest([{id: item.id}]);
    });
  }
  // 删除多条数据
  public  delMoreDialyTestClick(): void {
    if (this.diseaseProtectSelect.length > 0){
      this.toolSrv.setConfirmation('删除', `删除这${this.diseaseProtectSelect.length}项`, () => {
        const data = [];
        this.diseaseProtectSelect.forEach(v => {
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
    this.phealthSrv.delDiseaseProtectData({data: value}).subscribe(val => {
      this.clearData();
      this.initDiseaseStatusData();
    });
  }

  // 分页点击事件
  public  archivePageEvent(e): void {
    this.archivePageNo = e;
    this.initDiseaseStatusData();
  }
  // 显示修改重大危险源档案
  public  eidtDiseaseProtectClcik(data): void {
    for (const key in JSON.parse(JSON.stringify(this.eidtDiseaseProtect.value))) {
      const a = {};
      a[key] = data[key];
      this.eidtDiseaseProtect.patchValue(a);
    }
    this.showeditDiseaseProtectDialog = true;
  }
  public  clearData(): void {
    this.showeditDiseaseProtectDialog = false;
    this.diseaseProtectSelect = [];
    this.eidtDiseaseProtect.reset();
  }
  // 确定修改
  public  sureeidtDiseaseProtectClick(): void {
    if (this.eidtDiseaseProtect.valid){
      const data = JSON.parse(JSON.stringify(this.eidtDiseaseProtect.value));
      data.healthEquipmentTime = this.datePipe.transform(data.healthEquipmentTime, 'yyyy-MM-dd');
      if (data.id === '' || data.id === null){
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addDiseaseProtectData(data).subscribe(val => {
            this.initDiseaseStatusData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateDiseaseProtectData(data).subscribe(val => {
            this.initDiseaseStatusData();
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
        this.phealthSrv.occHealthEquipmentExcelImport(formData).subscribe(res => {
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
