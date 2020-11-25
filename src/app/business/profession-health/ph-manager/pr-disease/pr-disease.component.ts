import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../../common/services/global.service';

@Component({
  selector: 'app-pr-disease',
  templateUrl: './pr-disease.component.html',
  styleUrls: ['./pr-disease.component.scss']
})
export class PrDiseaseComponent implements OnInit {
  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public diseaseSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showeditDiseaseDialog: boolean = false;
  public dieaseTitle: Array<object>  = [
    { field: 'factor', header: '职业病危害因素' },
    { field: 'totalNum', header: '总人数' },
    { field: 'womenNum', header: '女工数' },
    { field: 'trainingNum', header: '职业卫生培训人数' },
    { field: 'medicalExaminationNum', header: '体检人数' },
    { field: 'occDiseaseNum', header: '职业病人数' },
    { field: 'demobilizedNum', header: '调离刚位人数' },
    { field: 'writer', header: '填表人' },
    { field: 'writeDepartment', header: '填表部门' },
    { field: 'writeTime', header: '填表时间' },
    { field: 'trainingOrganization', header: '培训机构' },
    { field: 'trainingTime', header: '培训时间' },
    { field: 'medicalExaminationOrganization', header: '体检机构' },
    { field: 'medicalExaminationTime', header: '体检时间' },
    { field: 'operating', header: '操作' },
  ];
  public dieaseContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editDisease: FormGroup;
  public diseasePageOption: PageOption = {
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
    this.editDisease = this.fb.group(
      {
        id: new FormControl(''),
        factor: new FormControl('', Validators.required),
        totalNum: new FormControl('', Validators.required),
        womenNum: new FormControl('', Validators.required),
        trainingNum: new FormControl('', Validators.required),
        medicalExaminationNum: new FormControl('', Validators.required),
        occDiseaseNum: new FormControl('', Validators.required),
        demobilizedNum: new FormControl('', Validators.required),
        writer: new FormControl('', Validators.required),
        writeDepartment: new FormControl('', Validators.required),
        writeTime: new FormControl('', Validators.required),
        trainingOrganization: new FormControl('', Validators.required),
        trainingTime: new FormControl('', Validators.required),
        medicalExaminationOrganization: new FormControl('', Validators.required),
        medicalExaminationTime: new FormControl('', Validators.required),
      }
    );
  }

  // 题库模板下载
  public regularDownloadClick() {
    window.open(this.regularExcelTemplate);
  }

  // 初始化分页数据
  public  initHygieneData(): void {
    this.phealthSrv.getDiseasePageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      this.dieaseContent = val.data.contents;
      this.diseasePageOption.totalRecord = val.data.totalRecord;
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
    if (this.diseaseSelect.length > 0){
      this.toolSrv.setConfirmation('删除', `删除这${this.diseaseSelect.length}项`, () => {
        const data = [];
        this.diseaseSelect.forEach(v => {
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
    this.phealthSrv.delDiseaseData({data: value}).subscribe(val => {
      this.clearData();
      this.initHygieneData();
    });
  }

  // 分页点击事件
  public  archivePageEvent(e): void {
    this.archivePageNo = e;
    this.initHygieneData();
  }
  // 显示修改重大危险源档案
  public  editRiskArchiveClcik(data): void {
    for (const key in JSON.parse(JSON.stringify(this.editDisease.value))) {
      const a = {};
      a[key] = data[key];
      this.editDisease.patchValue(a);
    }
    this.showeditDiseaseDialog = true;
  }
  public  clearData(): void {
    this.showeditDiseaseDialog = false;
    this.diseaseSelect = [];
    this.editDisease.reset();
  }
  // 确定修改
  public  sureeditDiseaseClick(): void {
    if (this.editDisease.valid){
      const data = JSON.parse(JSON.stringify(this.editDisease.value));
      data.writeTime = this.datePipe.transform(data.writeTime, 'yyyy-MM-dd');
      data.trainingTime = this.datePipe.transform(data.trainingTime, 'yyyy-MM-dd');
      data.medicalExaminationTime = this.datePipe.transform(data.medicalExaminationTime, 'yyyy-MM-dd');
      if (data.id === '' || data.id === null){
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addDiseaseData(data).subscribe(val => {
            this.initHygieneData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateDiseaseData(data).subscribe(val => {
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
        this.phealthSrv.diseaseFactorsExcelImport(formData).subscribe(res => {
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
