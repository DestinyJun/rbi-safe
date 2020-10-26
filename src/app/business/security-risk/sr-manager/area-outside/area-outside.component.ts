import {Component, OnInit, ViewChild} from '@angular/core';
import {UploadImageComponent} from '../../../../common/components/upload-image/upload-image.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Es, initializeTree, setDrapdownOptionList, setImageToFromData} from '../../../../common/public/contents';
import {GlobalService} from '../../../../common/services/global.service';
import {SecurityRiskService} from '../../../../common/services/security-risk.service';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {DatePipe} from '@angular/common';
import {AddOuidSRRisk, AddSRRisk} from '../../../../common/public/Api';

@Component({
  selector: 'app-area-outside',
  templateUrl: './area-outside.component.html',
  styleUrls: ['./area-outside.component.scss']
})
export class AreaOutsideComponent implements OnInit {

  // @ts-ignore
  @ViewChild('upimg') ImageClear: UploadImageComponent;
  public addOutsideRisk: FormGroup;
  public treeDialog: any;
  public OrgTrees: any;
  public OrgTree: any;
  public esDate: any = Es;
  public addOutside: AddOuidSRRisk = new AddOuidSRRisk();
  public riskKindOption: Array<object> = [];
  public riskCategoryOption: Array<object> = [];
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
    for (const key in this.addOutside){
      if (this.noRequiredControls.indexOf(key) < 0){
        data[key] =  new FormControl('', Validators.required);
      }else {
        data[key] =  new FormControl('');
      }
    }
    this.addOutsideRisk = this.fb.group(data);
    this.initRiskAreaWidtinData();
  }
  // 初始化下拉框信息
  public  initRiskAreaWidtinData(): void {
    this.getOrgTreeData();
    this.globalSrv.getHidConfigData({data: [{settingType: 'RISK_CATEGOTY'}, {settingType: 'HARM_KIND'}]}).subscribe(val => {
      this.riskKindOption = setDrapdownOptionList(val.data.HARM_KIND);
      console.log(this.riskKindOption);
      this.riskCategoryOption = setDrapdownOptionList(val.data.RISK_CATEGOTY);
    });
  }
  // 获取树结构数据
  public getOrgTreeData(): void {
    this.globalSrv.getAllOrganizationTree({}).subscribe(value => {
      this.OrgTrees = initializeTree(
        value.data ? value.data : [],
        {labelName: 'organizationName', childrenName: 'chiled'}
      );
    });
  }
  public selectImageFile(e): void {
    this.addOutsideRisk.patchValue({picture:  e.value.files});
    // console.log(e);
  }

  public  submitClcik(): void {
    if (this.addOutsideRisk.valid){
      if (this.addOutsideRisk.value.picture.length <= 6){
        this.toolSrv.setConfirmation('提交', '提交', () => {
          const formData = new FormData();
          setImageToFromData(this.addOutsideRisk, 'picture', formData);
          const subData = JSON.parse(JSON.stringify(this.addOutsideRisk.value));
          subData.evaluateTime = this.datePipe.transform(subData.evaluateTime, 'yyyy-MM-dd');
          for (const key in subData){
            if (key !== 'picture'){
              formData.append(key, subData[key]);
            }
          }
          this.secRiskSrv.addOutSideAreaRisk(formData).subscribe(res => {
            this.addOutsideRisk.reset();
            this.ImageClear.clearImage();
            this.toolSrv.setToast('success', '提示', '提交成功');
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
    this.addOutsideRisk.patchValue({'organizationName': this.OrgTree.label});
    this.addOutsideRisk.patchValue({'organizationId': this.OrgTree.id});
  }
  // 计算风险值
  public  calcRiskValue(): void {
    if (this.addOutsideRisk.value.possibility !== '' && this.addOutsideRisk.value.consequence && this.addOutsideRisk.value.expose !== ''){
      this.secRiskSrv.calcRiskValue({consequence: this.addOutsideRisk.value.consequence, expose: this.addOutsideRisk.value.expose, possibility: this.addOutsideRisk.value.possibility}).subscribe(val => {
        this.addOutsideRisk.patchValue({riskValue: val.data.riskValue});
        this.addOutsideRisk.patchValue({riskGrad: val.data.riskGrad});
      });
    }
  }
  // 计算措施判断结果
  public calcMeasuresResult(): void {
    if (this.addOutsideRisk.value.riskValue !== '' && this.addOutsideRisk.value.measuresCost !== '' && this.addOutsideRisk.value.measuresEffective !== ''){
      this.secRiskSrv.calcRiskMeasuresResult({riskValue: this.addOutsideRisk.value.riskValue, measuresCost: this.addOutsideRisk.value.measuresCost, measuresEffective: this.addOutsideRisk.value.measuresEffective}).subscribe(val => {
        this.addOutsideRisk.patchValue({measuresResult: val.data.measuresResult});
      });
    }
  }
}
