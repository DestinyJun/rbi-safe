import { Component, OnInit } from '@angular/core';
import {MonitorService} from '../monitor.service';

@Component({
  selector: 'app-monitor-comprehensive',
  templateUrl: './monitor-comprehensive.component.html',
  styleUrls: ['./monitor-comprehensive.component.scss']
})
export class MonitorComprehensiveComponent implements OnInit {

  public monitorTopChart: any = null ; // 综合监测预警指标分类占比
  public monitorBottomChart: any = null ; // 综合监测预警指标分类占比
  public monitorOperateFlag: any ; // 操作标识
  public monitorDropdownPlaceholder: any = '下拉切换组织'; //  状态下拉label
  public monitorDropdownOptions: any = [
    {value: 87, label: ' 矿业公司'},
    {value: 94, label: ' 坛罐窑铝'},
    {value: 99, label: ' 小长冲河铝矿'},
    {value: 98, label: ' 猫场铝矿'},
    {value: 97, label: ' 麦坝铝矿'},
  ]; // 状态下拉配置项
  public monitorDropdownSelected: any = null; // 状态下拉选择
  constructor(
    private monitorSrv: MonitorService,
  ) { }

  ngOnInit() {
    this.monitorSrv.monitorComprehensiveArea({}).subscribe((res) => {
      if (res.data) {
        console.log(res.data);
        const xData = res.data.abscissa;
        const data = [
          {name: 'SPI实际值', value: res.data.value, isShowDotted: false},
          {name: 'SPI预测值', value: res.data.predictiveValue, isShowDotted: true},
          {name: '阈值一', value: res.data.thresholdOne, isShowDotted: false},
          {name: '阈值二', value: res.data.thresholdTwo, isShowDotted: false},
          {name: '阈值三', value: res.data.thresholdThree, isShowDotted: false},
        ];
        this.monitorBottomChart = {
          xData: xData,
          data: data
        };
        this.monitorDropdownSelected = res.data.organizationId;
        this.monitorChartBarHttp({organizationId: res.data.organizationId, time: res.data.time});
      }
      else {
        this.monitorTopChart = {
          xdata: [],
          barData: []
        };
      }
    });
  }

  // 折线图获取
  private monitorChartLinerHttp(organizationId){
    this.monitorSrv.monitorComprehensiveArea({organizationId}).subscribe((res) => {
      if (res.data) {
        const xData = res.data.abscissa;
        const data = [
          {name: 'SPI实际值', value: res.data.value, isShowDotted: false},
          {name: 'SPI预测值', value: res.data.predictiveValue, isShowDotted: true},
          {name: 'a', value: res.data.thresholdOne, isShowDotted: false},
          {name: 'b', value: res.data.thresholdTwo, isShowDotted: false},
          {name: 'c', value: res.data.thresholdThree, isShowDotted: false},
        ];
        this.monitorBottomChart = {
          xData: xData,
          data: data
        };
        this.monitorDropdownSelected = res.data.organizationId;
        this.monitorChartBarHttp({organizationId: res.data.organizationId, time: res.data.time});
      }
      else {
        this.monitorBottomChart = {
          xData: [],
          data: []
        };
        this.monitorTopChart = {
          xdata: [],
          barData: []
        };
      }
    });
  }

  // 柱状图数据获取
  private monitorChartBarHttp(params) {
    this.monitorSrv.monitorComprehensiveBar(params).subscribe((res) => {
      const xdata = res.data.abscissa;
      const barData = res.data.percentage;
      // const barData = [-30, 15, 50, 10, 43, 55, -23, 13];
      this.monitorTopChart = {xdata, barData};
    });
  }

  // 基础操作
  public monitorOperate(flag: string, item?: any) {
    switch (flag) {
      case 'change':
        this.monitorChartLinerHttp(item.value);
        break;
      case 'chart':
        this.monitorChartBarHttp({organizationId: this.monitorDropdownSelected, time: item.name});
        break;
    }
  }

}
