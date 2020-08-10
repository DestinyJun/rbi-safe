import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Es, setDrapdownOptionList, setImageToFromData, setValueToFromValue} from '../../../../common/public/contents';
import {TroubleProcessService} from '../../../../common/services/trouble-process.service';
import {GlobalService} from '../../../../common/services/global.service';
import {DatePipe} from '@angular/common';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {UploadImageComponent} from '../../../../common/components/upload-image/upload-image.component';
import {LocalStorageService} from '../../../../common/services/local-storage.service';

@Component({
  selector: 'app-trouble-detail',
  templateUrl: './trouble-detail.component.html',
  styleUrls: ['./trouble-detail.component.scss']
})
export class TroubleDetailComponent implements OnInit {

  // @ts-ignore
  @ViewChild('upimg') ImageClear: UploadImageComponent;
  public addReport: FormGroup;
  public treeDialog: boolean;
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
  public rectificationEvaluate: string = ''; // 审核通过内容
  public showReViewDialog: boolean = false;
  public imageFiles: Array<File> = [];
  public addPlanFile: any;
  public addReportFile: any;
  public isHandle: boolean = false;
  public specifiedRectificationTime: any;
  public esDate: any = Es;
  public code: any;
  public revieLabelText: string = '整改评估';
  public isDownLoadStatus: boolean = false;
  public btnList: Array<object> = [];
  public btnTotalList: Array<object> = [];
  public processingStatus: string = '0'; // 6 为审核不通过
  public rectificationNoticeAnnex: string;
  public subMitReportData = {
    hidDangerCode: '',
    hidDangerGrade: '',
    hidTypeThing: '',
    hidTypePerson: '',
    hidTypeManage: '',
  };
  public hidTypeList: Array<object> = [
    {label: '人', value: 1, name: 'hidTypePerson'},
    {label: '管理', value: 1, name: 'hidTypeManage'},
    {label: '事物', value: 1, name: 'hidTypeThing'},
  ];
  public formData: FormData = new FormData();
  public hidFradeOption: Array<object> = [];
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private troubleSrv: TroubleProcessService,
    private globalSrv: GlobalService,
    private localSrv: LocalStorageService,
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
      // ifControlMeasures: new FormControl({value: '', disabled: true}, Validators.required), // 控制措施
      hidDangerContent: new FormControl({value: '', disabled: true}, Validators.required), // 隐患内容
      hidDangerGrade: new FormControl({value: '', disabled: false}, Validators.required), // 	隐患等级
      // ifRectificationPlan: new FormControl({value: '', disabled: true}, Validators.required), // 整改方案
      ifDeal: new FormControl({value: '', disabled: false}, Validators.required), // 是否处理
      organizationId: new FormControl({value: '', disabled: true}, Validators.required),
      organizationName: new FormControl({value: '', disabled: true}, Validators.required),
      beforeImg: new FormControl({value: '', disabled: true}, Validators.required), // 排查前图片
      hidType: new FormControl({value: '', disabled: false}, Validators.required),
      rectificationEvaluate: new FormControl({value: '', disabled: true}),
      rectificationOpinions: new FormControl({value: '', disabled: true}),
      // 处理的
      governanceFunds: new FormControl({value: '', disabled: false}), // 处理资金
      completionTime: new FormControl({value: '', disabled: false}), // 完成时间
      completionSituation: new FormControl({value: '', disabled: false}), // 完成情况
      afterImg: new FormControl({value: '', disabled: false}), // 排查后图片
      plan: new FormControl({value: '', disabled: false}), // 整改方案
      report: new FormControl({value: '', disabled: false}), // 验收报告
    });
    this.globalSrv.getHidConfigData({data: [{settingType: 'HID_GRADE'}, {settingType: 'HID_GRAE'}]}).subscribe(val => {
      this.hidFradeOption = setDrapdownOptionList(val.data.HID_GRADE);
      this.getTroubleDetail();
    });
  }
  // 获取详情数据
  public  getTroubleDetail(): void {
    this.troubleSrv.getTroubleDetailByCode({hidDangerCode: this.code}).subscribe(res => {

      this.btnList = this.btnTotalList = res.data.botton;
      this.processingStatus = res.data.hidDangerDO.processingStatus;
      const list = ['troubleshootingTime',  'hidDangerContent', 'hidDangerGrade',
        'ifDeal', 'organizationId', 'organizationName', 'className', 'companyName', 'workshopName', 'factoryName',
        'rectificationOpinions', 'rectificationEvaluate'];

      // 时间格式转换：2020.08.08转成2020-08-08
      list.forEach(attr => {
        let val = res.data.hidDangerDO[attr];
        if (attr.toString().indexOf('Time') > -1) {
          val = val.toString().replace(/\./g, '-');
        }
        this.addReport.patchValue({[attr]: val});
      });
      console.log(res);
      // 隐患类型
      this.specifiedRectificationTime = res.data.hidDangerDO.specifiedRectificationTime;
      const typeList = [];
      this.hidTypeList.forEach(val => {
        // @ts-ignore
        if (res.data.hidDangerDO[val.name] === 1){
          // @ts-ignore
          typeList.push(val.label);
        }
        this.localSrv.set('rectificationOpinions', res.data.hidDangerDO.rectificationOpinions);
      });
      this.addReport.patchValue({hidType: typeList});
      // 处理的图片
      res.data.beforImgs.forEach(val => {
        this.ImageOption.imgUrls.push(val.beforePicture);
      });
      this.rectificationNoticeAnnex = res.data.hidDangerDO.rectificationNoticeAnnex;
      if (this.addReport.value.ifDeal === '是'){
        this.isHandle = true;
        this.isDownLoadStatus = true;
        res.data.afterImgs.forEach(v => {
          this.ImageOptionAfter.imgUrls.push(v.afterPicture);
        });
        this.ImageOptionAfter.showUploadIcon = false;
        const lists = ['governanceFunds', 'completionTime', 'completionSituation'];
        // 时间格式转换：2020.08.08转成2020-08-08
        lists.forEach(attr => {
          let val = res.data.hidDangerDO[attr];
          if (attr.toString().indexOf('Time') > -1 ) {
            val = val.toString().replace(/\./g, '-');
          }
          this.addReport.patchValue({[attr]: val});
        });
        this.setFileInfo(res.data.hidDangerDO);
      }
      // else {
      //   this.btnTotalList.forEach(val => {
      //     // @ts-ignore
      //     if (val.botton !== '完成整改'){
      //       this.btnList.push(val);
      //     }
      //   });
      // }
    });
  }

  public  setFileInfo(data): void {
    this.addPlanFile = data.rectificationPlan;
    this.addReportFile = data.acceptanceReport;
    // 截取文件名称
    this.addReport.patchValue({report: data.acceptanceReport ?
        data.acceptanceReport.slice(data.acceptanceReport.lastIndexOf('/') + 1,
          data.acceptanceReport.length)  : '' });
    this.addReport.patchValue({plan: data.rectificationPlan ?
        data.rectificationPlan.slice(data.rectificationPlan.lastIndexOf('/') + 1,
          data.rectificationPlan.length) : ''});
  }
  // 返回上一级
  public backPreviouClick(): void {
    history.go(-1);
  }
  // 判断是否处理
  public  selectHandleType(e): void {
    this.btnList = [];

    this.isHandle = e === 1;
    if (e === 1){
      this.btnList.push({botton: '完成整改'});
    }else {
      this.btnTotalList.forEach(val => {
        // @ts-ignore
        if (val.botton !== '完成整改'){
          this.btnList.push(val);
        }
      });
    }
    const paraList = ['governanceFunds', 'completionTime', 'completionSituation', 'afterImg'];
    if ( e === 1){
      // 如果是处理 则设置处理的参数未必填
      paraList.forEach(val => {
        this.addReport.controls[val].setValidators(Validators.required);
      });
    }else {
      paraList.forEach(val => {
        this.addReport.controls[val].setValidators(null);
        // this.addReport.controls[val].setValue('');
      });
    }
  }

  // 选择图片文件
  public  selectImageFile(e, data): void {
    this.imageFiles = e.value.files;
    const formVaue = {};
    formVaue[data] =  this.imageFiles;
    this.addReport.patchValue(formVaue);
  }

  public  submitClcik(e): void {
    switch (e) {
      case '完成整改': this.compelteReportClick(); break;
      case '通知整改': this.noticeToRectifyClick(); break;
      case '审核通过': this.showReViewDialog = true; this.revieLabelText = '整改评估'; break;
      case '审核不通过': this.showReViewDialog = true; this.revieLabelText = '审核原因'; break;
      case '上报处理': this.submitReportToSuperiorClick(); break;
      case '查看责令通知书': this.downLoadFileClick(); break;
    }
  }

  // 下载文件
  public  downLoadFile(e): void {
      if (e === 'plan'){
        if (this.addPlanFile){
          window.open(this.addPlanFile);
        }else {
          this.toolSrv.setToast('error', '下载失败', '文件数据为空');
        }
      }else {
        if (this.addReportFile){
          window.open(this.addReportFile);
        }else {
          this.toolSrv.setToast('error', '下载失败', '文件数据为空');
        }
    }
  }


  public  selectFile(e, name): void {
    const fromObj = {};
    fromObj[name] = e.target.files[0].name;
    this.addReport.patchValue(fromObj);
    if (name === 'plan'){
      this.addPlanFile = e.target.files[0];
    }else {
      this.addReportFile = e.target.files[0];
    }
  }
  // 完成整改
  public compelteReportClick(): void {
    if (this.addReport.valid){
      // console.log(this.addReport.value.hidType);
      this.formData = new FormData();
      this.formData.append('hidDangerCode', this.code);
      setImageToFromData(this.addReport, 'afterImg', this.formData);
      const subMitDta = JSON.parse(JSON.stringify(this.addReport.value));
      subMitDta.completionTime = this.datePipe.transform(subMitDta.completionTime, 'yyyy-MM-dd');
      this.setDataConvertToFromData(subMitDta);
      this.toolSrv.setConfirmation('完成整改', '完成整改', () => {
         this.troubleSrv.completeTrouble(this.formData).subscribe(val => {
            this.resetAllData();
            this.isHandle = false;
            this.router.navigate(['home/trouble/process/list']);
            // this.getTroubleDetail();
         });
      });
    }else {
      this.toolSrv.setToast('error', '操作错误', '带星号的参数未填写完整');
    }
  }
  // 通知整改
  public  noticeToRectifyClick(): void {
     this.localSrv.setObject('hidType', this.addReport.value.hidType);
     this.router.navigate(['home/trouble/process/notice'], {queryParams: {code: this.code, time: this.specifiedRectificationTime, grade: this.addReport.value.hidDangerGrade}});
  }
  // 上报处理
  public  submitReportToSuperiorClick(): void {
    this.toolSrv.setConfirmation('上报处理', '上报处理', () => {
      // const data =
      this.subMitReportData.hidDangerCode = this.code;
      this.subMitReportData.hidDangerGrade = this.addReport.value.hidDangerGrade;
      this.addReport.value.hidType.forEach(val => {
        switch (val) {
          case '人': this.subMitReportData.hidTypePerson = '1'; break;
          case '管理': this.subMitReportData.hidTypeManage = '1'; break;
          case '事物': this.subMitReportData.hidTypeThing = '1'; break;
        }
      });
      this.troubleSrv.submitReportToSuperior(this.subMitReportData).subscribe(val => {
        this.resetAllData();
        this.isHandle = false;
        this.router.navigate(['home/trouble/process/list']);
        // this.getTroubleDetail();
      });
    });
  }

  // 查看责令通知书
  public  downLoadFileClick(): void {
      if (this.rectificationNoticeAnnex){
        window.open(this.rectificationNoticeAnnex);
      }else {
        this.toolSrv.setToast('error', '操作失败', '文件不存在');
      }
  }

  // 重置数据
  private resetAllData(): void{
    this.addReport.reset();
    this.ImageClear.clearImage();
    this.isDownLoadStatus = false;
    this.showReViewDialog = false;
    this.rectificationEvaluate = '';
    this.isHandle = false;
    this.revieLabelText = '整改评估';
  }
  // 转换json对象为formdata 对象
  private setDataConvertToFromData(data): void{
    for (const key in data) {
      if (key === 'report' || key === 'plan') {
        this.formData.append(key, key === 'plan' ? (this.addPlanFile === undefined ? '' : this.addPlanFile) : (this.addReportFile === undefined ? '' : this.addReportFile));
      } else if (key === 'hidType') {
        this.formData.append('hidTypeThing', '');
        this.formData.append('hidTypePerson', '');
        this.formData.append('hidTypeManage', '');
        data[key].forEach(val => {
          switch (val) {
            case '人':
              this.formData.set('hidTypeThing', '1');
              break;
            case '事物':
              this.formData.set('hidTypePerson', '1');
              break;
            case '管理':
              this.formData.set('hidTypeManage', '1');
              break;
          }
        });
      } else if (key !== 'afterImg') {
        this.formData.append(key, data[key]);
      }
    }
  }
  // 审核通过
  public  reviewToPassClick(): void {
      if (this.rectificationEvaluate !== ''){
        if (this.revieLabelText === '整改评估'){
          this.toolSrv.setConfirmation('审核通过', '审核通过', () => {
            const reviewData = this.setData();
            this.troubleSrv.reviewToPass(reviewData).subscribe(val => {
              this.resetAllData();
              this.router.navigate(['home/trouble/process/list']);
            });
          });
        }else {
          this.reviewNoToPassClick();
        }
      }else {
        this.toolSrv.setToast('error', '操作错误', '带星号的参数未填写完整');
      }
  }
// 审核不通过
  public  reviewNoToPassClick(): void {
    this.toolSrv.setConfirmation('审核不通过', '审不核通过', () => {
      const reviewData = this.setData();
      this.troubleSrv.reviewNoToPass(reviewData).subscribe(val => {
        this.resetAllData();
        this.router.navigate(['home/trouble/process/list']);
      });
    });
  }

  public  setData(): any {
    const reviewData = {
      hidDangerCode: '', rectificationEvaluate: '', hidDangerGrade: '', hidTypeThing: '', hidTypePerson: '', hidTypeManage: '',
    };
    reviewData.hidDangerCode = this.code;
    reviewData.rectificationEvaluate = this.rectificationEvaluate;
    reviewData.hidDangerGrade = this.addReport.value.hidDangerGrade;
    this.addReport.value.hidType.forEach(val => {
      switch (val) {
        case '人': reviewData.hidTypePerson = '1'; break;
        case '管理': reviewData.hidTypeManage = '1'; break;
        case '事物': reviewData.hidTypeThing = '1'; break;
      }
    });
    return reviewData;
  }
}
