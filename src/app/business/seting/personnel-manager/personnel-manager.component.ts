import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';
import {SetingService} from '../../../common/services/seting.service';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {FileOption} from '../../../common/components/basic-dialog/dialog.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {GlobalService} from '../../../common/services/global.service';
import {OragizationTree, TreeNode} from '../../../common/public/Api';

@Component({
  selector: 'app-personnel-manager',
  templateUrl: './personnel-manager.component.html',
  styleUrls: ['./personnel-manager.component.scss']
})
export class PersonnelManagerComponent implements OnInit {
  public optionTable: any;
  public personnelSelect = [];
  public table = {
    tableheader: {background: '#F5F6FA', color: '#000'},
    tableContent: [
      {background: '#FFFFFF', color: '#000'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public themeSub: Subscription;
  public pageOption: any;
  public personnelData = [];
  // 添加相关
  public showAddPersionDialog: boolean;
  public addPersonnel: FormGroup;
  public esDate: any;
  // 编辑信息
  public showEditPersionDialog: boolean;
  // 赛选
  public searchTypeOption = [
    {label: '全部', value: 0},
    // {label: '组织id', value: 1},
    {label: '员工号', value: 1},
    {label: '姓名', value: 2},
    {label: '身份证号', value: 3},
    {label: '岗位', value: 4},
  ];
  public maritalStatusOption: Array<object> = [
    {label: '已婚', value: '已婚'},
    {label: '未婚', value: '未婚'},
    {label: '其他', value: '其他'},
  ];
  public selectType = '';
  public orgazitionName: any;
  // public showOrgazationTree;
  public dataTrees: OragizationTree[];
  public dataTree: OragizationTree;
  public treeFlag = 'search';
  public treeDialog: any;
  // 删除相关
  public delIds = [];
  // 文件上传
  public UploadFileOption: FileOption = new FileOption();
  public uploadRecordOption: any;
  public needSearchData = '';
  public files: any[] = [];
  public pageNo = 1;
  public searchData = {
    pageNo: 1,
    pageSize: 10,
    organizationId: '',
    employeeNumber: '',
    name: '',
    idCardNo: '',
    position: '',
  };
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
        this.setTableOption(this.personnelData);
      }
    );
  }

