import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {BigRiskService} from '../../../../common/services/big-risk.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../../common/services/global.service';

@Component({
  selector: 'app-daily-test',
  templateUrl: './daily-test.component.html',
  styleUrls: ['./daily-test.component.scss']
})
export class DailyTestComponent implements OnInit {

  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public dialyTestSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showEditDialyTestDialog: boolean = false;
  public dailyTestTitle: Array<object>  = [
    { field: 'factoryName', header: '厂' },
    { field: 'workshopName', header: '车间' },
    { field: 'determinationDate', header: '测定日期' },
    { field: 'harmfulFactors', header: '有害因素' },
    { field: 'determinationPlace', header: '测定地点' },
    { field: 'determinationResult', header: '测定结果' },
    { field: 'determinationUnit', header: '测定单位' },
    { field: 'remark', header: '备注' },
    { field: 'writer', header: '填报人' },
    { field: 'auditor', header: '审核人' },
    { field: 'principal', header: '负责人' },
    { field: 'operating', header: '操作' },
  ];
  public dailyTestContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editDialyTest: FormGroup;
  public dailyPageOption: PageOption = {
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
      this.rateExcelTemplate = res.data[10].path;
    });
    this.initDailyTestData();
    this.editDialyTest = this.fb.group(
      {
        id: new FormControl(''),
        factoryName: new FormControl('', Validators.required),
        workshopName: new FormControl('', Validators.required),
        determinationDate: new FormControl('', Validators.required),
        harmfulFactors: new FormControl('', Validators.required),
        determinationPlace: new FormControl('', Validators.required),
        determinationResult: new FormControl('', Validators.required),
        determinationUnit: new FormControl('', Validators.required),
        remark: new FormControl('', Validators.required),
        writer: new FormControl('', Validators.required),
        auditor: new FormControl('', Validators.required),
        principal: new FormControl('', Validators.required),
      }
    );
  }

  // 题库模板下载
  public rateDownloadClick() {
    window.open(this.rateExcelTemplate);
  }

  // 初始化分页数据
  public  initDailyTestData(): void {
    this.phealthSrv.getDailyTestPageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      this.dailyTestContent = val.data.contents;
      this.dailyPageOption.totalRecord = val.data.totalRecord;
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
    if (this.dialyTestSelect.length > 0){
      this.toolSrv.setConfirmation('删除', `删除这${this.dialyTestSelect.length}项`, () => {
         const data = [];
         this.dialyTestSelect.forEach(v => {
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
    this.phealthSrv.delDailyTestData({data: value}).subscribe(val => {
      this.clearData();
      this.initDailyTestData();
    });
  }

  // 分页点击事件
  public  archivePageEvent(e): void {
    this.archivePageNo = e;
    this.initDailyTestData();
  }
  // 显示修改重大危险源档案
  public  editRiskArchiveClcik(data): void {
    for (const key in JSON.parse(JSON.stringify(this.editDialyTest.value))) {
      const a = {};
      a[key] = data[key];
      this.editDialyTest.patchValue(a);
    }
    this.showEditDialyTestDialog = true;
  }
  public  clearData(): void {
    this.showEditDialyTestDialog = false;
      this.dialyTestSelect = [];
      this.editDialyTest.reset();
  }
  // 确定修改
  public  sureEditDialyTestClick(): void {
    if (this.editDialyTest.valid){
      const data = JSON.parse(JSON.stringify(this.editDialyTest.value));
      data.determinationDate = this.datePipe.transform(data.determinationDate, 'yyyy-MM-dd');
      if (data.id === '' || data.id === null){
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addDailyTestData(data).subscribe(val => {
            this.initDailyTestData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateDailyTestData(data).subscribe(val => {
            this.initDailyTestData();
            this.clearData();
          });
        });
      }
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }

  public export(): void {
    this.phealthSrv.dailyMonitoringExcelwrite().subscribe(res => {
      window.open(res.data.path);
    });
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
        this.phealthSrv.dailyMonitoringExcelImport(formData).subscribe(res => {
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
