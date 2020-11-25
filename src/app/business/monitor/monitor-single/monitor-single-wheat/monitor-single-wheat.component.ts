import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageOption, TableHeader} from '../../../../common/public/Api';
import {MonitorService} from '../../monitor.service';

@Component({
  selector: 'app-monitor-single-wheat',
  templateUrl: './monitor-single-wheat.component.html',
  styleUrls: ['./monitor-single-wheat.component.scss']
})
export class MonitorSingleWheatComponent implements OnInit, OnDestroy {

  public monitorSingleWheatPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public monitorSingleWheatTableHeader: TableHeader[] = [
    {field: 'typeName', header: '传感器类型名称'},
    {field: 'name', header: '传感器名称'},
    {field: 'place', header: '位置'},
    {field: 'value', header: '传感器采集数字量'},
    {field: 'unit', header: '传感器采集数字量单位'},
  ]; // 表头字段
  public monitorSingleWheatTableData: any[]; // 表体数据
  public monitorSingleWheatTableSelect: any = []; // 表格选择数据
  public monitorSingleWheatNowPage: number = 1; // 当前页
  public monitorSingleTimer: any = null;
  constructor(
    private monitorSrv: MonitorService,
  ) { }

  ngOnInit() {
    this.monitorSingleWheatDataInit(this.monitorSingleWheatNowPage, this.monitorSingleWheatPageOption.pageSize);
    this.monitorSingleTimer = setInterval(() => {
      this.monitorSingleWheatDataInit(this.monitorSingleWheatNowPage, this.monitorSingleWheatPageOption.pageSize);
    }, 90000);
  }

  // 数据初始化
  private monitorSingleWheatDataInit(pageNo, pageSize) {
    this.monitorSrv.monitorSingleWheatList({pageNo, pageSize}).subscribe((res) => {
      this.monitorSingleWheatTableData = res.data;
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.monitorSingleTimer);
  }

}
