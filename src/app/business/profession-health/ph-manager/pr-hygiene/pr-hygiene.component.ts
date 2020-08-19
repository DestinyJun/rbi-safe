import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pr-hygiene',
  templateUrl: './pr-hygiene.component.html',
  styleUrls: ['./pr-hygiene.component.scss']
})
export class PrHygieneComponent implements OnInit {
  public table = {
    tableheader: {background: '#F5F6FA', color: '#333333'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public dialyTestSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showeditHygieneDialog: boolean = false;
  public hygieneTitle: Array<object>  = [
    { field: 'healthProjectName', header: '项目名称' },
    { field: 'healthProjectType', header: '项目类型' },
    { field: 'healthProjectInvestment', header: '项目投资' },
    { field: 'healthProjectDuration', header: '项目建设工期' },
    { field: 'healthProjectDanger', header: '存在主要职业病危害因素' },
    { field: 'healthProjectEvaluateTime', header: '预评价时间' },
    { field: 'healthProjectEvaluateOrganization', header: '预评价单位' },
    { field: 'healthProjectEvaluateConclusion', header: '预评价结论' },
    { field: 'healthProjectDesignTime', header: '设施设计时间' },
    { field: 'healthProjectDesignOrganization', header: '设施设计单位' },
    { field: 'healthProjectDesignConclusion', header: '设施设计结论' },
    { field: 'healthProjectCheckTime', header: '竣工验收时间' },
    { field: 'healthProjectCheckOrganization', header: '竣工验收单位' },
    { field: 'healthProjectCheckConclusion', header: '竣工验收结论' },
    { field: 'healthProjectResultTime', header: '控制效果评价时间' },
    { field: 'healthProjectResultOrganization', header: '控制效果评价单位' },
    { field: 'healthProjectResultConclusion', header: '控制效果评价结论' },
    { field: 'operating', header: '操作' },
  ];
  public hygieneContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editHygiene: FormGroup;
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
    this.editHygiene = this.fb.group(
      {
        id: new FormControl(''),
        healthProjectName: new FormControl('', Validators.required),
        healthProjectType: new FormControl('', Validators.required),
        healthProjectInvestment: new FormControl('', Validators.required),
        healthProjectDuration: new FormControl('', Validators.required),
        healthProjectDanger: new FormControl('', Validators.required),
        healthProjectEvaluateTime: new FormControl('', Validators.required),
        healthProjectEvaluateOrganization: new FormControl('', Validators.required),
        healthProjectEvaluateConclusion: new FormControl('', Validators.required),
        healthProjectDesignTime: new FormControl('', Validators.required),
        healthProjectDesignOrganization: new FormControl('', Validators.required),
        healthProjectDesignConclusion: new FormControl('', Validators.required),
        healthProjectCheckTime: new FormControl('', Validators.required),
        healthProjectCheckOrganization: new FormControl('', Validators.required),
        healthProjectCheckConclusion: new FormControl('', Validators.required),
        healthProjectResultTime: new FormControl('', Validators.required),
        healthProjectResultOrganization: new FormControl('', Validators.required),
        healthProjectResultConclusion: new FormControl('', Validators.required),
      }
    );
  }

  // 初始化分页数据
  public  initHygieneData(): void {
    this.phealthSrv.getHygienePageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      this.hygieneContent = val.data.contents;
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
          data.push(v.id);
        });
        this.delDataRequest(data.join(','));
      });
    }else {
      this.toolSrv.setToast('error', '操作错误', '请选择需要删除的项');
    }
  }
  // 删除请求
  public  delDataRequest(value): void {
    this.phealthSrv.delHygieneData({ids: value}).subscribe(val => {
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
    for (const key in JSON.parse(JSON.stringify(this.editHygiene.value))) {
      const a = {};
      a[key] = data[key];
      this.editHygiene.patchValue(a);
    }
    this.showeditHygieneDialog = true;
  }
  public  clearData(): void {
    this.showeditHygieneDialog = false;
    this.dialyTestSelect = [];
    this.editHygiene.reset();
  }
  // 确定修改
  public  sureeditHygieneClick(): void {
    if (this.editHygiene.valid){
      const data = JSON.parse(JSON.stringify(this.editHygiene.value));
      data.healthProjectEvaluateTime = this.datePipe.transform(data.healthProjectEvaluateTime, 'yyyy-MM-dd');
      data.healthProjectDesignTime = this.datePipe.transform(data.healthProjectDesignTime, 'yyyy-MM-dd');
      data.healthProjectCheckTime = this.datePipe.transform(data.healthProjectCheckTime, 'yyyy-MM-dd');
      data.healthProjectResultTime = this.datePipe.transform(data.healthProjectResultTime, 'yyyy-MM-dd');
      if (data.id === '' || data.id === null){
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addHygieneData(data).subscribe(val => {
            this.initHygieneData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateHygieneData(data).subscribe(val => {
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
        this.phealthSrv.healthProjectExcelImport(formData).subscribe(res => {
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

  public export(): void {
      this.phealthSrv.healthProjectExcelwrite().subscribe(res => {
        window.open(res.data.path);
      });
  }
}
