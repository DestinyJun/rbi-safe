import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Es, initializeTree, setDrapdownOptionList, setImageToFromData} from '../../../../common/public/contents';
import {GlobalService} from '../../../../common/services/global.service';
import {SecurityRiskService} from '../../../../common/services/security-risk.service';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {UploadImageComponent} from '../../../../common/components/upload-image/upload-image.component';
import {DatePipe} from '@angular/common';
import {AddSRRisk} from '../../../../common/public/Api';

@Component({
  selector: 'app-area-within',
  templateUrl: './area-within.component.html',
  styleUrls: ['./area-within.component.scss']
})
export class AreaWithinComponent implements OnInit {
  // @ts-ignore
  @ViewChild('upimg') ImageClear: UploadImageComponent;
  public addWithinRisk: FormGroup;
  public treeDialog: any;
  public OrgTrees: any;
  public OrgTree: any;
  public esDate: any = Es;
  public riskKindOption: Array<object> = [];
  public riskCategoryOption: Array<object> = [];
  public addWidthin: AddSRRisk = new AddSRRisk();
  public noRequiredControls = ['adviceMeasures', 'measuresEffective', 'measuresCost', 'measuresResult', 'measuresUse', 'picture'];
  public ImageOption = {
    files: [],
    showUploadIcon: true,
    imgUrls: []
  };
  public consequenceValues = [{label: 1, value: 1}, {label: 5, value: 5}, {label: 15, value: 15}, {label: 25, value: 25}, {label: 50, value: 50}, {label: 100, value: 100}];
  public exposeValues = [{label: 0.5, value: 0.5}, {label: 1, value: 1}, {label: 2, value: 2}, {label: 3, value: 3}, {label: 6, value: 6}, {label: 10, value: 10}];
  public possibilityValues = [{label: 0.1, value: 0.1}, {label: 0.5, value: 0.5}, {label: 1, value: 1}, {label: 3, value: 3}, {label: 6, value: 6}, {label: 10, value: 10}];
  public measuresEffectiveValues = [{label: 1, value: 1}, {label: 2, value: 2}, {label: 3, value: 3}, {label: 4, value: 4}, {label: 6, value: 6}];
  public measuresCostValues = [{label: 0.5, value: 0.5}, {label: 1, value: 1}, {label: 2, value: 2}, {label: 3, value: 3}, {label: 4, value: 4}, {label: 6, value: 6}, {label: 10, value: 10}];

  constructor(
    private fb: FormBuilder,
    private globalSrv: GlobalService,
    private secRiskSrv: SecurityRiskService,
    private toolSrv: PublicMethodService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit() {
    const data = {};
    for (const key in this.addWidthin){
      if (this.noRequiredControls.indexOf(key) < 0){
        data[key] =  new FormControl('', Validators.required);
      }else {
        data[key] =  new FormControl('');
      }
    }
    this.addWithinRisk = this.fb.group(data);
    this.initRiskAreaWidtinData();
  }
  // 初始化下拉框信息
  public  initRiskAreaWidtinData(): void {
    this.getOrgTreeData();
    this.globalSrv.getHidConfigData({data: [{settingType: 'RISK_CATEGOTY'}, {settingType: 'HARM_KIND'}]}).subscribe(val => {
      this.riskKindOption = setDrapdownOptionList(val.data.HARM_KIND);
      this.riskCategoryOption = setDrapdownOptionList(val.data.RISK_CATEGOTY);
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
  public selectImageFile(e): void {
    this.addWithinRisk.patchValue({picture: e.value.files});
    // console.log(e);
  }

  public  submitClcik(): void {
    console.log(this.addWithinRisk.value);
    if (this.addWithinRisk.valid){
      if (this.addWithinRisk.value.picture.length <= 6){
        this.toolSrv.setConfirmation('提交', '提交', () => {
          const formData = new FormData();
          setImageToFromData(this.addWithinRisk, 'picture', formData);
          const subData = JSON.parse(JSON.stringify(this.addWithinRisk.value));
          subData.evaluateTime = this.datePipe.transform(subData.evaluateTime, 'yyyy-MM-dd');
          for (const key in subData){
            if (key !== 'picture'){
              formData.append(key, subData[key]);
            }
          }
          this.secRiskSrv.addWithInAreaRisk(formData).subscribe(res => {
            this.addWithinRisk.reset();
            this.ImageClear.clearImage();
            // this.
          });
        });
      }else {
        this.toolSrv.setToast('error', '添加错误', '图片最多添加6张上传');
      }
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }
  public  dataTreeSureClick(): void {
    this.treeDialog = false;
    this.addWithinRisk.patchValue({'organizationName': this.OrgTree.label});
    this.addWithinRisk.patchValue({'organizationId': this.OrgTree.id});
  }
  // 计算风险值
  public  calcRiskValue(): void {
    if (this.addWithinRisk.value.possibility !== '' && this.addWithinRisk.value.consequence !== '' && this.addWithinRisk.value.expose !== ''){
      this.secRiskSrv.calcRiskValue({consequence: this.addWithinRisk.value.consequence, expose: this.addWithinRisk.value.expose, possibility: this.addWithinRisk.value.possibility}).subscribe(val => {
        this.addWithinRisk.patchValue({riskValue: val.data.riskValue});
        this.addWithinRisk.patchValue({riskGrad: val.data.riskGrad});
      });
    }
  }
 // 计算措施判断结果
  public calcMeasuresResult(): void {
    if (this.addWithinRisk.value.riskValue !== '' && this.addWithinRisk.value.measuresCost !== '' && this.addWithinRisk.value.measuresEffective !== ''){
      this.secRiskSrv.calcRiskMeasuresResult({riskValue: this.addWithinRisk.value.riskValue, measuresCost: this.addWithinRisk.value.measuresCost, measuresEffective: this.addWithinRisk.value.measuresEffective}).subscribe(val => {
        this.addWithinRisk.patchValue({measuresResult: val.data.measuresResult});
      });
    }
  }
}
