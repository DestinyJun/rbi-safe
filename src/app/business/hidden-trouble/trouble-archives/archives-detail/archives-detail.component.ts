import {Component, OnInit, ViewChild} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {TroubleProcessService} from '../../../../common/services/trouble-process.service';
import {GlobalService} from '../../../../common/services/global.service';
import {DatePipe} from '@angular/common';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {UploadImageComponent} from '../../../../common/components/upload-image/upload-image.component';
import {Es, setDrapdownOptionList, setValueToFromValue} from '../../../../common/public/contents';

@Component({
  selector: 'app-archives-detail',
  templateUrl: './archives-detail.component.html',
  styleUrls: ['./archives-detail.component.scss']
})
export class ArchivesDetailComponent implements OnInit {
  // @ts-ignore
  @ViewChild('upimg') ImageClear: UploadImageComponent;
  public addReport: FormGroup;
  public ImageOption = {
    files: [],
    showUploadIcon: false,
    imgUrls: []
  };
  public ImageOptionAfter = {
    files: [],
    showUploadIcon: true,
    imgUrls: []
  };
  public hidTypeList: Array<object> = [
    {label: '人', value: 1, name: 'hidTypePerson'},
    {label: '管理', value: 1, name: 'hidTypeManage'},
    {label: '事物', value: 1, name: 'hidTypeThing'},
  ];
  public hidFradeOption: Array<object> = [];
  public esDate: any = Es;
  public addPlanFile: any;
  public addReportFile: any;
  public rectificationNoticeAnnex: any;
  public isHandle: boolean = false;
  public code: any = '';
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private troubleSrv: TroubleProcessService,
    private globalSrv: GlobalService,
    private datePipe: DatePipe,
    private toolSrv: PublicMethodService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      this.code = val.code;
    });
    this.addReport = this.fb.group({
      troubleshootingTime: new FormControl({value: '', disabled: true}, Validators.required),
      companyName: new FormControl({value: '', disabled: true}, Validators.required), // 公司名称
      workshopName: new FormControl({value: '', disabled: true}, Validators.required), // 车间名字
      className: new FormControl({value: '', disabled: true}, Validators.required), // 班主名称
      factoryName: new FormControl({value: '', disabled: true}, Validators.required), // 工厂名称
      ifControlMeasures: new FormControl({value: '', disabled: true}, Validators.required), // 控制措施
      hidDangerContent: new FormControl({value: '', disabled: true}, Validators.required), // 隐患内容
      hidDangerGrade: new FormControl({value: '', disabled: true}, Validators.required), // 	隐患等级
      ifRectificationPlan: new FormControl({value: '', disabled: true}, Validators.required), // 整改方案
      ifDeal: new FormControl({value: '', disabled: true}, Validators.required), // 是否处理
      organizationId: new FormControl({value: '', disabled: true}, Validators.required),
      organizationName: new FormControl({value: '', disabled: true}, Validators.required),
      beforeImg: new FormControl({value: '', disabled: true}, Validators.required), // 排查前图片
      hidType: new FormControl({value: '', disabled: true}, Validators.required),
      rectificationOpinions: new FormControl({value: '', disabled: true}),
      rectificationNoticeAnnex: new FormControl({value: '', disabled: true}),
      // 处理的
      governanceFunds: new FormControl({value: '', disabled: true}), // 处理资金
      completionTime: new FormControl({value: '', disabled: true}), // 完成时间
      completionSituation: new FormControl({value: '', disabled: true}), // 完成情况
      rectificationEvaluate: new FormControl({value: '', disabled: true}), // 完成情况
      afterImg: new FormControl({value: '', disabled: true}), // 排查后图片
      plan: new FormControl({value: '', disabled: true}), // 整改方案
      report: new FormControl({value: '', disabled: true}), // 验收报告
    });
    this.globalSrv.getHidConfigData({data: [{settingType: 'HID_GRADE'}, {settingType: 'HID_GRAE'}]}).subscribe(val => {
      console.log(val);
      this.hidFradeOption = setDrapdownOptionList(val.data.HID_GRADE);
      this.getArchiveDetail();
    });
  }

  // 返回上一级
  public backPreviouClick(): void {
    history.go(-1);
  }

  public  getArchiveDetail(): void {
     this.troubleSrv.getTroubleArchiveDetailByCode({hidDangerCode: this.code}).subscribe(val => {
        console.log(val);
        const list = ['troubleshootingTime', 'ifControlMeasures', 'hidDangerContent', 'hidDangerGrade', 'ifRectificationPlan',
          'ifDeal', 'organizationId', 'organizationName', 'governanceFunds', 'completionTime', 'completionSituation', 'rectificationOpinions',
          'companyName', 'workshopName', 'className', 'factoryName'];
        setValueToFromValue(list, val.data.hidDangerDO, this.addReport);
        const typeList = [];
        this.hidTypeList.forEach(res => {
          if (val.data.hidDangerDO[res['name']] === 1){
             typeList.push(res['label']);
           }
        });
        this.addReport.patchValue({hidType: typeList});
         // 处理的图片
        val.data.beforImgs.forEach(v => {
           this.ImageOption.imgUrls.push(v.beforePicture);
        });
       if (this.addReport.value['ifDeal'] === '是'){
         this.isHandle = true;
         val.data.afterImgs.forEach(v => {
           this.ImageOptionAfter.imgUrls.push(v.afterPicture);
         });
         this.ImageOptionAfter.showUploadIcon = false;
         const lists = ['governanceFunds', 'completionTime', 'completionSituation', 'rectificationEvaluate'];
         setValueToFromValue(lists, val.data.hidDangerDO, this.addReport);
         this.setFileInfo(val.data.hidDangerDO);
       }
     });
  }
  public  setFileInfo(data): void {
    this.addPlanFile = data['rectificationPlan'];
    this.addReportFile = data['acceptanceReport'];
    this.rectificationNoticeAnnex = data['rectificationNoticeAnnex'];
    // 截取文件名称
    this.addReport.patchValue({report: data['acceptanceReport'] ?
        data['acceptanceReport'].slice(data['acceptanceReport'].lastIndexOf('/') + 1,
          data['acceptanceReport'].length)  : '' });
    this.addReport.patchValue({plan: data['rectificationPlan'] ?
        data['rectificationPlan'].slice(data['rectificationPlan'].lastIndexOf('/') + 1,
          data['rectificationPlan'].length) : ''});
    this.addReport.patchValue({rectificationNoticeAnnex: data['rectificationNoticeAnnex'] ?
        data['rectificationNoticeAnnex'].slice(data['rectificationNoticeAnnex'].lastIndexOf('/') + 1,
          data['rectificationNoticeAnnex'].length) : ''});
  }

  // 下载文件
  public  downLoadFile(e): void {
    if (this[e]){
      window.open(this[e]);
    }else {
      this.toolSrv.setToast('error', '下载失败', '文件数据为空');
    }
  }
}
