import {Component, OnInit, ViewChild} from '@angular/core';
import {UploadImageComponent} from '../../../../common/components/upload-image/upload-image.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {
  Es,
  initializeTree,
  setDrapdownOptionList,
  setImageToFromData,
  setLabelToVlaue,
  setVlaueToLabel
} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {SecurityRiskService} from '../../../../common/services/security-risk.service';
import {GlobalService} from '../../../../common/services/global.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-archive-outside',
  templateUrl: './archive-outside.component.html',
  styleUrls: ['./archive-outside.component.scss']
})
export class ArchiveOutsideComponent implements OnInit {
// @ts-ignore
  @ViewChild('upimg') ImageClear: UploadImageComponent;
  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public ImageOption = {
    files: [],
    imgUrls: [],
    type: 'edit',
    showUploadIcon: true
  };
  public selectType: string = '单位';
  public searchTypeOption: Array<any> = [
    // {label: '单位', value: '单位'},
    {label: '工种', value: '工种'},
  ];
  public treeDialog: any;
  public OrgTrees: any;
  public OrgTree: any;
  public riskKindOption: Array<object> = [];
  public riskCategoryOption: Array<object> = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public filePathLists: Array<any> = [];
  public showEditArchiveDialog: boolean = false;
  public rkArchiveTitle: Array<object> = [
    // { field: 'id', header: '序号' },
    {field: 'companyName', header: '分公司'},
    {field: 'factoryName', header: '厂矿'},
    {field: 'workshopName', header: '车间'},
    {field: 'className', header: '班组'},
    // {field: 'workType', header: '工种'},
    // {field: 'taskCode', header: '作业或任务（编号）'},
    // {field: 'step', header: '步骤'},
    // {field: 'code', header: '编号'},
    {field: 'harmName', header: '危害名称'},
    {field: 'harmKind', header: '危害种类'},
    {field: 'harmDescription', header: '危害及有关信息描述'},
    {field: 'riskDescription', header: '风险描述'},
    {field: 'riskKind', header: '风险种类'},
    {field: 'riskCategory', header: '风险范畴'},
    {field: 'exposeInfo', header: '暴露于风险的人员、设备信息'},
    {field: 'controlMeasures', header: '现有控制措施'},

    {field: 'consequence', header: '后果'},
    {field: 'expose', header: '暴露'},
    {field: 'possibility', header: '可能性'},
    {field: 'riskValue', header: '风险值'},

    {field: 'riskGrad', header: '风险等级'},
    {field: 'adviceMeasures', header: '建议采取的控制措施'},
    {field: 'measuresEffective', header: '控制措施的有效性'},
    {field: 'measuresCost', header: '措施成本'},
    {field: 'measuresResult', header: '控制措施判断结果'},
    {field: 'operating', header: '操作'},
  ];
  public rkArchiveContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editOutSideArchive: FormGroup;
  public principalPageOption: PageOption = {
    pageSize: 10,
    totalRecord: ''
  };
  public esDate = Es;
  public file: any;
  public fileName = '';
  public uploadSubjectFinishDialog = false;
  public fileDialog = false;
  public finishData = {
    'totalNumber': 0,
    'realNumber': 0,
    'log': []
  };
  public outsideExcelTemplate: string = ''; // 导入模板地址
  constructor(
    private toolSrv: PublicMethodService,
    private secRiskSrv: SecurityRiskService,
    private fb: FormBuilder,
    private globalSrv: GlobalService,
    private datePipe: DatePipe,
  ) {
  }

