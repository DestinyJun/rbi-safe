import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../../common/public/theme.service';

@Component({
  selector: 'app-demand-principal',
  templateUrl: './demand-principal.component.html',
  styleUrls: ['./demand-principal.component.scss']
})
export class DemandPrincipalComponent implements OnInit {

  public principalSelect: any;
  public optionTable: any;
  public themeSub: Subscription;
  public data = [
    {id: 1, type: '日常培训', content: '厂规', unit: '矿业公司', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 2, type: '安全生产管理', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
    {id: 3, type: '特种人员培训', content: '复审', unit: '安全环保局', subtime: '2020.5.12', time: '2020.5.12' },
  ];
  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: '#3B86FF'
  };
  constructor(
    private themeSrv: ThemeService
  ) {
    this.themeSub =  this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.data);
      }
    );
  }

  ngOnInit() {
    this.setTableOption(this.data);
  }
  // set table data （设置列表数据）
  public  setTableOption(data1): void {
    this.optionTable = {
      width: '100%',
      header: {
        data:  [
          {field: 'id', header: '序号'},
          {field: 'type', header: '培训类型'},
          {field: 'content', header: '培训内容'},
          {field: 'unit', header: '培训单位'},
          {field: 'subtime', header: '提交时间'},
          {field: 'time', header: '处理时间'},
          {field: 'operating', header: '操作'}
        ],
        style: {background: this.table.tableheader.background, color: this.table.tableheader.color, height: '6vh'}
      },
      Content: {
        data: data1,
        styleone: {background: this.table.tableContent[0].background, color: this.table.tableContent[0].color, textAlign: 'center', height: '3vw'},
      },
      type: 2,
      tableList:  [{label: '完成审核', color: this.table.detailBtn}]
    };
  }
  public selectData(e): void {
    this.principalSelect = e;
  }
  public  DetailClick(e): void {
    console.log(e);
  }
}