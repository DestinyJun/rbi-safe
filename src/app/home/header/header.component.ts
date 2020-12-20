import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Router} from '@angular/router';
import {GeneralInfoService} from '../../common/services/general-info.service';

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

  public personInit(event) {
    this.username = event.name;
  }

  private async getData(): Promise<any> {
    await this.generalInfoService.hidNotice(null).toPromise().then(res => {
      if (res.data > 0) {
        this.noticeItem.push({message: '您有' + res.data + '条隐患数待处理！', router: '/home/trouble/process/list'});
      }
    });
    await this.generalInfoService.selfReview(null).toPromise().then(res => {
      if (res.data) {
        this.showNotice = true;
        this.noticeItem.push({message: '您有资格证待复审！', router: '/home/strain/demand'});
      }
    });
    await this.generalInfoService.monitorNotice(null).toPromise().then(res => {
      if (res.data) {
        this.showNotice = true;
        this.noticeItem.push({message: res.data, router: '/home/monitor/monitorSingle'});
        this.localSrv.monitorStatus.next({value: true});
      }
    });
    await this.generalInfoService.administratorReviewNotice(null).toPromise().then(res => {
      if (res.data) {
        this.noticeItem.push({message: res.data, router: '/home/strain/demand'});
      }
    });
    await this.generalInfoService.equipmentPageSpecial({pageSize: 1, currentPage: 1}).toPromise().then(res => {
      if (res.data.datas.length > 0) {
        if (res.data.datas[0].status === 1) {
          this.noticeItem.push({message: '特种设备待检测', router: '/home/equipment/special'});
        }
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

  public routerChange(item) {
    this.outEvent.emit('false');
    this.localSrv.set('isSetBar', 'false');
    this.router.navigate([item]);
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
