import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';
import {SetingService} from '../../../common/services/seting.service';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../common/services/global.service';
import {OragizationTree, TreeNode} from '../../../common/public/Api';

@Component({
  selector: 'app-organization-manager',
  templateUrl: './organization-manager.component.html',
  styleUrls: ['./organization-manager.component.scss']
})
export class OrganizationManagerComponent implements OnInit {
  public optionTable: any;
  public orgazitionSelect = [];
  public table = {
    tableheader: {background: '#F5F6FA', color: '#000'},
    tableContent: [
      {background: '#FFFFFF', color: '#000'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public pageOption: any;
  public orgazitionContent: any;
  public themeSub: Subscription;
  // 搜索条件
  public organizationName = '';
  public pageNo = 1;
  // 添加相关
  public addOragization: FormGroup;
  public showAddOrgazationDialog: boolean;
  // 修改相关
  public showEditOrgazationDialog: boolean;
  // 树结构相关
  public dataTrees: OragizationTree[];
  public dataTree: OragizationTree;
  public treeDialog: any;

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
        this.setTableOption(this.orgazitionContent);
      }
    );
  }

  ngOnInit() {
    // this.setTableOption(this.orgazitionContent);
    this.initOrgazitonInfo();
    this.addOragization = this.fb.group({
      organizationName: new FormControl('',  Validators.required),
      parentId: new FormControl('', Validators.required),
      parentLevel: new FormControl('', Validators.required),
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
    });
  }

  initOrgazitonInfo() {
    this.setSrv.getOrgazitionInfoPageData({pageNo: this.pageNo, pageSize: 10, organizationName: this.organizationName}).subscribe(val => {
      this.orgazitionContent = val.data.contents;
      this.setTableOption(this.orgazitionContent);
      this.pageOption = {pageSize: val.data.pageSize, totalRecord: val.data.totalRecord};
    });
  }
  public  selectData(e): void {
    this.orgazitionSelect = e;
  }
  public  DetailClick(e): void {
    if (e.label === '删除'){
      this.toolSrv.setToast('error', '删除失败', '删除待开发');
    } else{
      this.getOrgazationTreeInfo();
      const list = ['organizationName', 'parentLevel', 'parentId', 'id'];
      list.forEach(val => {
        const a = {};
        a[val] = e.data[val];
        this.addOragization.patchValue(a);
      });
      this.addOragization.patchValue({'name': e.data.parentName});
      // const List
      this.showEditOrgazationDialog = true;
    }
  }
  // set table data （设置列表数据）
  public  setTableOption(data1): void {
    this.optionTable = {
      width: '100%',
      header: {
        data:  [
          {field: 'id', header: '序号'},
          {field: 'organizationName', header: '组织名称'},
          {field: 'level', header: '等级'},
          {field: 'parentName', header: '父组织名称'},
          {field: 'parentLevel', header: '父组织等级'},
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
    this.pageNo = 1;
    this.initOrgazitonInfo();
  }

  // Paging event (分页事件)
  public  clickEvent(e): void {
    this.pageNo = e;
    this.initOrgazitonInfo();
  }
  public  getOrgazationTreeInfo(): void {
    this.globalSrv.getOrgazitionTreeData({}).subscribe(value => {
      if (value.data) {
        this.dataTrees = this.initializeTree(value.data);
      } else {
        this.toolSrv.setToast('error', '操作', '组织数据获取失败');
      }
    });
  }
  // 显示添加弹窗
  public  showAddOrgazitionClick(): void {
    this.getOrgazationTreeInfo();
    this.showAddOrgazationDialog = true;
  }

  // 删除数据
  public  delOrgazitionInfoClick(): void {
     if (this.orgazitionSelect.length === 0){
       this.toolSrv.setToast('error', '操作错误', '请选择需要删除的项');
     }else {
       this.toolSrv.setToast('error', '删除失败', '删除待开发');
     }
  }
  // 添加请求
  public  addOragizationInfoClick(): void {
    console.log(this.addOragization.value);
    if (this.addOragization.valid){
      const data = JSON.parse(JSON.stringify(this.addOragization.value));
      delete data.name;
      delete data.id;
      this.toolSrv.setConfirmation('添加', '添加该公司', () => {
        this.setSrv.addOrgazitionInfo(data).subscribe(value => {
          this.showAddOrgazationDialog = false;
          this.initOrgazitonInfo();
          this.resetAllData();
        });
      });
    }else {
      this.toolSrv.setToast('error', '添加失败', '数据未填写完整');
    }
  }
  // 更新组织
  public  updateOragizationInfoClick(): void {
    if (this.addOragization.valid){
      const data = JSON.parse(JSON.stringify(this.addOragization.value));
      delete data.name;
      this.toolSrv.setConfirmation('修改', '修改该公司', () => {
        this.setSrv.updateOrgazitionInfo(data).subscribe(value => {
          this.showEditOrgazationDialog = false;
          this.initOrgazitonInfo();
          this.resetAllData();
        });
      });
    }else {
      this.toolSrv.setToast('error', '添加失败', '数据未填写完整');
    }
  }
  // 重置数据
  public  resetAllData(): void {
    this.addOragization.reset();
    this.dataTree = null;
  }

  // Tree structure initialization
  public initializeTree(data): any {
    const oneChild = [];
      for (let i = 0; i < data.length; i++) {
      const childnode: TreeNode = {};
      childnode.value = data[i].id;
      childnode.label = data[i].organizationName;
      childnode.level = data[i].level;
      childnode.selectable = true;
      if (data[i].chiled != null && data[i].chiled.length !== 0 ) {
        childnode.children = this.initializeTree(data[i].chiled);
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }
  // 树结构选择
  public  dataTreeSureClick(): void {
     this.treeDialog = false;
     console.log(this.dataTree);
     this.addOragization.patchValue({parentId: this.dataTree.value});
     this.addOragization.patchValue({parentLevel: this.dataTree.level});
     this.addOragization.patchValue({name: this.dataTree.label});
  }

}
