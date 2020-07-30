import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {LocalStorageService} from '../../common/services/local-storage.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input()
  public firWidth: any;
  @Output()
  private outWith = new EventEmitter<any>();
  public fistItem = [
    {
      icon: {class: 'iconicon_home', fontsize: '16px', color: '#FCCF4F'},
      bgc: '#4E88DE',
      label: '首页',
      lefticon: '',
      children: [],
      link: '/home/main'
    },
    {
      icon: {class: 'iconOutline-1', fontsize: '14px',  color: '#fff'},
      bgc: '#226AD5',
      label: '安全教育培训',
      lefticon: 'fa-angle-down',
      link: '/home/strain/institu',
      children: [
        {item: {label: '教育培训制度', bgc: '#D1E0F7', ftcolor: '#4F88DE'}, link: '/home/strain/institu', isHas: true},
        {item: {label: '教育培训需求', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/strain/demand', isHas: true},
        {item: {label: '教育培训计划',  bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/strain/plain', isHas: true},
        {item: {label: '培训内容库设置', bgc: '#fff', ftcolor: '#8E8E8E' }, link: '/home/strain/contentset', isHas: true},
        {item: {label: '培训档案管理', bgc: '#fff', ftcolor: '#8E8E8E' },  link: '/home/strain/archives', isHas: true},
        {item: {label: '开始学习', bgc: '#fff', ftcolor: '#8E8E8E' },  link: '/home/strain/learn', isHas: true},
        {item: {label: '在线考试', bgc: '#fff', ftcolor: '#8E8E8E' },  link: '/home/strain/exam', isHas: true},
        {item: {label: '我的培训档案', bgc: '#fff', ftcolor: '#8E8E8E' }, link: '/home/strain/mytrainfile', isHas: true},
        {item: {label: '教育培训计划A',  bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/strain/plainA', isHas: true},
      ]
    },
    {
      icon: {class: 'iconOutline-2', fontsize: '16px',  color: '#fff'},
      bgc: '#226AD5',
      label: '安全风险管控',
      lefticon: 'fa-angle-down',
      link: '/home/strisk/status',
      children: [
        {item: {label: '风险分级管控现状', bgc: '#D1E0F7', ftcolor: '#4F88DE'}, link: '/home/strisk/status', isHas: true},
        {item: {label: '风险等级管控制度', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/strisk/institution', isHas: true},
        {item: {label: '风险管理',  bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/strisk/manager', isHas: true},
        {item: {label: '风险档案',  bgc: '#fff', ftcolor: '#8E8E8E'}, link:  '/home/strisk/archive', isHas: true},
      ]
    },
    {
      icon: {class: 'iconOutline-3', fontsize: '16px',  color: '#fff'},
      bgc: '#226AD5',
      label: '重大危险源管理',
      lefticon: 'fa-angle-down',
      link: '/home/risk/institution',
      children: [
        // {item: {label: '重大危险源现状分析', bgc: '#D1E0F7', ftcolor: '#4F88DE'}, link: '/home/risk/analysis', isHas: true},
        {item: {label: '重大危险源管理制度', bgc: '#D1E0F7', ftcolor: '#4F88DE'}, link: '/home/risk/institution', isHas: true},
        {item: {label: '重大危险源识别', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/risk/discern', isHas: true},
        {item: {label: '重大危险源档案', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/risk/archive', isHas: true},
      ]
    },
    {
      icon: {class: 'iconzu69', fontsize: '14px', color: '#fff'}, bgc: '#226AD5', label: '隐患排查治理', link: '/home/trouble/checkstatus', lefticon: 'fa-angle-down', children: [
        {item: {label: '隐患排查治理状况', bgc: '#D1E0F7', ftcolor: '#4F88DE'}, link: '/home/trouble/checkstatus', isHas: true},
        {item: {label: '隐患排查治理制度', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/trouble/institution', isHas: true},
        {item: {label: '隐患排查', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/trouble/shoot', isHas: true},
        {item: {label: '隐患处理', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/trouble/process', isHas: true},
        {item: {label: '隐患档案', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/trouble/archive', isHas: true},
      ]
    },
    {
      icon: {class: 'iconzu106', fontsize: '16px', color: '#fff'}, bgc: '#226AD5', label: '职业健康管理', link: '/home/health/phinstitution', lefticon: 'fa-angle-down', children: [
        {item: {label: '职业健康规章制度', bgc: '#D1E0F7', ftcolor: '#4F88DE'}, link: '/home/health/phinstitution', isHas: true},
        {item: {label: '职业健康台账管理', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/health/phmanager', isHas: true},
        // {item: {label: '职业病危害项目申报', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '', isHas: true},
        {item: {label: '职业病危害因素监测与评价管理', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/health/pharchive', isHas: true},
        // {item: {label: '隐患档案', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '', isHas: true},
      ]
    },
    {
      icon: {class: 'iconOutline-4', fontsize: '14px', color: '#fff'},
      bgc: '#226AD5',
      label: '一岗双责管理',
      lefticon: 'fa-angle-down',
      link: '/home/double/insitution',
      children: [
        {item: {label: '一岗双责管理制度', bgc: '#D1E0F7', ftcolor: '#4F88DE'}, link: '/home/double/insitution', isHas: true},
        {item: {label: '责任清单制定', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/double/list-customization', isHas: true},
        {item: {label: '员工责任清单档案', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/double/employee-list-file', isHas: true},
      ]
    },
    // tslint:disable-next-line:max-line-length
    {
      icon: {class: 'iconlujing2313', fontsize: '16px', color: '#fff'},
      bgc: '#226AD5',
      label: '制度管理',
      lefticon: '',
      link: '/home/system/symanger',
      children: []
    },
    {
      icon: {class: 'iconlujing331', fontsize: '16px', color: '#fff'}, bgc: '#226AD5', label: '综合信息', lefticon: 'fa-angle-down', link: '/home/genneral/board', children: [
        {item: {label: '信息公告栏', bgc: '#D1E0F7', ftcolor: '#4F88DE'}, link: '/home/genneral/board', isHas: true},
        // {item: {label: '生产调度信息展示', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '', isHas: true},
        {item: {label: '公共信息发布', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/genneral/release', isHas: true},
      ]
    }
  ];
  public setItem = [
    {
      icon: {class: 'iconicon_home', fontsize: '16px', color: '#FCCF4F'},
      bgc: '#4E88DE',
      label: '首页',
      lefticon: '',
      children: [],
      link: '/home/main'
    },
    {
      icon: {class: 'iconoutline-account_circle-24px', fontsize: '20px', color: '#fff'},
      bgc: '#226AD5',
      label: '用户管理',
      lefticon: '',
      children: [],
      link: '/home/seting/user'
    },
    {
      icon: {class: 'iconoutline-https-24px', fontsize: '20px',  color: '#fff'},
      bgc: '#226AD5',
      label: '权限管理',
      lefticon: '',
      children: [],
      link: '/home/seting/limit'
    },
    {
      icon: {class: 'iconbaseline-tag_faces-24px', fontsize: '20px', color: '#fff'},
      bgc: '#226AD5',
      label: '角色管理',
      lefticon: '',
      children: [],
      link: '/home/seting/role'
    },
    {
      icon: {class: 'iconbaseline-device_hub-24px', fontsize: '16px',  color: '#fff'},
      bgc: '#226AD5',
      label: '组织管理',
      lefticon: '',
      children: [],
      link: '/home/seting/orgazition'
    },
    {
      icon: {class: 'iconoutline-contacts-24px', fontsize: '18px',  color: '#fff'},
      bgc: '#226AD5',
      label: '公司人员管理',
      lefticon: '',
      children: [],
      link: '/home/seting/personnel'
    },
  ];
  public isSetBar: any;
  public limitDataBar: any;
  public limitDataBarTwo: any = [];
  public secItem = [];
  public barItem = [];

  constructor(
    private localSrv: LocalStorageService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.isSetBar = this.localSrv.get('isSetBar');
    this.limitDataBar = this.localSrv.getObject('limitData');
    this.limitDataBar.forEach(v => {
      if (v.permissionName === '系统设置'){
        this.limitDataBarTwo = v.sysPermissionList;
      }
    });
    if (this.isSetBar !== 'true') {
     this.setFirstBar();
    } else {
      this.setSetingBar();
    }
    this.keetRouterStatus();
  }
  // 一级导航点击事件
  public firItemClick(item): void {
    console.log(item);
    this.barItem.forEach(val => {
      val.icon.color = '#fff';
      val.bgc = '#226AD5';
      if (val.children.length !== 0) {
        this.fistItem.forEach(v => {
          if (v.label === item.label){
            val.lefticon = 'fa-angle-down';
          }
        });
      } else {
        val.lefticon = '';
      }
    });
    item.icon.color = '#FCCF4F';
    item.bgc = '#4E88DE';
    if (item.children.length !== 0) {
      // if (this.item)
      this.fistItem.forEach(v => {
        if (v.label === item.label){
          item.lefticon = 'fa-angle-right';
          // this.secItem = this.
          item.children.forEach(val => {
            val.item.bgc = '#fff';
            val.item.ftcolor = '#8E8E8E';
          });
          item.children[0].item.bgc = '#D1E0F7';
          item.children[0].item.ftcolor = '#4F88DE';
        }
      });
    }
    if (this.isSetBar !== 'true') {
      this.setBodyMarginLeft(item.children);
      let limitdata = [];
      this.limitDataBar.forEach(v => {
        if (item.label === v.permissionName){
          limitdata = v.sysPermissionList;
        }
      });
      // if (item.label)
      if (item.children.length !== 0){
        this.secItem = [];
        item.children.forEach(val => {
          limitdata.forEach(res => {
            if (res.permissionName === val.item.label){
              this.secItem.push(val);
            }
          });
        });
        console.log(this.secItem);
      }else {
        this.secItem = [];
      }
    } else {
      // 判断为设置导航，首页点击时导航切换
      if (item.label === '首页') {
        this.isSetBar = 'false';
        this.fistItem.forEach((value, index) => {
          if (index !== 0) {
            value.icon.color = '#fff';
            value.bgc = '#226AD5';
            if (value.children.length !== 0){
              value.lefticon = 'fa-angle-down';
            }
            value.children.forEach((val, flog) => {
              if (flog !== 0) {
                val.item.bgc = '#fff';
                val.item.ftcolor = '#8E8E8E';
              } else {
                val.item.bgc = '#D1E0F7';
                val.item.ftcolor = '#4F88DE';
              }
            });
          } else {
            value.icon.color = '#FCCF4F';
            value.bgc = '#4E88DE';
          }
        });
        this.setFirstBar();
        this.localSrv.set('isSetBar', 'false');
      }
    }

    if (item.label === '安全教育培训') {
      item.children.push({item: {label: '教育培训计划A',  bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/strain/plainA', isHas: true});
    }

  }

  // 设置中间内容离左边
  public setBodyMarginLeft(item): void {
    if (item.length === 0) {
      if (this.firWidth === 3) {
        this.outWith.emit(3);
      } else {
        this.outWith.emit(10);
      }
    } else {
      if (this.firWidth === 3) {
        this.outWith.emit(11);
      } else {
        this.outWith.emit(18);
      }
    }
  }

  // 二级路由切换
  public  secItemClick(item): void {
      this.secItem.forEach(val => {
        val.item.bgc = '#fff';
        val.item.ftcolor = '#8E8E8E';
      });
      item.item.bgc = '#D1E0F7';
      item.item.ftcolor = '#4F88DE';
  }

  // // 路由切换
  // public  routerLinkClick(item): void {
  //     // console.log(item.link);
  //     this.router.navigate([item.link]);
  // }

  public  changeBar(): void {
      this.setSetingBar();
      this.secItem = [];
      this.setBodyMarginLeft(this.secItem);
      this.router.navigate(['/home/main']);
  }

  public  keetRouterStatus(): void {
    if (this.barItem === this.fistItem) {
      this.barItem.forEach(val => {
        if (this.router.url.lastIndexOf('/') === 5) {
          if (val.link === this.router.url) {
            // console.log(val.link.slice(0,  val.link.lastIndexOf('/')));
            val.bgc = '#4E88DE';
            val.icon.color = '#FCCF4F';
          } else {
            val.icon.color = '#fff';
            val.bgc = '#226AD5';
          }
        } else {
          if (val.link.slice(0,   val.link.lastIndexOf('/')) === this.router.url.slice(0 , this.router.url.lastIndexOf('/'))) {
            console.log(val.link.slice(0,  val.link.lastIndexOf('/')));
            val.bgc = '#4E88DE';
            val.icon.color = '#FCCF4F';
            this.secItem = val.children;
            this.setBodyMarginLeft(val.children);
            this.secItem.forEach(res => {
              if (res.link.length > 0 ) {
                if (res.link.slice(res.link.lastIndexOf('/'), res.link.length) === this.router.url.slice(this.router.url.lastIndexOf('/'), this.router.url.length)) {
                  res.item.bgc = '#D1E0F7';
                  res.item.ftcolor = '#4F88DE';
                } else {
                  res.item.bgc = '#fff';
                  res.item.ftcolor = '#8E8E8E';
                }
              }
            });
            // val.children.forEach(v)
          } else {
            val.icon.color = '#fff';
            val.bgc = '#226AD5';
          }
        }
      });
    } else {
      this.barItem.forEach(val => {
        if (this.router.url.lastIndexOf('/') === 5) {
          if (val.link === this.router.url) {
            // console.log(val.link.slice(0,  val.link.lastIndexOf('/')));
            val.bgc = '#4E88DE';
            val.icon.color = '#FCCF4F';
          } else {
            val.icon.color = '#fff';
            val.bgc = '#226AD5';
          }
        } else {
          if (val.link.slice(val.link.lastIndexOf('/'), val.link.length) === this.router.url.slice( this.router.url.lastIndexOf('/'), this.router.url.length)) {
            val.bgc = '#4E88DE';
            val.icon.color = '#FCCF4F';
            this.secItem = val.children;
            this.setBodyMarginLeft(val.children);
          } else {
            val.icon.color = '#fff';
            val.bgc = '#226AD5';
          }
        }
      });
    }
  }

  public setFirstBar(): void {
    this.barItem = [];
    this.fistItem.forEach(res => {
      this.limitDataBar.forEach(v => {
        if (v.permissionName === res.label){
          this.barItem.push(res);
        }
      });
    });
    this.barItem.unshift(this.fistItem[0]);
  }

  public  setSetingBar(): void {
    this.barItem = [];
    this.setItem.forEach(res => {
      if (this.limitDataBarTwo.length !== 0){
        this.limitDataBarTwo.forEach(v => {
          if (v.permissionName === res.label){
            this.barItem.push(res);
          }
        });
      }
    });
    this.barItem.unshift(this.setItem[0]);
  }
}
