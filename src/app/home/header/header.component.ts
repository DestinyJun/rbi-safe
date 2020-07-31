import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Router} from "@angular/router";

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
  constructor(
    private localSrv: LocalStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = this.localSrv.get('username');
    const data = this.localSrv.getObject('limitData');
    data.forEach(v => {
      if (v.permissionName === '系统设置'){
        this.setingBar = v.sysPermissionList;
      }
    });
  }

  public  logoClick(): void {
    if (this.logoWidth === 3) {
      this.logoWidth = 10;
    } else {
      this.logoWidth = 3;
    }
    this.outer.emit(this.logoWidth);
  }
  public  showNoticeClick(): void {
      // this.showNotice = !this.showNotice;
      this.headerSideBarShow = !this.headerSideBarShow;
  }
  public setClick(): void {
    this.outEvent.emit('true');
    this.localSrv.set('isSetBar', 'true');
    this.router.navigate(['/home/seting/user']);
  }
}
