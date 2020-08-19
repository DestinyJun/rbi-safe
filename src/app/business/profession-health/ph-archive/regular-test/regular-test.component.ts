import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-regular-test',
  templateUrl: './regular-test.component.html',
  styleUrls: ['./regular-test.component.scss']
})
export class RegularTestComponent implements OnInit {

  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public RegularTestSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showEditRegularTestDialog: boolean = false;
  public dailyTestTitle: Array<object>  = [
    { field: 'time', header: '时间' },
    { field: 'monitoringOrganization', header: '检测机构' },
    { field: 'monitoringProject', header: '检测项目' },
    { field: 'monitoringResult', header: '检测结论' },
    { field: 'operating', header: '操作' },
  ];
  public dailyTestContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editRegularTest: FormGroup;
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
  public pathFile: any;
  constructor(
    private toolSrv: PublicMethodService,
    private phealthSrv: ProfessHealthService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }
  ngOnInit() {
    this.initDailyTestData();
    this.editRegularTest = this.fb.group(
      {
        id: new FormControl(''),
        time: new FormControl('', Validators.required),
        monitoringOrganization: new FormControl('', Validators.required),
        monitoringProject: new FormControl('', Validators.required),
        monitoringResult: new FormControl('', Validators.required),
        file: new FormControl('', Validators.required),
      }
    );
  }

  // 初始化分页数据
  public  initDailyTestData(): void {
    this.phealthSrv.getRegularTestPageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      this.dailyTestContent = val.data.contents;
      this.dailyPageOption.totalRecord = val.data.totalRecord;
    });

  }
  // 删除单条数据
  public  delRegularTestClick(item): void {
    this.toolSrv.setConfirmation('删除', '删除这条信息', () => {
      this.delDataRequest([{id: item.id}]);
    });
  }
  // 删除多条数据
  public  delMoreRegularTestClick(): void {
    if (this.RegularTestSelect.length > 0){
      this.toolSrv.setConfirmation('删除', `删除这${this.RegularTestSelect.length}项`, () => {
        const data = [];
        this.RegularTestSelect.forEach(v => {
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
    this.phealthSrv.delRegularTestData({data: value}).subscribe(val => {
      this.clearData();
      this.initDailyTestData();
    });
  }
  // 选择文集
  public  selectFile(e): void {
    this.file = e.target.files[0];
    this.editRegularTest.patchValue({file: e.target.files[0].name});
  }

  // 分页点击事件
  public  archivePageEvent(e): void {
    this.archivePageNo = e;
    this.initDailyTestData();
  }
  // 显示修改重大危险源档案
  public  editRiskArchiveClcik(data): void {
    for (const key in JSON.parse(JSON.stringify(this.editRegularTest.value))) {
      const a = {};
      a[key] = data[key];
      this.editRegularTest.patchValue(a);
    }
    console.log();
    this.pathFile = data.annex;
    this.editRegularTest.patchValue({'file': data.annex.slice(data.annex.lastIndexOf('/') + 1, data.annex.length)});
    this.showEditRegularTestDialog = true;
  }
  public  clearData(): void {
    this.showEditRegularTestDialog = false;
    this.file = null;
    this.RegularTestSelect = [];
    this.editRegularTest.reset();
  }
  // 确定修改
  public  sureEditRegularTestClick(): void {
    if (this.editRegularTest.valid){
      const data = JSON.parse(JSON.stringify(this.editRegularTest.value));
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
          this.phealthSrv.addRegularTestData(formData).subscribe(val => {
            this.initDailyTestData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateRegularTestData(formData).subscribe(val => {
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
    this.phealthSrv.regularMonitoringExcelwrite().subscribe(res => {
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
        this.phealthSrv.regularMonitoringExcelImport(formData).subscribe(res => {
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
