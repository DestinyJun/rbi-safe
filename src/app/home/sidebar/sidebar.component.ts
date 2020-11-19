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
    // 首页
    /* {
       icon: {class: 'iconicon_home', fontsize: '16px', color: '#FCCF4F'},
       bgc: '#4E88DE',
       label: '首页',
       lefticon: '',
       children: [],
       link: '/home/main'
     },*/
    // 生产检测预警
    {
      icon: {class: 'fa fa-desktop', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '生产监测预警',
      lefticon: 'fa-angle-down',
      link: '/home/monitor/monitorComprehensive',
      children: [
        {item: {label: '综合监测预警', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/monitor/monitorComprehensive', isHas: true},
        {item: {label: '单一监测预警', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/monitor/monitorSingle', isHas: true},
      ]
    },
    // 目标职责管理
    {
      icon: {class: 'fa fa-dot-circle-o', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '目标职责管理',
      lefticon: 'fa-angle-down',
      link: '/home/intent/mains',
      children: [
        {item: {label: '目标职责管理现状', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/intent/mains', isHas: true},
        {item: {label: '安全生产管理机构设置', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/intent/agency', isHas: true},
        {item: {label: '目标管理', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/intent/aims', isHas: true},
        {item: {label: '一岗双责管理', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/intent/double', isHas: true},
        {item: {label: '安全生产投入', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/intent/invest', isHas: true},
        {item: {label: '安全文化建设', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/intent/culture', isHas: true},
      ]
    },
    // 安全管理制度
    {
      icon: {class: 'fa fa-hdd-o', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '安全管理制度',
      lefticon: 'fa-angle-down',
      link: '/home/institution/inmain',
      children: [
        {item: {label: '制度运行现状', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/institution/inmain', isHas: true},
        {item: {label: '制度管理', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/institution/inmanage', isHas: true},
        {item: {label: '制度评估历史记录', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/institution/inrecord', isHas: true}
      ]
    },
    // 安全教育培训
    {
      icon: {class: 'fa fa-bar-chart', fontsize: '14px', color: '#fff'},
      bgc: '#23344E',
      label: '安全教育培训',
      lefticon: 'fa-angle-down',
      link: '/home/strain/trainSituation',
      children: [
        {item: {label: '教育培训现状', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/strain/trainSituation', isHas: true},
        // {item: {label: '教育培训制度', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/institu', isHas: true},
        {item: {label: '教育培训需求', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/demand', isHas: true},
        {item: {label: '教育培训计划', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/plain', isHas: true},
        {item: {label: '培训内容库设置', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/contentset', isHas: true},
        {item: {label: '培训档案管理', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/archives', isHas: true},
        {item: {label: '开始学习', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/learn', isHas: true},
        {item: {label: '在线考试', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/exam', isHas: true},
        {item: {label: '我的培训档案', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/mytrainfile', isHas: true},
        // {item: {label: '教育培训计划A',  bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strain/plainA', isHas: true},
      ]
    },
    // 设备设施管理
    {
      icon: {class: 'iconfont iconOutline-1', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '设备设施管理',
      lefticon: 'fa-angle-down',
      link: '/home/equipment/equipmentMain',
      children: [
        {item: {label: '设备设施管理现状', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/equipment/equipmentMain', isHas: true},
        {item: {label: '安全设备设施', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/equipment/equipmentSafe', isHas: true},
        {item: {label: '特种设备设施', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/equipment/special', isHas: true},
        {item: {label: '其他设备设施', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/equipment/other', isHas: true},
      ]
    },
    // 安全风险管控
    {
      icon: {class: 'iconfont iconOutline-2', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '安全风险管控',
      lefticon: 'fa-angle-down',
      link: '/home/strisk/status',
      children: [
        {item: {label: '风险分级管控现状', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/strisk/status', isHas: true},
        // {item: {label: '风险等级管控制度', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strisk/institution', isHas: true},
        {item: {label: '风险管理', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strisk/manager', isHas: true},
        {item: {label: '风险档案', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/strisk/archive', isHas: true},
      ]
    },
    // 重大危险源管理
    {
      icon: {class: 'iconfont iconOutline-3', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '重大危险源管理',
      lefticon: 'fa-angle-down',
      link: '/home/risk/discern',
      children: [
        // {item: {label: '重大危险源现状分析', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/risk/analysis', isHas: true},
        // {item: {label: '重大危险源管理制度', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/risk/institution', isHas: true},
        {item: {label: '重大危险源识别', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/risk/discern', isHas: true},
        {item: {label: '重大危险源档案', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/risk/archive', isHas: true},
      ]
    },
    // 隐患排查治理
    {
      icon: {class: 'iconfont iconzu69', fontsize: '14px', color: '#fff'}, bgc: '#23344E', label: '隐患排查治理', link: '/home/trouble/checkstatus', lefticon: 'fa-angle-down', children: [
        {item: {label: '隐患排查治理状况', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/trouble/checkstatus', isHas: true},
        // {item: {label: '隐患排查治理制度', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/trouble/institution', isHas: true},
        {item: {label: '隐患排查', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/trouble/shoot', isHas: true},
        {item: {label: '隐患处理', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/trouble/process', isHas: true},
        {item: {label: '隐患档案', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/trouble/archive', isHas: true},
      ]
    },
    // 应急管理
    {
      icon: {class: 'fa fa-cubes', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '应急管理',
      lefticon: 'fa-angle-down',
      link: '/home/emergency/emergencySituation',
      children: [
        {item: {label: '应急管理现状', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/emergency/emergencySituation', isHas: true},
        {item: {label: '应急组织', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/emergency/org', isHas: true},
        {item: {label: '应急预案', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/emergency/plan', isHas: true},
        {item: {label: '应急演练', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/emergency/drill', isHas: true},
        {item: {label: '应急预案评审记录', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/emergency/record', isHas: true},
      ]
    },
    // 生产安全事故管理
    {
      icon: {class: 'iconfont iconlujing2313', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '生产安全事故管理',
      lefticon: 'fa-angle-down',
      link: '/home/accident/accidentSituation',
      children: [
        {item: {label: '生产安全事故现状', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/accident/accidentSituation', isHas: true},
        {item: {label: '生产安全事故记录', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/accident/accidentRecord', isHas: true},
      ]
    },
    // 职业健康管理
    {
      icon: {class: 'iconfont iconzu106', fontsize: '16px', color: '#fff'}, bgc: '#23344E', label: '职业健康管理', link: '/home/health/phmanager', lefticon: 'fa-angle-down', children: [
        // {item: {label: '职业健康规章制度', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/health/phinstitution', isHas: true},
        {item: {label: '职业健康台账管理', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/health/phmanager', isHas: true},
        // {item: {label: '职业病危害项目申报', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '', isHas: true},
        {item: {label: '职业病危害因素监测与评价管理', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/health/pharchive', isHas: true},
        // {item: {label: '隐患档案', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '', isHas: true},
      ]
    },
    // 一岗双责管理
    /*{
      icon: {class: 'iconOutline-4', fontsize: '14px', color: '#fff'},
      bgc: '#23344E',
      label: '一岗双责管理',
      lefticon: 'fa-angle-down',
      link: '/home/double/insitution',
      children: [
        {item: {label: '一岗双责管理制度', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/double/insitution', isHas: true},
        {item: {label: '责任清单制定', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/double/list-customization', isHas: true},
        {item: {label: '责任清单填写', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/double/checklist-make', isHas: true},
        {item: {label: '员工责任清单档案', bgc: '#fff', ftcolor: '#8E8E8E'}, link: '/home/double/employee-list-file', isHas: true},
      ]
    },*/
    // 制度管理
    /* {
       icon: {class: 'iconlujing2313', fontsize: '16px', color: '#fff'},
       bgc: '#23344E',
       label: '制度管理',
       lefticon: '',
       link: '/home/system/symanger',
       children: []
     },*/
    // 综合信息
    {
      icon: {class: 'iconfont iconlujing331', fontsize: '16px', color: '#fff'}, bgc: '#23344E', label: '综合信息', lefticon: 'fa-angle-down', link: '/home/genneral/board', children: [
        {item: {label: '信息公告栏', bgc: '#4D5B6F', ftcolor: '#4F88DE'}, link: '/home/genneral/board', isHas: true},
        // {item: {label: '生产调度信息展示', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '', isHas: true},
        {item: {label: '公共信息发布', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/genneral/release', isHas: true},
        // {item: {label: '生产运营日报', bgc: '#3E4D63', ftcolor: '#8E8E8E'}, link: '/home/genneral/operation-reporting', isHas: true},
      ]
    }
  ];
  public setItem = [
    /* {
       icon: {class: 'iconicon_home', fontsize: '16px', color: '#FCCF4F'},
       bgc: '#4E88DE',
       label: '首页',
       lefticon: '',
       children: [],
       link: '/home/main'
     },*/
    {
      icon: {class: 'iconfont iconoutline-account_circle-24px', fontsize: '20px', color: '#fff'},
      bgc: '#23344E',
      label: '用户管理',
      lefticon: '',
      children: [],
      link: '/home/seting/user'
    },
    {
      icon: {class: 'iconfont iconoutline-https-24px', fontsize: '20px', color: '#fff'},
      bgc: '#23344E',
      label: '权限管理',
      lefticon: '',
      children: [],
      link: '/home/seting/limit'
    },
    {
      icon: {class: 'iconfont iconbaseline-tag_faces-24px', fontsize: '20px', color: '#fff'},
      bgc: '#23344E',
      label: '角色管理',
      lefticon: '',
      children: [],
      link: '/home/seting/role'
    },
    {
      icon: {class: 'iconfont iconbaseline-device_hub-24px', fontsize: '16px', color: '#fff'},
      bgc: '#23344E',
      label: '组织管理',
      lefticon: '',
      children: [],
      link: '/home/seting/orgazition'
    },
    {
      icon: {class: 'fa fa-adjust', fontsize: '18px', color: '#fff'},
      bgc: '#23344E',
      label: '公司人员管理',
      lefticon: '',
      children: [],
      link: '/home/seting/personnel'
    },
    {
      icon: {class: 'fa fa-shopping-basket', fontsize: '18px', color: '#fff'},
      bgc: '#23344E',
      label: 'SPI系数设定',
      lefticon: '',
      children: [],
      link: '/home/seting/spi'
    },
    {
      icon: {class: 'iconfont iconoutline-contacts-24px', fontsize: '18px', color: '#fff'},
      bgc: '#23344E',
      label: 'App管理',
      lefticon: '',
      children: [],
      link: '/home/seting/mobil'
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
      if (v.permissionName === '系统设置') {
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
    this.barItem.forEach(val => {
      val.icon.color = '#fff';
      val.bgc = '#23344E';
      if (val.children.length !== 0) {
        this.fistItem.forEach(v => {
          if (v.label === item.label) {
            val.lefticon = 'fa-angle-down';
          }
        });
      } else {
        val.lefticon = '';
      }
    });
    item.bgc = '#34445C';
    item.icon.color = '#3880EB';
    if (item.children.length !== 0) {
      // if (this.item)
      this.fistItem.forEach(v => {
        if (v.label === item.label) {
          item.lefticon = 'fa-angle-right';
          item.children.forEach(val => {
            val.item.bgc = '#3E4D63';
            val.item.ftcolor = '#BFC4CC';
          });
          item.children[0].item.bgc = '#4D5B6F';
          item.children[0].item.ftcolor = '#3880EB';
        }
      });
    }
    if (this.isSetBar !== 'true') {
      this.setBodyMarginLeft(item.children);
      let limitdata = [];
      this.limitDataBar.forEach(v => {
        if (item.label === v.permissionName) {
          limitdata = v.sysPermissionList;
        }
      });
      if (item.children.length !== 0) {
        this.secItem = [];
        item.children.forEach(val => {
          limitdata.forEach(res => {
            if (res.permissionName === val.item.label) {
              this.secItem.push(val);
            }
          });
        });
      } else {
        this.secItem = [];
      }
    }
  }

  // 切换回首页模块
  changeToHomeBar() {
    this.setFirstBar();
    this.localSrv.set('isSetBar', 'false');
    setTimeout(() => {
      this.keetRouterStatus();
    }, 200);
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
  public secItemClick(item): void {
    this.secItem.forEach(val => {
      val.item.bgc = '#3E4D63';
      val.item.ftcolor = '#BFC4CC';
    });
    item.item.bgc = '#4D5B6F';
    item.item.ftcolor = '#4F88DE';
  }

  // 路由切换
  public routerLinkClick(item): void {
    // console.log(item.link);
    this.router.navigate([item.link]);
  }

  public changeBar(): void {
    this.setSetingBar();
    this.secItem = [];
    // this.setBodyMarginLeft(this.secItem);
    setTimeout(() => {
      this.keetRouterStatus();
    }, 200);
    // this.router.navigate(['/home/main']);
  }

  public keetRouterStatus(): void {
    if (this.barItem.length === this.fistItem.length) {
      this.barItem.forEach(val => {
        // 判断为首页的
        if (this.router.url.lastIndexOf('/') === 5) {
          if (val.link === this.router.url) {
            val.bgc = '#23344E';
            val.icon.color = '#FCCF4F';
          } else {
            val.icon.color = '#fff';
            val.bgc = '#23344E';
          }
        } else {
          if (val.link.split('/')[2] === this.router.url.split('/')[2]) {
            val.bgc = '#23344E';
            val.icon.color = '#3880EB';
            this.secItem = val.children;
            this.setBodyMarginLeft(val.children);
            this.secItem.forEach(res => {
              if (res.link.length > 0) {
                if (res.link.split('/')[3] === this.router.url.split('/')[3]) {
                  res.item.bgc = '#4D5B6F';
                  res.item.ftcolor = '#4F88DE';
                } else {
                  res.item.bgc = '#3E4D63';
                  res.item.ftcolor = '#BFC4CC';
                }
              }
            });
          } else {
            val.icon.color = '#fff';
            val.bgc = '#23344E';
          }
        }
      });
    } else {
      this.barItem.forEach(val => {
        if (this.router.url.lastIndexOf('/') === 5) {
          if (val.link === this.router.url) {
            val.bgc = '#23344E';
            val.icon.color = '#FCCF4F';
          } else {
            val.icon.color = '#fff';
            val.bgc = '#23344E';
          }
        } else {
          if (val.link.slice(val.link.lastIndexOf('/'), val.link.length) === this.router.url.slice(this.router.url.lastIndexOf('/'), this.router.url.length)) {
            val.bgc = '#34445C';
            val.icon.color = '#3880EB';
            this.secItem = val.children;
            this.setBodyMarginLeft(val.children);
          } else {
            val.icon.color = '#FFFFFF';
            val.bgc = '#23344E';
          }
        }
      });
    }
  }

  public setFirstBar(): void {
    this.barItem = [];
    this.secItem = [];
    this.fistItem.forEach(res => {
      this.limitDataBar.forEach(v => {
        if (v.permissionName === res.label) { // 一级菜单比较成功了，再接着比较二级菜单
          this.barItem.push(res);
          if (res.label === '综合信息') {
          }
          // res.children = [];
          const barChildItem = [];
          if (v.sysPermissionList) {
            res.children.forEach((resChild: any) => {
              v.sysPermissionList.forEach(cChild => {
                if (cChild.permissionName === resChild.item.label) { // 二级菜单比较成功了
                  barChildItem.push(resChild);
                }
              });
            });
          }
          res.children = barChildItem;
        }
      });
    });
  }

  public setSetingBar(): void {
    this.barItem = [];
    this.setItem.forEach(res => {
      if (this.limitDataBarTwo.length !== 0) {
        this.limitDataBarTwo.forEach(v => {
          if (v.permissionName === res.label) {
            this.barItem.push(res);
          }
        });
      }
    });
  }
}
