import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-bar-line',
  templateUrl: './echarts-bar-line.component.html',
  styleUrls: ['./echarts-bar-line.component.scss']
})
export class EchartsBarLineComponent implements OnInit, OnChanges {

  @Input() public echartData: any; // 统计图数据
  @Input() public title: string = ''; // 统计图标题
  @Input() public showSplitLine: boolean = false; // 是否显示Y轴线
  @Input() public showAxisLabel: boolean = false; // 是否显示刻度值
  @Input() public axisLabelRotate: number = 0; // 横坐标类目文字偏转角度
  @Input() public gridBottom: number = 5; // 坐标轴整体距离底部的距离（百分比）
  @Input() public barColor: Array<any> = [ '#3A85FF']; // 柱状图基础配色
  @Input() public lineColor: Array<any> = [ '#FCCF4F']; // 折线图基础配色
  @Output() public chartClick = new EventEmitter<any>();
  public option: any; // 统计图基础配置项

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartData) {
      // console.log(this.echartData);
      const seriesBar = this.echartData.barData.map((item, index) => {
        return {
          name: item.name,
          type: 'bar',
          barWidth: 10,
          color: this.barColor[index],
          itemStyle: {
            normal: {
              barBorderRadius: 12,
            },
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              fontSize: 11,
              formatter: (val) => {
                return `${val.value}s`;
              }
            }
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: item.value,
        };
      });
      const seriesLine = this.echartData.lineData.map((item, index) => {
        return {
          name: item.name,
          type: 'line',
          symbol: 'circle',
          color: this.lineColor[index],
          symbolSize: 8,
          yAxisIndex: 1,
          data: item.value,
        };
      });
      const series = [...seriesBar, ...seriesLine];
      this.updateOption(series);
    }
  }

  private updateOption(series): void {
    this.option = {
      title: {
        text: this.title,
        left: 26,
        top: 0,
        textStyle: {
          color: '#4D4F5C',
          fontSize: 18,
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (val) => {
          let str = '';
          val.forEach((item) => {
            str += `<span style="color:${item.color};">   ● </span>${item.seriesName}: ${parseFloat((item.data).toFixed(3))}<br/>`;
          });
          return `${val[0].name}<br/>${str}`;
        }
      },
      grid:  {
        left: '5%',
        right: '5%',
        bottom: this.gridBottom.toString() + '%',
        top: '15%',
      },
      legend: [
        {
          right: '10%',
          top: '3%',
          textStyle: {
            color: '#AAAAAA'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          position: 'left',
          axisLine: {
            show: false,
            onZero: true
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: this.showSplitLine,
          },
          axisLabel: {
            show: this.showAxisLabel,
          }
        },
        {
          type: 'value',
          position: 'right',
          axisLine: {
            show: false,
            onZero: true
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: this.showSplitLine,
            lineStyle: {
              color: 'rgba(255,163,71,0.5)'
            }
          },
          axisLabel: {
            show: this.showAxisLabel,
            color: 'rgba(255,163,71,1)'
          }
        },
      ],
      xAxis: [
        {
          type: 'category',
          gridIndex: 0,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            align: 'center',
            lineStyle: {
              color: '#A3',
              fontSize: '14px'
            }
          },
          axisLabel: {
            show: true,
            color: '#A7A7A7',
            interval: 0,
            rotate: this.axisLabelRotate
          },
          data: this.echartData.xdata,
          zlevel: 2
        },
      ],
      series: series
    };
  }

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }
}
