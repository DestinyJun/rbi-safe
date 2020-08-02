import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../../common/public/theme.service';
import {GlobalService} from '../../../../common/services/global.service';
import {TroubleProcessService} from '../../../../common/services/trouble-process.service';
import {setDrapdownOptionList, setVlaueToLabel} from '../../../../common/public/contents';
import {Router} from '@angular/router';

@Component({
  selector: 'app-trouble-list',
  templateUrl: './trouble-list.component.html',
  styleUrls: ['./trouble-list.component.scss']
})
export class TroubleListComponent implements OnInit {

  public optionTable: any;
  public troubleListSelect = [];
  public hidStatusOption: Array<string> = [];
  public table = {
    tableheader: {background: '#F5F6FA', color: '#000'},
    tableContent: [
      {background: '#FFFFFF', color: '#000'}],
    detailBtn: ['#3B86FF']
  };
  public themeSub: Subscription;
  public troubleListContent: any;
  public pageNo = 1;
  public pageOption: any;

  // 搜索相关
  public searchData: any;

  public treeDialog: boolean;
  constructor(
    private themeSrv: ThemeService,
    private troubleSrv: TroubleProcessService,
    private globalSrv: GlobalService,
    private router: Router
  ) {
    this.themeSub =  this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.troubleListContent);
      }
    );
  }


  ngOnInit() {
    this.globalSrv.getHidConfigData({data: [{settingType: 'HID_STATUS'}]}).subscribe(val => {
      this.hidStatusOption = setDrapdownOptionList(val.data.HID_STATUS);
      this.inittroubleListData();
    });
  }

  public inittroubleListData(): void {
    this.troubleSrv.getTroublePageDta({pageNo: this.pageNo, pageSize: 10}).subscribe(val => {
      this.troubleListContent = val.data.contents.map(v => {
         v.processingStatus = setVlaueToLabel(this.hidStatusOption, v.processingStatus );
         return v;
      });

      this.pageOption = {totalRecord: val.data.totalRecord, pageSize: val.data.pageSize};
      this.setTableOption(this.troubleListContent);
    });
  }
  public  selectData(e): void {
    this.troubleListSelect = e;
  }
  public  DetailClick(e): void {
    if (e.label === '详情'){
      this.router.navigate(['home/trouble/process/detail'], {queryParams: {code: e.data['hidDangerCode']}});
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
          {field: 'processingStatus', header: '状态'},
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
  // public  getConfigData(): void {
  // }
  // search Data (搜索事件)
  public  searchDataClick(): void {
    // this.setSrv.queryPermissionInfoById({id: this.searchData}).subscribe(res => {
    //   console.log(res);
    // });
  }

  // Paging event (分页事件)
  public  clickEvent(e): void {
    this.pageNo = e;
    this.inittroubleListData();
  }


  public  resetAllData(): void {
    this.troubleListSelect = [];
  }

}
