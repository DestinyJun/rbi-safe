import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {OragizationTree} from '../../../../common/public/Api';
import {ThemeService} from '../../../../common/public/theme.service';
import {SetingService} from '../../../../common/services/seting.service';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {GlobalService} from '../../../../common/services/global.service';
import {SafetrainService} from '../../../../common/services/safetrain.service';

@Component({
  selector: 'app-scs-sort',
  templateUrl: './scs-sort.component.html',
  styleUrls: ['./scs-sort.component.scss']
})
export class ScsSortComponent implements OnInit {
  public optionTable: any;
  public questionSelect = [];
  public table = {
    tableheader: {background: '#F5F6FA', color: '#000'},
    tableContent: [
      {background: '#FFFFFF', color: '#000'}],
    detailBtn: ['#3B86FF', '#FF8A9A']
  };
  public themeSub: Subscription;
  public questionContent: any;
  public pageNo = 1;
  public pageOption: any;

  // 删除相关
  public delData = [];
  public dialogTitle: string = '添加';
  public editId: any = '';
  public addDialog: boolean;
  public subjectStoreName: string = ''; // 添加题库名称
  // 搜索相关
  public searchData: any;


  constructor(
    private themeSrv: ThemeService,
    private safeSrv: SafetrainService,
    private toolSrv: PublicMethodService,
    // private fb: FormBuilder,
    // private dataPipe: DatePipe,
    private globalSrv: GlobalService
  ) {
    this.themeSub =  this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.questionContent);
      }
    );
  }


  ngOnInit() {
    this.initLimitData();
  }

  public initLimitData(): void {
    this.safeSrv.searchScsQuestionSortInfo({}).subscribe(val => {
      this.questionContent = val.data;
      this.pageOption = {totalRecord: 20, pageSize: 20};
      // this.pageOption = {pageSize: ''};
      this.setTableOption(this.questionContent);
    });
  }
  public  selectData(e): void {
    this.questionSelect = e;
  }
  public  DetailClick(e): void {
    if (e.label === '删除'){
      this.toolSrv.setConfirmation('删除', '删除该项', () => {
        this.delLimitInfo(e.data.id);
      });
    }else {
      this.subjectStoreName = e.data.subjectStoreName;
      this.addDialog = true;
      this.editId = e.data.id;
      this.dialogTitle = '修改';
    }
  }
  // set table data （设置列表数据）
  public  setTableOption(data1): void {
    this.optionTable = {
      width: '100%',
      header: {
        data:  [
          {field: 'id', header: '序号'},
          {field: 'subjectStoreName', header: '题库名称'},
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
    // this.setSrv.queryPermissionInfoById({id: this.searchData}).subscribe(res => {
    //   console.log(res);
    // });
  }
  // Paging event (分页事件)
  public  clickEvent(e): void {
    this.pageNo = e;
    this.initLimitData();
  }
  public  radioEvent(e): void {
    console.log(e);
  }
  public  addSortClick(): void {
    if (this.subjectStoreName !== ''){
      this.toolSrv.setConfirmation(this.dialogTitle + '题库分类', this.dialogTitle + '题库分类', () => {
        if (this.dialogTitle === '添加'){
          this.safeSrv.addScsQuestionSortInfo({subjectStoreName: this.subjectStoreName}).subscribe(val => {
            this.addDialog = false;
            this.resetAllData();
            this.initLimitData();
          });
        }else {
          this.safeSrv.editScsQuestionSortInfo({subjectStoreName: this.subjectStoreName, id: this.editId}).subscribe(val => {
            this.addDialog = false;
            this.resetAllData();
            this.initLimitData();
          });
        }
      });
    }
  }
  // 删除请求
  public  delLimitInfo(data): void {
    this.safeSrv.delScsQuestionSortInfo({id: data}).subscribe(res => {
      this.initLimitData();
      this.resetAllData();
    });
  }


  public  resetAllData(): void {
    this.delData = [];
    this.subjectStoreName = '';
    this.questionSelect = [];
    this.dialogTitle = '添加';
    this.editId = '';
  }


}
