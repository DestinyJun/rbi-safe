import {Component, OnInit, ViewChild} from '@angular/core';
import {UploadImageComponent} from '../../../../common/components/upload-image/upload-image.component';
import {Es, initializeTree, setDrapdownOptionList, setImageToFromData} from '../../../../common/public/contents';
import {GlobalService} from '../../../../common/services/global.service';
import {TroubleShootService} from '../../../../common/services/trouble-shoot.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-shoot-rectify',
  templateUrl: './shoot-rectify.component.html',
  styleUrls: ['./shoot-rectify.component.scss']
})
export class ShootRectifyComponent implements OnInit {

  // @ts-ignore
  @ViewChild('upimg') ImageClear: UploadImageComponent;
  public ImageOption = {
    files: [],
    showUploadIcon: true,
    imgUrls: []
  };
  public noticeFile: File;
  // @ts-ignore
  public imageFiles: Array<File> = []; // 图片列表
  public hidFradeOption: Array<object> = [];
  public treeFlag: number = 1;
  public treeDialog: any;
  public OrgTrees: any;
  public OrgTree: any;
  public formData: FormData = new FormData();
  public addRectify: FormGroup;
  constructor(
    private fb: FormBuilder,
    private globalSrv: GlobalService,
    private toolSrv: PublicMethodService,
    private datePipe: DatePipe,
    private shootSrv: TroubleShootService
  ) { }
  public esDate: any = Es;

  ngOnInit() {
    this.addRectify = this.fb.group({
      organizationId: new FormControl('', Validators.required),
      organizationName: new FormControl('', Validators.required),
      rectificationUnitId: new FormControl('', Validators.required),
      rectificationUnitName: new FormControl('', Validators.required),
      hidDangerContent: new FormControl('', Validators.required), // 隐患内容
      hidDangerGrade: new FormControl('', Validators.required), // 	隐患等级
      troubleshootingTime: new FormControl('', Validators.required), // 排查时间
      rectificationOpinions: new FormControl(''), // 整改意见
      specifiedRectificationTime: new FormControl('', Validators.required), // 规定整改完成时间
      notice: new FormControl('', Validators.required), // 通知整改附件
      beforeImg: new FormControl('', Validators.required), // 排查前图片
      hidType: new FormControl([], Validators.required),
      // hidTypeThing: new FormControl('', Validators.required), // 隐患类型
      // hidTypePerson: new FormControl('', Validators.required), // 隐患类型
      // hidTypeManage: new FormControl('', Validators.required), // 隐患类型
      // 处理的
    });
    this.initRectIfy();
  }
  // 初始化数据
  public  initRectIfy(): void {
    this.getOrgTreeData();
    this.globalSrv.getHidConfigData({data: [{settingType: 'HID_GRADE'}, {settingType: 'HID_GRAE'}]}).subscribe(val => {
      this.hidFradeOption = setDrapdownOptionList(val.data.HID_GRADE);
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
  public  showTreeDialog(e): void {
      this.treeDialog = true;
      this.treeFlag = e;

  }
  // 选择文件
  public  selectImageFile(e): void {
    this.imageFiles = e.value.files;
    this.addRectify.patchValue({beforeImg: this.imageFiles});
  }

  public submitClick(): void {
    if (this.addRectify.valid){
      this.formData = new FormData();
      setImageToFromData(this.addRectify, 'beforeImg', this.formData);
      const subMitDta = JSON.parse(JSON.stringify(this.addRectify.value));
      subMitDta.troubleshootingTime = this.datePipe.transform(subMitDta.troubleshootingTime, 'yyyy-MM-dd');
      subMitDta.specifiedRectificationTime = this.datePipe.transform( subMitDta.specifiedRectificationTime, 'yyyy-MM-dd');
      this.setDataConvertToFromData(subMitDta);
      this.toolSrv.setConfirmation('上报整改', '下发整改', () => {
        this.shootSrv.addOrderData(this.formData).subscribe(val => {
           this.resetAllData();
        });
      });
    }else {
      this.toolSrv.setToast('error', '操作错误', '带星号的数据未填写完整');
    }
  }
  public  resetAllData(): void {
    this.ImageClear.clearImage();
    this.addRectify.reset();
  }

  public  selectFile(e): void {
    this.noticeFile = e.target.files[0];
    this.addRectify.patchValue({notice: e.target.files[0].name});
  }


  public  dataTreeSureClick(): void {
    this.treeDialog = false;
    if (this.treeFlag === 1){
      this.addRectify.patchValue({'organizationName': this.OrgTree.label});
      this.addRectify.patchValue({'organizationId': this.OrgTree.id});
    }else {
      this.addRectify.patchValue({'rectificationUnitName': this.OrgTree.label});
      this.addRectify.patchValue({'rectificationUnitId': this.OrgTree.id});
    }
    this.OrgTree = [];
  }

  private setDataConvertToFromData(data): void{
    for (const key in data){
      if (key === 'notice'){
        this.formData.append(key, (this.noticeFile === undefined ? '' : this.noticeFile));
      }else if (key === 'hidType') {
        this.formData.append('hidTypeThing', '');
        this.formData.append('hidTypePerson', '');
        this.formData.append('hidTypeManage', '');
        data[key].forEach(val => {
          switch (val) {
            case '人': this.formData.set('hidTypeThing', '1'); break;
            case '事物': this.formData.set('hidTypePerson', '1'); break;
            case '管理': this.formData.set('hidTypeManage', '1'); break;
          }
        });
      } else if (key !== 'beforeImg') {
        this.formData.append(key, data[key]);
      }
    }
  }
}
