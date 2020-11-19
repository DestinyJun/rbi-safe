import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageOption, TableHeader} from '../../../../common/public/Api';
import {Observable} from 'rxjs';
import {MonitorService} from '../../monitor.service';

@Component({
  selector: 'app-monitor-single-cat',
  templateUrl: './monitor-single-cat.component.html',
  styleUrls: ['./monitor-single-cat.component.scss']
})
export class MonitorSingleCatComponent implements OnInit, OnDestroy {


  public monitorSingleCatPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public monitorSingleCatTableHeader: TableHeader[] = [
    {field: 'location', header: '传感器位置'},
    {field: 'name', header: '传感器名称'},
    {field: 'openTime', header: '开启时间'},
    {field: 'transducerSiteName', header: '传感器基站位置'},
    {field: 'value', header: '实时数据'},
  ]; // 表头字段
  public monitorSingleCatTableData: any[]; // 表体数据
  public monitorSingleCatTableSelect: any = []; // 表格选择数据
  public monitorSingleCatNowPage: number = 1; // 当前页
  public monitorSingleTimer: any = null;
  constructor(
    private monitorSrv: MonitorService,
  ) { }

  ngOnInit() {
    this.monitorSingleCatDataInit(this.monitorSingleCatNowPage, this.monitorSingleCatPageOption.pageSize);
    this.monitorSingleTimer = setInterval(() => {
      this.monitorSingleCatDataInit(this.monitorSingleCatNowPage, this.monitorSingleCatPageOption.pageSize);
    }, 5000);
  }

  // 数据初始化
  private monitorSingleCatDataInit(pageNo, pageSize) {
    this.monitorSrv.monitorSingleCatList({pageNo, pageSize}).subscribe((res) => {
      console.log(res);
      this.monitorSingleCatTableData = res.data;
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.monitorSingleTimer);
  }

}
