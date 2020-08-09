import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';
import {SetingService} from '../../../common/services/seting.service';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../common/services/global.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  public optionTable: any;
  public userSelect: any;
  public pageNo = 1;
  public curUserName: string; // 当前编辑用户名，用于密码重置请求
  public userContent: any[];
  // 添加相关
  public showAddUserDialog: boolean;
  // 修改
  public showEditUserDialog: boolean;
  public selectRolesList: any[] = [];
  // 删除
  public id: any;
  public addUser: FormGroup;
  public table = {
    tableheader: {background: '#F5F6FA', color: '#000'},
    tableContent: [
      {background: '#FFFFFF', color: '#000'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public rolesList = [];
  public pageOption: any;
  public themeSub: Subscription;
  constructor(
      private themeSrv: ThemeService,
      private setSrv: SetingService,
      private toolSrv: PublicMethodService,
      private fb: FormBuilder,
      private dataPipe: DatePipe,
      private globalSrv: GlobalService
  ) {
    this.themeSub =  this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.userContent);
      }
    );
  }

  ngOnInit() {
    // this.setTableOption(this.data);
    this.addUser = this.fb.group({
      idCardNo: new FormControl('', Validators.compose([Validators.pattern(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)])),
      enabled: new FormControl('', Validators.required),
      sysUserRoleList: new FormControl('', Validators.required),
      id: new FormControl(''),
      companyPersonnelId: new FormControl('')
    });
    this.initUserInfo();
    this.getRolesInfoList();
  }
  public  initUserInfo(): void {
    this.setSrv.getUserInfoPageData({pageNo: this.pageNo, pageSize: 10}).subscribe(val => {
      // console.log(val);
      this.userContent = val.data.contents;
      this.setTableOption(this.userContent);
      this.pageOption = {pageSize: val.data.pageSize, totalRecord: val.data.totalRecord};
      this.toolSrv.setToast('success', '请求成功', val.message);
    });
  }
  public getRolesInfoList(): void {
      this.globalSrv.getRolesInfo({}).subscribe(value => {
        this.rolesList = value.data;
      });
  }

  public  selectData(e): void {
    this.userSelect = e;
  }
  public  DetailClick(e): void {
    if (e.label === '删除') {
       this.id = e.data.id;
       this.delUserInfo();
    } else {
      // const list = ['idCardNo', 'enabled', 'sysUserRoleList'];
      this.selectRolesList = e.data.sysUserRoleList;
      this.addUser.patchValue({id: e.data['id']});
      this.addUser.patchValue({companyPersonnelId: e.data['companyPersonnelId']});
      this.curUserName = e.data.username;
      if (e.data.sysUserRoleList !== null){
        this.addUser.patchValue({sysUserRoleList: e.data.sysUserRoleList[0]['roleId']});
      }
      this.showEditUserDialog = true;
    }
  }
  // set table data （设置列表数据）
  public  setTableOption(data1): void {
    this.optionTable = {
      width: '100%',
      header: {
        data:  [
          // {field: 'id', header: '用户id'},
          {field: 'username', header: '用户账号'},
          // {field: 'companyPersonnelId', header: '公司人员信息id'},
          {field: 'companyName', header: '公司名称'},
          {field: 'factoryName', header: '工厂名称'},
          {field: 'workshopName', header: '车间名称'},
          {field: 'teamName', header: '班组'},
          {field: 'name', header: '姓名'},
          {field: 'roleName', header: '角色'},
          {field: 'idCardNo', header: '身份证'},
          {field: 'operating', header: '操作'}
        ],
        style: {background: this.table.tableheader.background, color: this.table.tableheader.color, height: '6vh'}
      },
      Content: {
        data: data1,
        styleone: {background: this.table.tableContent[0].background, color: this.table.tableContent[0].color, textAlign: 'center', height: '3vw'},
      },
      type: 2,
      tableList:  [{label: '编辑', color: this.table.detailBtn[0]}, {label: '删除', color: this.table.detailBtn[1]}]
    };
  }
  // search Data (搜索事件)
  public  searchDataClick(): void {
  }
  // Paging event (分页事件)
  public  clickEvent(e): void {
    this.pageNo = e;
    this.initUserInfo();
  }
  // 重置数据
 public  resetAllData(): void {
  this.addUser.reset();
 }
 public  showAddUserClick(): void {
     this.showAddUserDialog = true;
 }
 // 添加信息
 public  addUserInfoClick(): void {
   if (this.addUser.valid){
     const data = JSON.parse(JSON.stringify(this.addUser.value));
     data.sysUserRoleList = [{roleId: data.sysUserRoleList}];
     data.enabled = Number(data.enabled);
     delete data.id;
     this.toolSrv.setConfirmation('添加', '添加新用户', () => {
       this.setSrv.addUserInfo(data).subscribe(val => {
         this.showAddUserDialog = false;
         this.addUser.reset();
         this.initUserInfo();
         this.toolSrv.setToast('success', '请求成功', val.message);
       });
     });
   }else {
     this.toolSrv.setToast('error', '操作失败', '数据未填写完整');
   }
 }
 // 更新信息
 public  updateUserInfoClick(): void {
   if (this.addUser.valid){
     const updatedata = JSON.parse(JSON.stringify(this.addUser.value));
     updatedata.enabled = Number(updatedata.enabled);
     delete this.selectRolesList[0].roleName;
     delete this.selectRolesList[0].operatingStaff;
     delete this.selectRolesList[0].idt;
     this.selectRolesList[0].roleId = updatedata.sysUserRoleList;
     const upData = {
       id: updatedata.id,
       companyPersonnelId: updatedata.companyPersonnelId,
       enabled: updatedata.enabled,
       sysUserRoleList: this.selectRolesList
     };
     this.toolSrv.setConfirmation('修改', '修改此用户', () => {
       this.setSrv.updateUserInfo(upData).subscribe(val => {
         this.showEditUserDialog = false;
         this.addUser.reset();
         this.initUserInfo();
         this.toolSrv.setToast('success', '请求成功', val.message);
       });
     });
   }else {
     this.toolSrv.setToast('error', '操作失败', '数据未填写完整');
   }
 }

 public  delUserInfoClick(): void {
    // if (this.userSelect.length === 0) {
    //   this.toolSrv.setToast('操作错误', 'error', '请选择需要删除的项');
    // }else if (this.userSelect.length > 0){
    //
    // }
 }

 // 删除信息
 public  delUserInfo(): void {
     this.toolSrv.setConfirmation('删除', '删除这1项', () => {
        this.setSrv.delUserInfo({id: this.id}).subscribe(res => {
          this.id = '';
          this.toolSrv.setToast('success', '请求失败', res.message);
          this.initUserInfo();
        });
     });
 }

 // 密码重置
 public resetPwd(): void {
   this.toolSrv.setConfirmation('重置密码', '重置密码', () => {
     this.setSrv.resetPwd({username: this.curUserName}).subscribe(res => {
       console.log(res);
       this.toolSrv.setToast('success', '提示', '密码重置成功,重置密码为身份证后六位');
     });
   });
 }
}
