import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TroubleProcessService} from '../../../../common/services/trouble-process.service';
import {GlobalService} from '../../../../common/services/global.service';
import {DatePipe} from '@angular/common';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {Es, setDrapdownOptionList} from '../../../../common/public/contents';
import {LocalStorageService} from '../../../../common/services/local-storage.service';

@Component({
  selector: 'app-trouble-notice',
  templateUrl: './trouble-notice.component.html',
  styleUrls: ['./trouble-notice.component.scss']
})
export class TroubleNoticeComponent implements OnInit {
  public addNotice: FormGroup;
  public esDate: any = Es;
  // public formData: FormData = new FormData();
  public hidCorrectorOption: Array<object> = [];
  public time: any;
  public code: any;
  public grade: any;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private troubleSrv: TroubleProcessService,
    private localSrv: LocalStorageService,
    private globalSrv: GlobalService,
    private datePipe: DatePipe,
    private toolSrv: PublicMethodService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(val => {
      this.code = val.code;
      this.grade = val.grade;
      this.time = this.datePipe.transform(val.time, 'yyyy-MM-dd');
    });
    const rectificationOpinion = this.localSrv.get('rectificationOpinions');
    console.log(rectificationOpinion);
    this.addNotice = this.fb.group({
      correctorId: new FormControl('', Validators.required),
      hidDangerCode: new FormControl(this.code, Validators.required),
      hidTypeManage: new FormControl(''),
      hidTypePerson: new FormControl(''),
      hidTypeThing: new FormControl(''),
      hidDangerGrade: new FormControl(this.grade),
      rectificationOpinions: new FormControl({value: rectificationOpinion !== 'null' ? rectificationOpinion : '', disabled: rectificationOpinion !== 'null'}, Validators.required),
      specifiedRectificationTime: new FormControl({value: this.time, disabled: this.time}, Validators.required),
    });
    this.getCorrector();
  }

  // 返回上一级
  public backPreviouClick(): void {
    history.go(-1);
  }

  public  IssuedNoticeClick(): void {
      // console.log(123);
    if (this.addNotice.valid){
      // this.formData.append('hidDangerCode', this.code);
      const subMitDta = JSON.parse(JSON.stringify(this.addNotice.value));
      subMitDta.rectificationOpinions =  subMitDta.rectificationOpinions ? subMitDta.rectificationOpinions : this.localSrv.get('rectificationOpinions');
      subMitDta.specifiedRectificationTime = subMitDta.specifiedRectificationTime ? this.datePipe.transform(subMitDta.specifiedRectificationTime, 'yyyy-MM-dd') : this.time;
      this.localSrv.getObject('hidType').forEach(val => {
        switch (val) {
          case '人':  subMitDta.hidTypePerson = '1'; break;
          case '管理': subMitDta.hidTypeManage = '1'; break;
          case '事物': subMitDta.hidTypeThing = '1'; break;
        }
      });
      this.toolSrv.setConfirmation('下发整改', '通知整改', () => {
        this.troubleSrv.issuedNoticeToRectify(subMitDta).subscribe(value => {
          this.addNotice.reset();
          this.router.navigate(['home//trouble/process/list']);
        });
      });
    }else {
      this.toolSrv.setToast('error', '操作错误', '带型号的数据未填写完整');
    }
  }
  // 获取负责人
  public  getCorrector(): void {
      this.troubleSrv.getCorrectorData({}).subscribe(val => {
        this.hidCorrectorOption = setDrapdownOptionList(val.data.data);
      });
  }
}
