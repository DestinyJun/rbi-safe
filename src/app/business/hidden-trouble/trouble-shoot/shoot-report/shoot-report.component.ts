import {Component, OnInit, ViewChild} from '@angular/core';
import {Es, initializeTree, setDrapdownOptionList, setImageToFromData} from '../../../../common/public/contents';
import {UploadImageComponent} from '../../../../common/components/upload-image/upload-image.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GlobalService} from '../../../../common/services/global.service';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {DatePipe} from '@angular/common';
import {TroubleShootService} from '../../../../common/services/trouble-shoot.service';

@Component({
  selector: 'app-shoot-report',
  templateUrl: './shoot-report.component.html',
  styleUrls: ['./shoot-report.component.scss']
})
export class ShootReportComponent implements OnInit {

  // @ts-ignore
  @ViewChild('upimg') ImageClear: UploadImageComponent;
  // @ts-ignore
  @ViewChild('upimgafter') ImageClearAfter: UploadImageComponent;
  public esDate: any = Es;
  public ImageOption = {
    files: [],
    showUploadIcon: true,
    imgUrls: []
  };
  public ImageOptionAfter = {
    files: [],
    showUploadIcon: true,
    imgUrls: []
  };
  public hidFradeOption: any[] = [];
  public isHandle: boolean = false;
  // private parasAddReport: Array<string> = [
  //   'troubleshootingTime', 'ifControlMeasures', 'hidDangerContent'
  // ];
  private formData: FormData = new FormData();

  // @ts-ignore
  public imageFiles: any[] = []; // 图片列表
  // public fileList: any[] = []; // 文件列表
  public addPlanFile: File;
  public addReportFile: File;
  public OrgTrees: any;
  public OrgTree: any;
  public treeDialog: boolean;
  // 上报
  public addReport: FormGroup;
  constructor(
    private fb: FormBuilder,
    private globalSrv: GlobalService,
    private toolSrv: PublicMethodService,
    private datePipe: DatePipe,
    private shootSrv: TroubleShootService
  ) { }


  ngOnInit() {
    this.addReport = this.fb.group({
      troubleshootingTime: new FormControl('', Validators.required), // 排查时间
      // ifControlMeasures: new FormControl('无', Validators.required), // 控制措施
      hidDangerContent: new FormControl('', Validators.required), // 隐患内容
      hidDangerGrade: new FormControl('', Validators.required), // 	隐患等级
      // ifRectificationPlan: new FormControl('无', Validators.required), // 整改方案
      ifDeal: new FormControl('否', Validators.required), // 是否处理
      organizationId: new FormControl('', Validators.required),
      organizationName: new FormControl('', Validators.required),
      beforeImg: new FormControl('', Validators.required), // 排查前图片
      hidType: new FormControl([], Validators.required),
      // 处理的
      governanceFunds: new FormControl(''), // 处理资金
      completionTime: new FormControl(''), // 完成时间
      completionSituation: new FormControl(''), // 完成情况
      afterImg: new FormControl(''), // 排查后图片
      plan: new FormControl(''), // 整改方案
      report: new FormControl(''), // 验收报告
    });
    this.initShootReportData();
    console.log(this.addReport);
  }

  // 初始化下拉框信息
  public  initShootReportData(): void {
    this.getOrgTreeData();
    this.globalSrv.getHidConfigData({data: [{settingType: 'HID_GRADE'}]}).subscribe(val => {
        this.hidFradeOption = setDrapdownOptionList(val.data.HID_GRADE);
      });
  }
  // 获取树结构数据
  public getOrgTreeData(): void {
      this.globalSrv.getOrgazitionTreeData({}).subscribe(value => {
        this.OrgTrees = initializeTree(
          value.data ? value.data : [],
          {labelName: 'organizationName', childrenName: 'chiled'}
        );
      });
  }
  // 选择图片文件
  public  selectImageFile(e, data): void {
    console.log(e);
     this.imageFiles = e.value.files;
     const formVaue = {};
     formVaue[data] =  this.imageFiles;
     this.addReport.patchValue(formVaue);
  }
  // 提交
  public submitClcik(): void {
    console.log(this.addReport.value);
    if (this.addReport.valid){
      this.formData = new FormData();
      setImageToFromData(this.addReport, 'beforeImg', this.formData);
      setImageToFromData(this.addReport, 'afterImg', this.formData);
      // 判断是否上报处理
      if (this.addReport.get('ifDeal').value === '否') {
        // 清楚数据
        const paraList = ['governanceFunds', 'completionTime', 'completionSituation', 'afterImg', 'plan', 'report'];
        paraList.forEach(val => {
          this.addReport.controls[val].setValue('');
        });
      }
      const subMitDta = JSON.parse(JSON.stringify(this.addReport.value));
      subMitDta.troubleshootingTime = this.datePipe.transform( subMitDta.troubleshootingTime, 'yyyy-MM-dd');
      if (subMitDta.completionTime){
        subMitDta.completionTime = this.datePipe.transform(subMitDta.completionTime, 'yyyy-MM-dd');
      }
      this.setDataConvertToFromData(subMitDta);
      this.toolSrv.setConfirmation('上报整改', '上报整改', () => {
        this.shootSrv.addReportData(this.formData).subscribe(val => {
          this.resetAllData();
          this.isHandle = false;
          this.toolSrv.setToast('info', '提示', '上报整改成功');
        });
      });
    }else {
      this.toolSrv.setToast('error', '提交错误', '参数未填写完整');
    }
  }
  //
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

  // 判断是否处理
  public  selectHandleType(e): void {
    this.isHandle = e === 1;
    const paraList = ['governanceFunds', 'completionTime', 'completionSituation', 'afterImg', 'plan', 'report'];
    if ( e === 1){
      // 如果是处理 则设置处理的参数未必填
      paraList.forEach(val => {
        if (val !== 'plan' && val !== 'report') {
          this.addReport.controls[val].setValidators(Validators.required);
        }
      });
    }else {
      paraList.forEach(val => {
        this.addReport.controls[val].setValidators(null);
        this.addReport.controls[val].setErrors(null);
      });
    }
    console.log(this.addReport);
  }

  private resetAllData(): void {
    this.addReport.reset();
    this.ImageClear.clearImage();
    if (this.ImageClearAfter) {
      this.ImageClearAfter.clearImage();
    }
  }

  public dataTreeSureClick(): void {
    // console.log(this.OrgTree);
    this.treeDialog = false;
    // this.addReport.registerControl()
    this.addReport.patchValue({'organizationName': this.OrgTree.label});
    this.addReport.patchValue({'organizationId': this.OrgTree.id});
  }

  private setDataConvertToFromData(data): void{
    for (const key in data){
      if (key === 'plan' || key === 'report'){
        this.formData.append(key, key === 'plan' ? (this.addPlanFile === undefined ? '' : this.addPlanFile) : (this.addReportFile === undefined ? '' : this.addReportFile));
      }else if (key === 'hidType') {
        this.formData.append('hidTypeThing', '');
        this.formData.append('hidTypePerson', '');
        this.formData.append('hidTypeManage', '');
        data[key].forEach(val => {
          switch (val) {
            case '人': this.formData.set('hidTypePerson', '1'); break;
            case '事物': this.formData.set('hidTypeThing', '1'); break;
            case '管理': this.formData.set('hidTypeManage', '1'); break;
          }
        });
      } else if (key !== 'beforeImg' && key !== 'afterImg') {
        this.formData.append(key, data[key]);
      }
    }
  }
}
