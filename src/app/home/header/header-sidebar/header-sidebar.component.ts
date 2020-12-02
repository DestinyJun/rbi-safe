import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../common/services/local-storage.service';
import {HomeService} from '../../../common/services/home.service';
import {PersionPasswordClass, PersonInfo, PersonInfoClass} from '../../../common/public/Api';
import {objectCopy} from '../../../common/public/contents';

@Component({
  selector: 'app-header-sidebar',
  templateUrl: './header-sidebar.component.html',
  styleUrls: ['./header-sidebar.component.scss']
})
export class HeaderSidebarComponent implements OnInit {
  @Output() personInit: EventEmitter<any> = new EventEmitter<any>();
  public hdPersonInfo: PersonInfo = new PersonInfoClass();
  public hdPersionPassword: PersionPasswordClass = new PersionPasswordClass();
  public surePsd: string = '';
  public hdSideBarShow: boolean = false;
  public hsUpdatePasswordModal: boolean = false;
  constructor(
    private router: Router,
    private localSrv: LocalStorageService,
    private HomeSrv: HomeService,
  ) { }

  ngOnInit() {
    this.HomeSrv.getPersonInfo().subscribe((res) => {
      this.hdPersonInfo = objectCopy(new PersonInfoClass(), res.data);
      this.personInit.emit(this.hdPersonInfo);
    });
  }
  public loginOut() {
    this.localSrv.clear();
    this.router.navigate(['/login']);
  }

  public  submitPassword(): void {
    if (this.hdPersionPassword.latestPassword === this.surePsd){
      this.HomeSrv.subMitPassword(this.hdPersionPassword).subscribe(val => {
        this.hsUpdatePasswordModal = false;
        if (window.confirm('修改成功,请退出重新登录')){
          this.router.navigate(['/login']);
        }
      });
    }else {
      window.alert('两次密码输入不一致');
    }
  }

}
