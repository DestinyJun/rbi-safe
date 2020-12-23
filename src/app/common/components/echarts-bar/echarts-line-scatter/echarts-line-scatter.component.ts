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
      const line0 = {name: null, value: null, isShowDotted: null};
      const line1 = {name: null, value: null, isShowDotted: null};
      const bottoms = {name: null, value: null, isShowDotted: null};
      const middle = {name: null, value: null, isShowDotted: null};
      const top = {name: null, value: null, isShowDotted: null};
      this.echartData.data.forEach((item, index) => {
        if (index === 4) {
          top.name = item.name;
          top.value = item.value;
          top.isShowDotted = item.isShowDotted;
        }
        else if (index === 3) {
          middle.name = item.name;
          middle.value = item.value;
          middle.isShowDotted = item.isShowDotted;
        }
        else if (index === 2) {
          bottoms.name = item.name;
          bottoms.value = item.value;
          bottoms.isShowDotted = item.isShowDotted;
        }
        else if (index === 1) {
          line1.name = item.name;
          line1.value = item.value;
          line1.isShowDotted = item.isShowDotted;
        }
        else if (index === 0) {
          line0.name = item.name;
          line0.value = item.value;
          line0.isShowDotted = item.isShowDotted;
        }
      });
      const series = [
        {
          name: top.name,
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
            type: top.isShowDotted ? 'dashed' : 'solid'
          },
          areaStyle: {
            color: '#fea96d',
            origin: 'start',
            opacity: 1
          },
          data: top.value,
        },
        {
          name: middle.name,
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
            type: middle.isShowDotted ? 'dashed' : 'solid'
          },
          areaStyle: {
            color: '#fefe9f',
            origin: 'start',
            opacity: 1
          },
          data: middle.value,
        },
        {
          name: bottoms.name,
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
            type: bottoms.isShowDotted ? 'dashed' : 'solid'
          },
          areaStyle: {
            color: '#97b9fc',
            origin: 'start',
            shadowColor: '#F3F3F3',
            shadowOffsetX: 1
          },
          data: bottoms.value,
        },
        {
          name: line1.name,
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
            type: line1.isShowDotted ? 'dashed' : 'solid'
          },
          data: line1.value,
        },
        {
          name: line0.name,
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
            type: line0.isShowDotted ? 'dashed' : 'solid'
          },
          data: line0.value,
        }
      ];
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
      color: this.color.reverse(),
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (val) => {
          let str = '';
          val.forEach((item) => {
            if (!(item.seriesName)) {
              str += ``;
            } else {
              str += `<span style="color:${item.color};">   ● </span>${item.seriesName}: ${parseFloat((item.data).toFixed(3))}<br/>`;
            }

          });
          return `${val[0].name}<br/>${str}`;
        }
      },
      grid: {
        top: '15%',
        left: '3%',
        right: '3%',
        bottom: '10%',
        show: false,
        containLabel: false
      },
      legend: [
        {
          show: true,
          right: '3%',
          top: '3%',
          textStyle: {
            color: '#AAAAAA'
          },
          data: [
            {name: 'SPI实际值'}
          ]
        },
        {
          show: true,
          right: '10%',
          top: '3%',
          textStyle: {
            color: '#AAAAAA'
          },
          data: [
            {name: 'SPI预测值'}
          ]
        },
      ],
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          margin: 10,
          color: '#B8B8B8'
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: '#ff6c6a'
          }
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
          show: false,
          lineStyle: {
            color: '#ffffff'
          }
        },
        data: this.echartData.xData,
      },
      yAxis: {
        type: 'value',
        position: 'left',
        axisLabel: {
          margin: 20,
          color: '#B8B8B8'
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: '#ff6c6a'
          }
        },
        axisTick: {
          show: true,
          length: 15,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            color: 'red'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#fff',
            width: 2
          }
        },
        minorSplitLine: {
          show: false
        }
      },
      series : series
    };
  }

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }

}
