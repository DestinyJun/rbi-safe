import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {PublicMethodService} from '../common/public/public-method.service';
import {Route, Router} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HeaderComponent} from './header/header.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // @ts-ignore
  @ViewChild('sidebarComponent') child: SidebarComponent;
  // @ts-ignore
  @ViewChild('headerComponent') headerCilde: HeaderComponent;
  public barWith: any;
  public bodyMarginLeft = 10;
  public isBar: string;
  constructor(
    private toolSrv: PublicMethodService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.toolSrv.setTheme();
  }

  public SideBarWidth(e): void {
    this.barWith = e;
    if (this.router.url === '/home/main' || this.router.url.slice(0 , this.router.url.lastIndexOf('/')) === '/home/seting') {
      this.bodyMarginLeft = this.barWith;
    } else {
      this.bodyMarginLeft = e + 8;
    }
  }
  public setBodyMarginLeft(e): void {
      this.bodyMarginLeft = e;
  }
  public  getSetBarStatus(e): void {
    console.log('进入home');
    this.isBar = e;
    console.log(this.isBar);
    this.child.isSetBar = e;
    this.child.changeBar();
  }
  public show(): void {
      this.headerCilde.showNotice = false;
  }
}
