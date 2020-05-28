import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../../common/public/theme.service';
import {TroubleProcessService} from '../../../../common/services/trouble-process.service';
import {GlobalService} from '../../../../common/services/global.service';
import {Router} from '@angular/router';
import {setDrapdownOptionList, setVlaueToLabel} from '../../../../common/public/contents';

@Component({
  selector: 'app-archives-list',
  templateUrl: './archives-list.component.html',
  styleUrls: ['./archives-list.component.scss']
})
export class ArchivesListComponent implements OnInit {

  public optionTable: any;
  public archivesListSelect = [];
  public hidStatusOption: Array<string> = [];
  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#3B86FF']
  };
  public themeSub: Subscription;
  public archivesListContent: any;
  public pageNo = 1;
  public pageOption: any;

  // 搜索相关
  public searchData: any;

  public treeDialog: boolean;
  constructor(
    private themeSrv: ThemeService,
    private archivesSrv: TroubleProcessService,
    private globalSrv: GlobalService,
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

  }

  public initarchivesListData(): void {
    this.archivesSrv.getTroubleArchiveListPageData({pageNo: this.pageNo, pageSize: 10}).subscribe(val => {
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
      this.router.navigate(['home/trouble/archive/adetail'], {queryParams: {code: e.data['hidDangerCode']}});
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
          {field: 'companyName', header: '分公司'},
          {field: 'factoryName', header: '厂矿'},
          {field: 'workshopName', header: '车间'},
          {field: 'className', header: '班组'},
          {field: 'troubleshootingTime', header: '排查时间'},
          {field: 'hidDangerContent', header: '隐患内容'},
          {field: 'hidDangerGrade', header: '隐患等级'},
          {field: 'correctorName', header: '隐患负责人'},
          {field: 'rectificationNoticeTime', header: '通知整改时间'},
          {field: 'completionTime', header: '整改完成时间'},
          {field: 'specifiedRectificationTime', header: '整改截止时间'},
          {field: 'operating', header: '操作'}
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
