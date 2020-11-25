import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../../common/services/global.service';

@Component({
  selector: 'app-rate-now',
  templateUrl: './rate-now.component.html',
  styleUrls: ['./rate-now.component.scss']
})
export class RateNowComponent implements OnInit {


  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public RateNowSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showeditRateNowDialog: boolean = false;
  public dailyTestTitle: Array<object>  = [
    { field: 'time', header: '时间' },
    { field: 'evaluationOrganization', header: '评价机构' },
    { field: 'evaluationProject', header: '评价项目' },
    { field: 'evaluationResult', header: '评价结论' },
    { field: 'operating', header: '操作' },
  ];
  public dailyTestContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editRateNow: FormGroup;
  public dailyPageOption: PageOption = {
    pageSize: 10,
    totalRecord: ''
  };
  public esDate = Es;
  public fileName = '';
  public uploadSubjectFinishDialog = false;
  public fileDialog = false;
  public finishData = {
    'successSize': 0,
    'failSize': 0,
    'failTecord': []
  };
  public pathFile: any;
  public file: any;
  public rateExcelTemplate: string = ''; // 导入模板地址
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
      this.rateExcelTemplate = res.data[12].path;
    });
    this.initDailyTestData();
    this.editRateNow = this.fb.group(
      {
        id: new FormControl(''),
        time: new FormControl('', Validators.required),
        evaluationOrganization: new FormControl('', Validators.required),
        evaluationProject: new FormControl('', Validators.required),
        evaluationResult: new FormControl('', Validators.required),
        file: new FormControl('', Validators.required),
      }
    );
  }

  // 题库模板下载
  public rateDownloadClick() {
    window.open(this.rateExcelTemplate);
  }

  // 初始化分页数据
  public  initDailyTestData(): void {
    this.phealthSrv.getRateNowPageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      this.dailyTestContent = val.data.contents;
      this.dailyPageOption.totalRecord = val.data.totalRecord;
    });

  }
  // 删除单条数据
  public  delRateNowClick(item): void {
    this.toolSrv.setConfirmation('删除', '删除这条信息', () => {
      this.delDataRequest([{id: item.id}]);
    });
  }
  // 删除多条数据
  public  delMoreRateNowClick(): void {
    if (this.RateNowSelect.length > 0){
      this.toolSrv.setConfirmation('删除', `删除这${this.RateNowSelect.length}项`, () => {
        const data = [];
        this.RateNowSelect.forEach(v => {
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
    this.phealthSrv.delRateNowData({data: value}).subscribe(val => {
      this.clearData();
      this.initDailyTestData();
    });
  }
  // 选择文集
  public  selectFile(e): void {
    this.file = e.target.files[0];
    this.editRateNow.patchValue({file: e.target.files[0].name});
  }

  // 分页点击事件
  public  archivePageEvent(e): void {
    this.archivePageNo = e;
    this.initDailyTestData();
  }
  // 显示修改重大危险源档案
  public  editRiskArchiveClcik(data): void {
    for (const key in JSON.parse(JSON.stringify(this.editRateNow.value))) {
      const a = {};
      a[key] = data[key];
      this.editRateNow.patchValue(a);
    }
    this.pathFile = data.annex;
    this.editRateNow.patchValue({'file': data.annex.slice(data.annex.lastIndexOf('/') + 1, data.annex.length)});
    this.showeditRateNowDialog = true;
  }
  public  clearData(): void {
    this.showeditRateNowDialog = false;
    this.file = null;
    this.RateNowSelect = [];
    this.editRateNow.reset();
  }
  // 确定修改
  public  sureeditRateNowClick(): void {
    if (this.editRateNow.valid){
      const data = JSON.parse(JSON.stringify(this.editRateNow.value));
      data.time = this.datePipe.transform(data.time, 'yyyy-MM-dd');
      const formData = new FormData();
      for (const key in data){
        if (key !== 'file'){
          formData.append(key, data[key]);
        }
      }
      formData.append('file', this.file);
      if (data.id === '' || data.id === null){
        delete data.id;
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addRateNowData(formData).subscribe(val => {
            this.initDailyTestData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateRateNowData(formData).subscribe(val => {
            this.initDailyTestData();
            this.clearData();
          });
        });
      }
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完成');
    }
  }
  // 下载文件
  public  downLoadFile(): void {
    window.open(this.pathFile);
  }



  public export(): void {
    this.phealthSrv.statusEvaluationExcelwrite().subscribe(res => {
      window.open(res.data.path);
    });
  }

  public openImport(): void  {
    this.fileDialog = true;
  }


  public  selectFile1(e): void {
    this.fileName = e.files[0].name;
    this.file = e.files[0];
  }

  public  submitClick(): void {
    if (this.file){
      this.toolSrv.setConfirmation('导入', '导入', () => {
        const formData = new FormData();
        formData.append('file', this.file);
        console.log(formData);
        this.phealthSrv.statusEvaluationExcelImport(formData).subscribe(res => {
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
