import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../common/services/login.service';
import {PublicMethodService} from '../common/public/public-method.service';
import {LocalStorageService} from '../common/services/local-storage.service';
import {GeneralInfoService} from "../common/services/general-info.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = '';
  public password = '';
  constructor(
    private route: Router,
    private loginSrv: LoginService,
    private toolSrv: PublicMethodService,
    private localSrv: LocalStorageService
  ) {
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (this.username !== '' && this.password !== '') {
      if (event.code === 'Enter') {
        this.loginClick();
      }
    }
  }

  ngOnInit() {
  }

  public loginClick(): void {
    if (this.username !== '' && this.password !== '') {
      this.loginSrv.login({username: this.username, password: this.password}).subscribe(val => {
        this.localSrv.set('token', val.token);
        this.localSrv.set('username', this.username);
        this.localSrv.setObject('limitData', val.data);
        // this.localSrv.set('companyPersonnelId', val.data.companyPersonnelId);
        this.route.navigate(['home/monitor']);
      });
    }
  }
}
