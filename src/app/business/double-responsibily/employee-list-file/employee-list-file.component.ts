import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../common/services/global.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';
import {TroubleProcessService} from '../../../common/services/trouble-process.service';
import {Router} from '@angular/router';
import {setVlaueToLabel} from '../../../common/public/contents';
import {EmployeeListFileService} from "../../../common/services/employee-list-file.service";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-employee-list-file',
  templateUrl: './employee-list-file.component.html',
  styleUrls: ['./employee-list-file.component.scss']
})
export class EmployeeListFileComponent implements OnInit {
  public optionTable: any;
  public archivesListSelect = [];
  public hidStatusOption: Array<string> = [];
  public table = {
    tableheader: {background: '#F5F6FA', color: '#000'},
    tableContent: [
      {background: '#FFFFFF', color: '#000'}],
    detailBtn: ['#3B86FF']
  };
  public themeSub: Subscription;
  public archivesListContent: any;
  public pageNo = 1;
  public pageOption: any;
  public showDialog: boolean = false;
  // 搜索相关
  public searchData: any;

  public treeDialog: boolean;
  // 多个响应式表单
  public contentForms: Array<FormGroup> = [];
  public baseForm: FormGroup;
  constructor(
    private themeSrv: ThemeService,
    private req: EmployeeListFileService,
    private globalSrv: GlobalService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.themeSub =  this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.archivesListContent);
      }
    );
  }


  ngOnInit() {
    this.initarchivesListData();
    this.baseForm = this.fb.group({
      id: [''],
      checkScore: [''],
      selfScore: [''],
      companyName: [''],
      factoryName: [''],
      workshopName: [''],
      className: [''],
      templateName: [''],
      position: [''],
      idCardNo: [''],
      personnelName: [''],
      badSituation: [''],
      correctSituation: [''],
      writeTime: [''],
      organizationName: [''],
      auditorName: [''],
    });
  }

  public initarchivesListData(): void {
    this.req.page({pageNo: this.pageNo, pageSize: 10}).subscribe(val => {
      this.archivesListContent = val.data.contents.map(v => {
        v.processingStatus = setVlaueToLabel(this.hidStatusOption, v.processingStatus );
        return v;
      });
      this.pageOption = {totalRecord: val.data.totalRecord, pageSize: val.data.pageSize};
      this.setTableOption(this.archivesListContent);
    });
  }
  public  selectData(e): void {
    this.archivesListSelect = e;
  }

  public  DetailClick(e): void {
    if (e.label === '详情'){
      this.contentForms = [];
      const content = {
        checkFraction: [''],
        checkResult: [''],
        content: [''],
        evaluationId: [''],
        fraction: [''],
        selfEvaluation: [''],
        selfFraction: [''],
        id: ['']
      };
      this.baseForm.patchValue(e.data);
      e.data.doubleDutyEvaluationContents.forEach(value => {
        let newform: FormGroup;
        newform = this.fb.group(content);
        newform.patchValue(value);
        this.contentForms.push(newform);
        this['form' + this.contentForms.length] = newform;
      });
      this.showDialog = true;
    }
  }
  // set table data （设置列表数据）
  public  setTableOption(data1): void {
    // console.log(data1.color);
    this.optionTable = {
      width: '100%',
      // height: ''
      header: {
        data:  [
          {field: 'id', header: '序号'},
          {field: 'companyName', header:	'公司名'},
          {field: 'factoryName', header:	'厂矿名'},
          {field: 'workshopName', header:	'车间'},
          {field: 'className', header:	'班组'},
          {field: 'idCardNo', header:	'身份证'},
          {field: 'templateName', header:	'清单名称'},
          {field: 'position', header:	'岗位'},
          {field: 'personnelName', header:	'姓名'},
          // {field: 'badSituation', header:	'未履职情况'},
          // {field: 'correctSituation', header:	'纠正与考核情况'},
          {field: 'writeTime', header:	'填表时间'},
          // {field: 'organizationName', header:	'组织名'},
          {field: 'auditorName', header:	'审核人'},
          {field: null,	header: '检查详情'},
        ],
        style: {background: this.table.tableheader.background, color: this.table.tableheader.color, height: '6vh'}
      },
      Content: {
        data: data1,
        styleone: {background:  this.table.tableContent[0].background, color: this.table.tableContent[0].color, textAlign: 'center', height: '3vw'},
      },
      type: 3,
      tableList:  [{label: '详情', color: this.table.detailBtn[0]}]
    };
  }

  // search Data (搜索事件)
  public  searchDataClick(): void {
  }

  // Paging event (分页事件)
  public  clickEvent(e): void {
    this.pageNo = e;
    this.initarchivesListData();
  }


  public  resetAllData(): void {
    this.archivesListSelect = [];
  }
}
