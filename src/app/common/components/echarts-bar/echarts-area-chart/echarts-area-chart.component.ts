import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-area-chart',
  templateUrl: './echarts-area-chart.component.html',
  styleUrls: ['./echarts-area-chart.component.scss']
})
export class EchartsAreaChartComponent implements OnInit, OnChanges {
  @Input() public echartsData: any;
  @Input() public height: any;
  @Input() public width = 'auto';
  @Input() public title: any;
  @Input() public color: any;
  public areaChart = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartsData) {
      // console.log(this.echartsData);
      this.areaChartFun();
    }
  }

  // 统计图渲染
  public areaChartFun() {
    this.areaChart = {
      grid: {
        top: '5%',
        left: '3%',
        right: '1%',
        bottom: '2%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.echartsData.xData,
        axisLabel: {
          margin: 30,
          color: '#B8B8B8'
        },
        axisTick: {
          show: true,
          length: 25,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        }
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisLabel: {
            margin: 20,
            color: '#B8B8B8'
          },
          axisTick: {
            show: true,
            length: 15,
            lineStyle: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          splitLine: {
            show: true,
          },
          axisLine: {
            lineStyle: {
              color: '#fff',
              width: 2
            }
          }
        }
      ],
      series: [
        {
          name: '设备完好率',
          type: 'line',
          smooth: true, // 是否平滑曲线显示
          symbol: 'none',
          lineStyle: {
            normal: {
              color: '#64DCAF', // 线条颜色
            },
          },
          label: {
            show: true,
            position: 'top',
            textStyle: {
              color: '#fff',
            }
          },
          areaStyle: {
            normal: {
              color: 'rgba(108,222,179,0.3)',
            }
          },
          data: this.echartsData.yData,
        }
      ]
    };
  }
}