  ngOnInit() {
    this.esDate = this.toolSrv.esDate;
    this.addPersonnel = this.fb.group({
      employeeNumber: new FormControl('', Validators.required),
      organizationId: new FormControl('', Validators.required),
      organizationName: new FormControl(''),
      name: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),

      maritalStatus: new FormControl(''),
      nation: new FormControl('', Validators.required),
      idCardNo: new FormControl('', [Validators.pattern(/^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/)]),
      workshopName: new FormControl({value: '', disabled: true}),
      companyName: new FormControl({value: '', disabled: true}),
      factoryName: new FormControl({value: '', disabled: true}),
      teamName: new FormControl({value: '', disabled: true}),
      id: new FormControl(''),
      dateOfBirth: new FormControl(''),
      degreeOfEducation: new FormControl(''),
      position: new FormControl('', Validators.required),
      workType: new FormControl('', Validators.required),
      entryTime: new FormControl(''),
      jobNature: new FormControl(''),
      remarks: new FormControl(''),
    });
    this.getOrgazitonTree();
    this.initPersonnelData();
  }
  // 初始化数据
  public  initPersonnelData(): void {
      this.setSrv.getPersonnelPageData(this.searchData).subscribe(val => {
        this.pageOption = {pageSize: val.data.pageSize, totalRecord: val.data.totalRecord};
        this.personnelData = val.data.contents;
        this.setTableOption(this.personnelData);
      });
  }
  // 选择数据
  public  selectData(e): void {
    this.personnelSelect = e;
    console.log(this.personnelSelect);
  }
  // 详情按钮
  public  DetailClick(e): void {
    if (e.label === '删除') {
      this.delIds.push(e.data.id);
      this.toolSrv.setConfirmation('删除', `删除这${1}项`, () => {
        this.delpersonnelData();
      });
    } else {
      this.getOrgazitonTree();
      this.treeFlag = 'edit';
      const List = ['employeeNumber', 'organizationId', 'organizationName', 'name', 'gender', 'maritalStatus',
        'nation', 'idCardNo', 'workshopName', 'companyName', 'factoryName', 'teamName', 'id', 'dateOfBirth',
        'degreeOfEducation', 'position', 'workType', 'entryTime', 'jobNature', 'remarks'
      ];
      const a = {};
      List.forEach(val => {
        if (val === 'companyName') {
          a[val] = e.data[val];
          this.addPersonnel.patchValue(a);
          a['organizationName'] = e.data[val];
          this.addPersonnel.patchValue(a);
        } else {
          a[val] = e.data[val];
          this.addPersonnel.patchValue(a);
        }
      });
      this.showEditPersionDialog = true;
      // this.addPersonnel.patchValue()
    }
  }
  // set table data （设置列表数据）
  public  setTableOption(data1): void {
    this.optionTable = {
      width: '100%',
      header: {
        data:  [
          {field: 'employeeNumber', header: '员工号'},
          {field: 'companyName', header: '单位'},
          {field: 'factoryName', header: '厂(矿)'},
          {field: 'workshopName', header: '车间'},
          {field: 'teamName', header: '班组'},
          {field: 'name', header: '姓名'},
          {field: 'gender', header: '性别'},
          {field: 'nation', header: '民族'},
          {field: 'idCardNo', header: '身份证号'},
          {field: 'dateOfBirth', header: '出生日期'},
          {field: 'degreeOfEducation', header: '文化程度'},
          {field: 'entryTime', header: '入厂时间'},
          {field: 'operating', header: '操作'}
        ],
        style: {background: this.table.tableheader.background, color: this.table.tableheader.color, height: '6vh'}
      },
      Content: {
        data: data1,
        styleone: {background: this.table.tableContent[0].background, color: this.table.tableContent[0].color, textAlign: 'center', height: '3vw'},
      },
      type: 2,
      tableList:  [{label: '详情', color: this.table.detailBtn[0]}, {label: '删除', color: this.table.detailBtn[1]}]
    };
  }
  // search Data (搜索事件)
  public  searchDataClick(): void {
    this.searchData.pageNo = this.pageNo = 1;
    this.JudgeSeachType(this.selectType);
  }
  // 判断选择类型
  public  JudgeSeachType(data): void {
    this.resetSearchData();
    switch (data) {
       case 1:  this.searchData.employeeNumber = this.needSearchData; break;
       case 2:  this.searchData.name = this.needSearchData; break;
       case 3:  this.searchData.idCardNo = this.needSearchData; break;
       case 4:  this.searchData.position = this.needSearchData; break;
    }
    this.initPersonnelData();
  }
  // 重置搜索数据
  public  resetSearchData(): void {
     for (const key in this.searchData) {
       if (key !== 'pageSize' && key !== 'pageNo') {
         this.searchData[key] = '';
       }
     }
  }
  // Paging event (分页事件)
  public  clickEvent(e): void {
    this.searchData.pageNo = e;
    this.initPersonnelData();
    // console.log(e);
  }
  // 删除信息
  public  selectPersonnelDataToDel(): void {
      if (this.personnelSelect.length === 0) {
      this.toolSrv.setToast('操作错误', 'error', '请选择需要删除的项');
    } else if (this.personnelSelect.length > 0) {
      this.personnelSelect.forEach(val => {
        this.delIds.push(val.id);
      });
      this.toolSrv.setConfirmation('删除', `删除${this.personnelSelect.length}`, () => {
        this.delpersonnelData();
      });
    }
  }
  // 删除请求
  public  delpersonnelData(): void {
      this.setSrv.delPersonnelInfo({ids: this.delIds.join(',')}).subscribe(res => {
        this.initPersonnelData();
        this.resetAllData();
      });
  }
  // 重置数据
  public  resetAllData(): void{
    this.personnelSelect = [];
    this.delIds = [];
    this.dataTree = null;
  }
 // 显示上传文件
  public  showUploadFile(): void {
    this.UploadFileOption.width = '800';
    this.UploadFileOption.dialog = true;
    // this.showfileDialog = true;
    this.UploadFileOption.files = [];
  }
  // 上传文件
  public  uploadPersoonelFile(e): void {
      if (e.getAll('file').length !== 0) {
        this.setSrv.imoprtPersonnelInfoFile(e).subscribe(val => {
          this.UploadFileOption.files = [];
          this.uploadRecordOption = {
            width: '900',
            dialog: true,
            title: '上传记录',
            totalNumber: val.data.totalNumber,
            realNumber: val.data.realNumber,
            uploadOption: {
              width: '100%',
              tableHeader: {
                data: [
                  {field: 'code', header: '序号'},
                  {field: 'employeeNumber', header: '员工号'},
                  {field: 'name', header: '名字'},
                  {field: 'result', header: '结果'},
                  {field: 'remarks', header: '备注'},
                ],
                style: {background: '#F5F6FA', color: '#000', height: '6vh'}
              },
              tableContent: {
                data: val.data.importLog,
                styleone: {background: '#FFFFFF', color: '#000', height: '2vw', textAlign: 'center'},
              }
            }
          };
        });
      } else {
        this.toolSrv.setToast('error', '上传失败', '请选择需要上传的文件');
      }
  }
  // 添加信息
  public  addPersonnelClick(): void {
    this.getOrgazitonTree();
    this.showAddPersionDialog = true;
    this.treeFlag = 'add';
  }
  // 添加请求
  public  addPersonnelInfoClick(): void {
    if (this.addPersonnel.valid) {
      this.addPersonnel.value['entryTime'] = this.dataPipe.transform(this.addPersonnel.value['entryTime'], 'yyyy-MM-dd');
      this.addPersonnel.value['dateOfBirth'] = this.dataPipe.transform(this.addPersonnel.value['dateOfBirth'], 'yyyy-MM-dd');
      this.toolSrv.setConfirmation('添加', '添加', () => {
        this.setSrv.addPersonnelInfo(JSON.stringify(this.addPersonnel.value)).subscribe(res => {
          this.addPersonnel.reset();
          this.showAddPersionDialog = false;
          this.initPersonnelData();
        });
      });
    } else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }
  // 显示树结构
  public  showOrgazationTree(): void {
      this.treeDialog = true;
  }
  // 获取树结构
  public  getOrgazitonTree(): void {
     this.globalSrv.getOrgazitionTreeData({}).subscribe(value => {
       if (value.data) {
         this.dataTrees = this.initializeTree(value.data);
       } else {
         this.toolSrv.setToast('error', '操作', '组织数据获取失败');
       }
     });
  }
  // 更新信息
  public  updatePersonnelInfoClick(): void {
    if (this.addPersonnel.valid) {
      this.addPersonnel.value['entryTime'] = this.dataPipe.transform(this.addPersonnel.value['entryTime'], 'yyyy-MM-dd');
      this.addPersonnel.value['dateOfBirth'] = this.dataPipe.transform(this.addPersonnel.value['dateOfBirth'], 'yyyy-MM-dd');
      this.toolSrv.setConfirmation('更新', '更新', () => {
        this.setSrv.updatePersonnelInfo(JSON.stringify(this.addPersonnel.value)).subscribe(res => {
          this.addPersonnel.reset();
          this.showEditPersionDialog = false;
          this.initPersonnelData();
        });
      });
    } else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }

  // Tree structure initialization
  public initializeTree(data): any {
    const oneChild = [];
    for (let i = 0; i < data.length; i++) {
      const childnode: TreeNode = {};
      childnode.value = data[i].id;
      childnode.label = data[i].organizationName;
      // childnode.level = data[i].level;
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

  public dataTreeSureClick(): void {
    console.log(this.dataTree);
    this.treeDialog = false;
    if (this.treeFlag === 'search') {
      this.orgazitionName = this.dataTree.label;
      this.searchData.organizationId = this.dataTree.value;
      this.initPersonnelData();
    } else if (this.treeFlag === 'add') {
      this.addPersonnel.patchValue( {organizationId: this.dataTree.value});
      this.addPersonnel.patchValue( {organizationName: this.dataTree.label});
    } else {
      this.addPersonnel.patchValue( {organizationId: this.dataTree.value});
      this.addPersonnel.patchValue( {organizationName: this.dataTree.label});
    }
  }
}
