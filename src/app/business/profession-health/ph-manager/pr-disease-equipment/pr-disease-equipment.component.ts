import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PageOption} from '../../../../common/public/Api';
import {Es} from '../../../../common/public/contents';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {ProfessHealthService} from '../../../../common/services/profess-health.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-pr-disease-equipment',
  templateUrl: './pr-disease-equipment.component.html',
  styleUrls: ['./pr-disease-equipment.component.scss']
})
export class PrDiseaseEquipmentComponent implements OnInit {
  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public healthCheckSelect: any = [];
  public seriousDangerName: string = '';  // 重大危险源名称
  public showeditDiseaseEquimentDialog: boolean = false;
  public DiseaseEquimentTitle: Array<object>  = [
    { field: 'unit', header: '单位' },
    { field: 'receiveTime', header: '领用时间' },
    { field: 'generalSuit', header: '一般防护服' },
    { field: 'flameSuit', header: '阻燃服' },
    { field: 'acidBaseSuit', header: '防酸碱服' },
    { field: 'staticElectricitySuit', header: '防静电服' },
    { field: 'nuziSuit', header: '呢子服' },
    { field: 'silkSuit', header: '榨丝衬衣' },
    { field: 'orchidSuit', header: '兰大褂' },
    { field: 'whiteSuit', header: '白大褂' },
    { field: 'whiteWorkSuit', header: '白工作服' },
    { field: 'winterSuit', header: '防寒服' },
    // { field: 'rainSuit', header: '雨衣件' },
    // { field: 'aRainSuit', header: '雨衣套' },
    { field: 'generalHat', header: '一般防护服' },
    { field: 'operating', header: '操作' },
  ];
  public DiseaseEquimentContent: Array<object> = [];
  public archivePageNo: number = 1;
  public editDiseaseEquiment: FormGroup;
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
    this.editDiseaseEquiment = this.fb.group(
      {
        id: new FormControl(''),
        unit: new FormControl('', Validators.required),
        receiveTime: new FormControl('', Validators.required),
        generalSuit: new FormControl(''),
        flameSuit: new FormControl(''),
        acidBaseSuit: new FormControl(''),
        staticElectricitySuit: new FormControl(''),
        nuziSuit: new FormControl(''),
        silkSuit: new FormControl(''),
        orchidSuit: new FormControl(''),
        whiteSuit: new FormControl(''),
        whiteWorkSuit: new FormControl(''),
        winterSuit: new FormControl(''),
        rainSuit: new FormControl(''),
        aRainSuit: new FormControl(''),
        generalHat: new FormControl(''),
        shawlHat: new FormControl(''),
        whitWorkHat: new FormControl(''),
        sunHat: new FormControl(''),
        safeHat: new FormControl(''),
        grassHat: new FormControl(''),
        workShoes: new FormControl(''),
        insulationShoes: new FormControl(''),
        antiSmashingShoes: new FormControl(''),
        waveShoes: new FormControl(''),
        nurseShoes: new FormControl(''),
        rubberShoes: new FormControl(''),
        waterShoes: new FormControl(''),
        slipperShoes: new FormControl(''),
        longClothGlove: new FormControl(''),
        clothGlove: new FormControl(''),
        lineGlove: new FormControl(''),
        acidBaseGlove: new FormControl(''),
        rubberGlove: new FormControl(''),
        handGlove: new FormControl(''),
        oilHandGlove: new FormControl(''),
        electricWeldingGlove: new FormControl(''),
        furClothGlove: new FormControl(''),
        asbestosGlove: new FormControl(''),
        furGlove: new FormControl(''),
        protectGlasses: new FormControl(''),
        colorProtectGlasses: new FormControl(''),
        antiImpactGlasses: new FormControl(''),
        closedGlasses: new FormControl(''),
        faceShield: new FormControl(''),
        littleFaceShield: new FormControl(''),
        weldingLens: new FormControl(''),
        towel: new FormControl(''),
        sandMask: new FormControl(''),
        dustMask: new FormControl(''),
        poisonMask: new FormControl(''),
        antigasMask: new FormControl(''),
        washingPowder: new FormControl(''),
        toiletSoap: new FormControl(''),
        soap: new FormControl(''),
        skinCare: new FormControl(''),
        shoeCover: new FormControl(''),
        canvasSocks: new FormControl(''),
        bib: new FormControl(''),
        safetyBelt: new FormControl(''),
        cuff: new FormControl(''),
      }
    );
  }

  // 初始化分页数据
  public  initHygieneData(): void {
    this.phealthSrv.getDiseaseEquimentPageData({pageNo: this.archivePageNo, pageSize: 10}).subscribe(val => {
      console.log(val);
      this.DiseaseEquimentContent = val.data.contents;
      this.dailyPageOption.totalRecord = val.data.totalRecord;
    });

  }
  // 删除单条数据
  public  diseaseEquimentDeatailClick(item): void {
    console.log(item);
    // this.toolSrv.setConfirmation('删除', '删除这条信息', () => {
    //   this.delDataRequest([{id: item.id}]);
    // });
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
    this.phealthSrv.delDiseaseEquimentData({data: value}).subscribe(val => {
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
    for (const key in JSON.parse(JSON.stringify(this.editDiseaseEquiment.value))) {
      const a = {};
      a[key] = data[key];
      this.editDiseaseEquiment.patchValue(a);
    }
    this.showeditDiseaseEquimentDialog = true;
  }
  public  clearData(): void {
    this.showeditDiseaseEquimentDialog = false;
    this.healthCheckSelect = [];
    this.editDiseaseEquiment.reset();
  }
  // 确定修改
  public  sureeditDiseaseEquimentClick(): void {
    console.log(this.editDiseaseEquiment.value);
    if (this.editDiseaseEquiment.valid){
      const data = JSON.parse(JSON.stringify(this.editDiseaseEquiment.value));
      data.receiveTime = this.datePipe.transform(data.receiveTime, 'yyyy-MM-dd');
      if (data.id === '' || data.id === null){
        this.toolSrv.setConfirmation('新增', '新增', () => {
          this.phealthSrv.addDiseaseEquimentData(data).subscribe(val => {
            this.initHygieneData();
            this.clearData();
          });
        });
      }else {
        this.toolSrv.setConfirmation('修改', '修改', () => {
          this.phealthSrv.updateDiseaseEquimentData(data).subscribe(val => {
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
        this.phealthSrv.diseaseProtectionExcelImport(formData).subscribe(res => {
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
