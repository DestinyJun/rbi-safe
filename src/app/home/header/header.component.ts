import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Router} from "@angular/router";
import {GeneralInfoService} from "../../common/services/general-info.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public data: any;
  @Output()
  private outer = new EventEmitter();
  @Output()
  private outEvent = new EventEmitter();
  public username: string = '';
  public logoWidth = 10;
  public showNotice = false;
  public headerSideBarShow: boolean = false;
  public setingBar: any = [];
  public eventNum = 7;
  public noticeItem = [];

  constructor(
    private localSrv: LocalStorageService,
    private router: Router,
    private generalInfoService: GeneralInfoService
  ) {
  }

  ngOnInit() {
    this.username = this.localSrv.get('username');
    const data = this.localSrv.getObject('limitData');
    data.forEach(v => {
      if (v.permissionName === '系统设置') {
        this.setingBar = v.sysPermissionList;
      }
    });
    this.getData().then(res => {
      if (this.noticeItem.length > 0) {
        this.showNotice = true;
      }
    });
  }

  private async getData(): Promise<any> {
    await this.generalInfoService.hidNotice(null).toPromise().then(res => {
      if (res.data > 0) {
        this.noticeItem.push('您有' + res.data + '条隐患数待处理。');
      }
    });
    await this.generalInfoService.selfReview(null).toPromise().then(res => {
      if (res.data) {
        this.showNotice = true;
        this.noticeItem.push('您有资格证待复审。');
      }
    });
    await this.generalInfoService.administratorReviewNotice(null).toPromise().then(res => {
      if (res.data) {
        this.noticeItem.push(res.data);
      }
    });
    return new Promise(((resolve, reject) => {
      resolve('finish');
      reject('finish');
    }));
  }

  public logoClick(): void {
    if (this.logoWidth === 3) {
      this.logoWidth = 10;
    } else {
      this.logoWidth = 3;
    }
    this.outer.emit(this.logoWidth);
  }

  public showNoticeClick(): void {
    this.showNotice = !this.showNotice;
    if (this.showNotice) {
      this.noticeItem = [];
      this.getData().then(res => {
        console.log(res);
      });
    }
  }

  public setClick(): void {
    this.outEvent.emit('true');
    this.localSrv.set('isSetBar', 'true');
    this.router.navigate(['/home/seting/user']);
  }

  public setHomeClick(): void {
    this.outEvent.emit('false');
    this.localSrv.set('isSetBar', 'false');
    this.router.navigate(['/home/monitor']);
  }

  public close(): void {
    this.showNotice = false;
  }

}
