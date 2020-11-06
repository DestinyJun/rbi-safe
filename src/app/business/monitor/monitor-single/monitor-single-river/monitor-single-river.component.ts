import {Component, OnDestroy, OnInit} from '@angular/core';
import {TableHeader} from '../../../../common/public/Api';
import {MonitorService} from '../../monitor.service';

@Component({
  selector: 'app-monitor-single-river',
  templateUrl: './monitor-single-river.component.html',
  styleUrls: ['./monitor-single-river.component.scss']
})
export class MonitorSingleRiverComponent implements OnInit, OnDestroy {

  public monitorSingleRiverTableHeader: TableHeader[] = [
    {field: 'name', header: '传感器名称'},
    {field: 'typeName', header: '传感器类型名称'},
    {field: 'place', header: '位置'},
    {field: 'value', header: '传感器采集数字量'},
    {field: 'unit', header: '传感器采集数字量单位'},
  ]; // 表头字段
  public monitorSingleRiverTableData: any[]; // 表体数据
  public monitorSingleRiverTableSelect: any = []; // 表格选择数据
  public monitorSingleTimer: any = null;
  constructor(
    private monitorSrv: MonitorService,
  ) { }

  ngOnInit() {
    // this.monitorSingleRiverDataInit(this.monitorSingleRiverNowPage, this.monitorSingleRiverPageOption.pageSize);
    /*this.monitorSingleTimer = setInterval(() => {
      this.monitorSingleRiverDataInit(this.monitorSingleRiverNowPage, this.monitorSingleRiverPageOption.pageSize);
    }, 5000);*/
  }

  // 数据初始化
  private monitorSingleRiverDataInit(pageNo, pageSize) {
    this.monitorSrv.monitorSingleRiverList({pageNo, pageSize}).subscribe((res) => {
      this.monitorSingleRiverTableData = res.data;
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.monitorSingleTimer);
  }

}
