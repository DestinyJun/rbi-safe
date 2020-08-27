import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pr-health-check',
  templateUrl: './pr-health-check.component.html',
  styleUrls: ['./pr-health-check.component.scss']
})
export class PrHealthCheckComponent implements OnInit {

  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public healthCheckSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showeditHealthCheckDialog: boolean = false;
  public HealthCheckTitle: Array<object>  = [
    { field: 'organization', header: '组织' },
    { field: 'unitName', header: '单位名称' },
    { field: 'name', header: '姓名' },
    { field: 'gender', header: '性别' },
    { field: 'age', header: '年龄' },
    { field: 'marriage', header: '婚否' },
    { field: 'phone', header: '电话' },
    { field: 'idNum', header: '身份证号' },
    { field: 'factor', header: '危害因素' },
    { field: 'workType', header: '工种' },
    { field: 'deadline', header: '期限' },
    { field: 'reserveTime', header: '预约日期' },
    { field: 'workTime', header: '上岗时间' },
    { field: 'leaveTime', header: '离岗时间' },
    { field: 'remark', header: '备注' },
    { field: 'operating', header: '操作' },
  ];
  public HealthCheckContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editHealthCheck: FormGroup;
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
  constructor(
    private toolSrv: PublicMethodService,
    private phealthSrv: ProfessHealthService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) { }
  ngOnInit() {
    this.initHygieneData();
    this.editHealthCheck = this.fb.group(
      {
        id: new FormControl(''),
        organization: new FormControl('', Validators.required),
        unitName: new FormControl('', Validators.required),
        name: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        age: new FormControl('', Validators.required),
        marriage: new FormControl('', Validators.required),
        phone: new FormControl('', Validators.pattern(/^1[345678]\d{9}$/)),
        idNum: new FormControl('', Validators.required),
        factor: new FormControl('', Validators.required),
        workType: new FormControl('', Validators.required),
        deadline: new FormControl('', Validators.required),
        reserveTime: new FormControl('', Validators.required),
        workTime: new FormControl('', Validators.required),
        leaveTime: new FormControl('', Validators.required),
        remark: new FormControl('', Validators.required),
      }
    );
  }

  // 初始化分页数据
  public  initHygieneData(): void {
    this.phealthSrv.getHealthCheckPageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      console.log(val);
      this.HealthCheckContent = val.data.contents;
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
    if (this.healthCheckSelect.length > 0){
      this.toolSrv.setConfirmation('删除', `删除这${this.healthCheckSelect.length}项`, () => {
        const data = [];
        this.healthCheckSelect.forEach(v => {
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
    this.phealthSrv.delHealthCheckData({data: value}).subscribe(val => {
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
    for (const key in JSON.parse(JSON.stringify(this.editHealthCheck.value))) {
      const a = {};
      a[key] = data[key];
      this.editHealthCheck.patchValue(a);
    }
    this.showeditHealthCheckDialog = true;
  }
  public  clearData(): void {
    this.showeditHealthCheckDialog = false;
    this.healthCheckSelect = [];
    this.editHealthCheck.reset();
  }
  // 确定修改
  public  sureeditHealthCheckClick(): void {
    console.log(this.editHealthCheck.value);
    if (this.editHealthCheck.valid){
      const data = JSON.parse(JSON.stringify(this.editHealthCheck.value));
      data.workTime = this.datePipe.transform(data.workTime, 'yyyy-MM-dd');
      data.leaveTime = this.datePipe.transform(data.leaveTime, 'yyyy-MM-dd');
      data.reserveTime = this.datePipe.transform(data.reserveTime, 'yyyy-MM-dd');
      if (data.id === '' || data.id === null){
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addHealthCheckData(data).subscribe(val => {
            this.initHygieneData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateHealthCheckData(data).subscribe(val => {
            this.initHygieneData();
            this.clearData();
          });
        });
      }
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整或数据格式类型不对');
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
        this.phealthSrv.healthExamineExcelImport(formData).subscribe(res => {
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
