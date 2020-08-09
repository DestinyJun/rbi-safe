import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {GeneralInfoService} from '../../../common/services/general-info.service';
import {PublicMethodService} from '../../../common/public/public-method.service';

@Component({
  selector: 'app-gi-info-release',
  templateUrl: './gi-info-release.component.html',
  styleUrls: ['./gi-info-release.component.scss']
})
export class GiInfoReleaseComponent implements OnInit {

  public addInfoResease: FormGroup;
  public file: any;
  constructor(
    private fb: FormBuilder,
    private resealeSrv: GeneralInfoService,
    private toolSrv: PublicMethodService
  ) { }

  ngOnInit() {
    this.addInfoResease = this.fb.group({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      file: new FormControl('', Validators.required),
    });
  }
  public  selectFile(e): void {
    console.log(e.target.files[0].name);
    this.file = e.target.files[0];
    this.addInfoResease.patchValue({'file': e.target.files[0].name});
  }

  public  submitClick(): void {
    if (this.addInfoResease.valid){
       this.toolSrv.setConfirmation('发布', '发布', () => {
        const formData = new FormData();
        formData.append('title', this.addInfoResease.value.title);
        formData.append('content', this.addInfoResease.value.content);
        formData.append('file', this.file);
        console.log(formData);
        this.resealeSrv.submitinfoRelease(formData).subscribe(res => {
          this.addInfoResease.reset();
          this.file = '';
        });
       });
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }

}
