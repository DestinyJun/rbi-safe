import { Component, OnInit } from '@angular/core';
import {SetingService} from "../../../common/services/seting.service";
import {PublicMethodService} from "../../../common/public/public-method.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GeneralInfoService} from "../../../common/services/general-info.service";
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/loadstatus.state';
import {Show} from '../../../store/loadstatus.actions';

@Component({
  selector: 'app-mobil-app-manager',
  templateUrl: './mobil-app-manager.component.html',
  styleUrls: ['./mobil-app-manager.component.scss']
})
export class MobilAppManagerComponent implements OnInit {

  public addInfo: FormGroup;
  public file: any;
  public showDialog: any;
  public appInfo: any;
  constructor(
    private fb: FormBuilder,
    private resealeSrv: GeneralInfoService,
    private toolSrv: PublicMethodService,
    private setSrv: SetingService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.addInfo = this.fb.group({
      version: new FormControl('', Validators.required),
      updateContent: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
    });
    this.setSrv.findNewAppMessage(null).subscribe(res => {
      console.log(res);
      this.appInfo = res.data;
    });
  }
  public  selectFile(e): void {
    console.log(e.target.files[0].name);
    this.file = e.target.files[0];
    this.addInfo.patchValue({'file': e.target.files[0].name});
  }

  public  submitClick(): void {
    if (this.addInfo.valid){
      this.toolSrv.setConfirmation('发布', '发布', () => {
        this.store.dispatch(new Show());
        const formData = new FormData();
        formData.append('version', this.addInfo.value.version);
        formData.append('updateContent', this.addInfo.value.updateContent);
        formData.append('file', this.file);
        this.setSrv.sendNewApp(formData).subscribe(res => {
          this.toolSrv.setToast('info', '提示', res.message);
          this.ngOnInit();
          this.addInfo.reset();
          this.file = '';
          this.showDialog = false;
        });
      });
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }

  public download(url): void {
    window.open(url);
  }

}
