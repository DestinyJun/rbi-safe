import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-line-scatter',
  templateUrl: './echarts-line-scatter.component.html',
  styleUrls: ['./echarts-line-scatter.component.scss']
})
export class EchartsLineScatterComponent implements OnInit, OnChanges {

  @Input() public echartData: any;
  @Input() public title: any;
  @Input() public color: Array<any> = [ '#498FFF', '#65DCB0']; // 基础配色
  @Output() public chartClick = new EventEmitter<any>();
  public areaChart = {};

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartData) {
      const series = [];
      this.echartData.data.forEach((item, index) => {
        if (index === 0 || index === 1) {
          series.push({
            name: item.name,
            type: 'line',
            smooth: true, // 是否平滑曲线显示
            symbol: 'circle',
            symbolSize: 10,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff',
              }
            },
            lineStyle: {
              type: item.isShowDotted ? 'dashed' : 'solid'
            },
            data: item.value,
          });
        }
        else if (index === 4) {
          series.push({
            name: item.name,
            type: 'line',
            smooth: true, // 是否平滑曲线显示
            symbol: 'circle',
            stack: 'line',
            symbolSize: 10,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff',
              }
            },
            areaStyle: {color: 'orange'},
            lineStyle: {
              type: item.isShowDotted ? 'dashed' : 'solid'
            },
            data: item.value,
          });
        }
        else {
          series.push({
            name: item.name,
            type: 'line',
            smooth: true, // 是否平滑曲线显示
            symbol: 'circle',
            symbolSize: 10,
            label: {
              show: false,
              position: 'top',
              textStyle: {
                color: '#fff',
              }
            },
            stack: 'line',
            areaStyle: {
              color: index === 2 ? '#5B9BD5 ' : 'yellow'
            },
            lineStyle: {
              type: item.isShowDotted ? 'dashed' : 'solid'
            },
            data: item.value,
          });
        }
      });
      this.areaChartFun(series);
    }
  }

  // 统计图渲染
  public areaChartFun(series) {
    this.areaChart = {
      title: {
        text: this.title,
        left: 26,
        top: 10,
        textStyle: {
          color: '#4D4F5C',
          fontSize: 18,
        }
      },
      color: this.color,
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
      grid: {
        top: '15%',
        left: '3%',
        right: '3%',
        bottom: '2%',
        containLabel: true,
      },
      legend: {
        right: '10%',
        top: '3%',
        textStyle: {
          color: '#AAAAAA'
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
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
        },
        data: this.echartData.xData,
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
      series: series
    };
  }

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }

}