  ngOnInit() {
    // 模板下载初始化
    this.globalSrv.publicGetExcelTemplate().subscribe((res) => {
      this.outsideExcelTemplate = res.data[5].path;
    });
    this.initconfifData();
    this.editOutSideArchive = this.fb.group(
      {
        organizationName: new FormControl('', Validators.required),
        organizationId: new FormControl('', Validators.required),
        // code: new FormControl('', Validators.required),
        // taskCode: new FormControl('', Validators.required), // 作业或者任务
        // workType: new FormControl('', Validators.required), // 工种
        // step: new FormControl('', Validators.required), // 步骤
        harmName: new FormControl('', Validators.required), // 危害名称
        harmKind: new FormControl('', Validators.required), // 危害种类
        harmDescription: new FormControl('', Validators.required), // 危害及相关描述
        riskDescription: new FormControl('', Validators.required), // 风险描述
        riskKind: new FormControl('', Validators.required), // 风险种类
        riskCategory: new FormControl('', Validators.required), // 粉线范畴
        exposeInfo: new FormControl('', Validators.required), // 风险暴露人员  设备信息
        controlMeasures: new FormControl('', Validators.required), // 	现有控制措施
        consequence: new FormControl('', Validators.required), // 后果
        expose: new FormControl('', Validators.required), // 暴露
        possibility: new FormControl('', Validators.required), // 可能性
        riskValue: new FormControl('', Validators.required), // 风险值
        riskGrad: new FormControl('', Validators.required), // 风险等级
        adviceMeasures: new FormControl('', Validators.required), // 建议采取措施
        measuresEffective: new FormControl('', Validators.required), // 控制措施的有效性
        measuresCost: new FormControl('', Validators.required), // 措施成本
        measuresResult: new FormControl('', Validators.required), // 控制措施判断结果
        measuresUse: new FormControl('', Validators.required), // 措施的采纳 选择（单选） 是 否
        evaluateTime: new FormControl('', Validators.required), // 评估时间
        picture: new FormControl('', Validators.required), // 图片文件 最大六张
        riskCode: new FormControl('', Validators.required), // 编号
      }
    );
  }
  // 题库模板下载
  public outsideDownloadClick() {
    window.open(this.outsideExcelTemplate);
  }
  // 初始化分页数据
  public initArchiveOutSideData(): void {
    this.secRiskSrv.queryArchiveOutSidePageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      this.rkArchiveContent = val.data.contents.map(v => {
        v.harmKind = setVlaueToLabel(this.riskKindOption, v.harmKind);
        v.riskCategory = setVlaueToLabel(this.riskCategoryOption, v.riskCategory);
        return v;
      });
      this.principalPageOption.totalRecord = val.data.totalRecord;
    });

  }

  public selectImageFile(e): void {
    console.log(e);
    if (e.type === 'add'){
      this.editOutSideArchive.patchValue({picture: e.value.files});
    }else {
      let imgid = '';
      if (this.filePathLists.length !== 0){
        this.filePathLists.forEach((val, index) => {
          if (e.value.imgUrls.length !== 0){
            if (e.value.imgUrls.includes(val.picture)){
              imgid = val.id;
              this.filePathLists.splice(index, 1);
            }
          }else {
            imgid = this.filePathLists[0].id;
            this.filePathLists = [];
          }
        });
        this.secRiskSrv.delImage({ id: imgid}).subscribe(res => {
        });
      }
    }
  }

  // 条件搜索
  public searchDataClick(): void {
    if (this.seriousDangerName !== '') {
      this.secRiskSrv.searchArchiveOutSideData({
        type: this.selectType,
        value: this.seriousDangerName,
        pageNo: this.archivePageNo,
        pageSize: 10
      }).subscribe(val => {
        this.rkArchiveContent = val.data.contents;
        this.principalPageOption.totalRecord = val.data.totalRecord;
      });
    } else {
      this.initArchiveOutSideData();
      // this.toolSrv.setToast('error', '操作错误', '请输入重大危险源的名称');
    }
  }

  // 分页点击事件
  public archivePageEvent(e): void {
    console.log(e);
    this.archivePageNo = e;
    this.initArchiveOutSideData();
  }

  // 显示修改重大危险源档案
  public editRiskArchiveClcik(data): void {
    console.log(data);
    this.showEditArchiveDialog = true;
    const a = {};
    for (const key in JSON.parse(JSON.stringify(this.editOutSideArchive.value))){
      if (key === 'harmKind' || key === 'riskCategory'){
        if (key === 'harmKind'){
          a[key] = setLabelToVlaue(this.riskKindOption, data[key]);
        }else {
          a[key] = setLabelToVlaue(this.riskCategoryOption, data[key]);
        }
        this.editOutSideArchive.patchValue(a);
      }else{
        a[key] = data[key];
        this.editOutSideArchive.patchValue(a);
      }
      const filePathlist = [];
      this.editOutSideArchive.patchValue({picture: data.img});
      this.filePathLists = data.img;
      data.img.forEach(res => {
        filePathlist.push(res.picture);
      });
      this.ImageOption = {
        imgUrls: filePathlist,
        showUploadIcon: true,
        type: 'edit',
        files: [],
      };
    }
    //
    // });
  }

  // 确定修改
  public sureEditArchiveClick(): void {
    console.log(this.editOutSideArchive.value);
    if (this.editOutSideArchive.valid){
      if (this.editOutSideArchive.value.picture.length <= 6){
        this.toolSrv.setConfirmation('提交', '提交', () => {
          const formData = new FormData();
          setImageToFromData(this.editOutSideArchive, 'picture', formData);
          const subData = JSON.parse(JSON.stringify(this.editOutSideArchive.value));
          this.datePipe.transform(subData.evaluateTime, 'yyyy-MM-dd');
          for (const key in subData){
            if (key !== 'picture'){
              formData.append(key, subData[key]);
            }
          }
          this.secRiskSrv.updateArchivesData(formData).subscribe(res => {
            this.editOutSideArchive.reset();
            this.ImageClear.clearImage();
            this.showEditArchiveDialog = false;
            this.initArchiveOutSideData();
          });
        });
      }else {
        this.toolSrv.setToast('error', '添加错误', '图片最多添加6张上传');
      }
    }else {
      this.toolSrv.setToast('error', '操作错误', '参数未填写完整');
    }
  }

  // 初始化下拉框信息
  public  initconfifData(): void {
    this.globalSrv.getHidConfigData({data: [{settingType: 'RISK_CATEGOTY'}, {settingType: 'HARM_KIND'}]}).subscribe(val => {
      this.riskKindOption = setDrapdownOptionList(val.data.HARM_KIND);
      this.riskCategoryOption = setDrapdownOptionList(val.data.RISK_CATEGOTY);
      this.initArchiveOutSideData();
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
  public  dataTreeSureClick(): void {
    this.treeDialog = false;
    this.editOutSideArchive.patchValue({'organizationName': this.OrgTree.label});
    this.editOutSideArchive.patchValue({'organizationId': this.OrgTree.id});
  }

  // 计算风险值
  public  calcRiskValue(): void {
    if (this.editOutSideArchive.value.possibility !== '' && this.editOutSideArchive.value.consequence && this.editOutSideArchive.value.expose !== ''){
      this.secRiskSrv.calcRiskValue({consequence: this.editOutSideArchive.value.consequence, expose: this.editOutSideArchive.value.expose, possibility: this.editOutSideArchive.value.possibility}).subscribe(val => {
        this.editOutSideArchive.patchValue({riskValue: val.data.riskValue});
        this.editOutSideArchive.patchValue({riskGrad: val.data.riskGrad});
      });
    }
  }
  // 计算措施判断结果
  public calcMeasuresResult(): void {
    if (this.editOutSideArchive.value.riskValue !== '' && this.editOutSideArchive.value.measuresCost !== '' && this.editOutSideArchive.value.measuresEffective !== ''){
      this.secRiskSrv.calcRiskMeasuresResult({riskValue: this.editOutSideArchive.value.riskValue, measuresCost: this.editOutSideArchive.value.measuresCost, measuresEffective: this.editOutSideArchive.value.measuresEffective}).subscribe(val => {
        this.editOutSideArchive.patchValue({measuresResult: val.data.measuresResult});
      });
    }
  }

  public openImport(): void  {
    this.fileDialog = true;
  }
  public openExport(): void  {
    this.secRiskSrv.riskExcelExportOutside().subscribe(val => {
      window.open(val.data.path);
    });
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
        this.secRiskSrv.riskExcelImportOutside(formData).subscribe(res => {
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
