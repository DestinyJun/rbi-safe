import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-echarts-bar-dimensional',
  templateUrl: './echarts-bar-dimensional.component.html',
  styleUrls: ['./echarts-bar-dimensional.component.scss']
})
export class EchartsBarDimensionalComponent implements OnInit, OnChanges {

  @Input() public echartData: any; // 统计图数据
  @Input() public title: string = ''; // 统计图标题
  @Input() public showSplitLine: boolean = false; // 是否显示Y轴线
  @Input() public showAxisLabel: boolean = false; // 是否显示刻度值
  @Input() public axisLabelRotate: number = 0; // 横坐标类目文字偏转角度
  @Input() public gridBottom: number = 5; // 坐标轴整体距离底部的距离（百分比）
  @Input() public color: Array<any> = ['#2246D5', '#3B86FF', '#91E5FF', '#FF515A', '#8B5CFF', '#00CA69']; // 基础配色
  @Output() public chartClick = new EventEmitter<any>();
  public option: any; // 统计图基础配置项

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartData) {
      // const data = this.echartData.barData;
      const bardata = [];
      const barBottomData = [];
      const barTopData = [];
      const bardataTrans = [];
      this.echartData.barData.forEach((item) => {
        if (item < 0) {
          bardata.push({
            value: item,
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(59,134,255)'
                  }, {
                    offset: 1,
                    color: '#58C1F9'
                  }]
                }
              }
            },
          });
          barBottomData.push({
            value: item,
            symbolOffset: [0, -10],
            itemStyle: {
              normal: {
                color: 'rgba(61,138,254,1)'
              }
            },
          });
          barTopData.push({
            value: item,
            symbolOffset: [0, 10],
          });
          bardataTrans.push({
            value: item - 5,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            label: {
              show: true,
              color: '#448BFF',
              position: 'bottom',
              formatter: () => {
                return item;
              },
            },
          });
        }
        else {
          bardata.push({
            value: item,
            itemStyle: {
              normal: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: 'linear',
                  global: false,
                  colorStops: [{
                    offset: 0,
                    color: '#58C1F9'
                  }, {
                    offset: 1,
                    color: 'rgba(59,134,255)'
                  }]
                }
              }
            },
          });
          barBottomData.push({
            value: item,
            symbolOffset: [0, 10],
          });
          barTopData.push({
            value: item,
            symbolOffset: [0, -10],
          });
          bardataTrans.push({
            value: item + 3,
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            label: {
              show: true,
              color: '#448BFF',
              position: 'top',
              formatter: () => {
                return item;
              },
            },
          });
        }
      });
      this.updateOption(this.echartData.xdata, bardata, barBottomData, barTopData, bardataTrans);
    }
  }

  private updateOption(xdata, bardata, barBottomData, barTopData, bardataTrans): void {
    this.option = {
      title: {
        text: this.title,
        left: 26,
        top: 5,
        textStyle: {
          color: '#4D4F5C',
          fontSize: 18,
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b} : {c}',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '5%',
        top: '15%',
        right: '5%',
        bottom: '15%',
      },
      legend: {
        show: true,
        icon: 'circle',
        orient: 'horizontal',
        top: '90.5%',
        right: 'center',
        itemWidth: 16.5,
        itemHeight: 6,
        textStyle: {
          color: '#C9C8CD',
          fontSize: 14
        }
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
          show: true,
          lineStyle: {
            color: 'rgba(255,0,0,0.5)',
            width: 2
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.1)'
          }
        },
        data: xdata,
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
        // 柱底圆片
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: [30, 20],
          z: 12,
          itemStyle: {
            normal: {
              color: 'rgba(61,138,254,1)'
            }
          },
          data: barBottomData
        },
        // 柱体
        {
          name: '',
          type: 'bar',
          barWidth: 30,
          barGap: '0%',
          data: bardata
        },
        // 柱顶圆片
        {
          name: '',
          type: 'pictorialBar',
          symbolSize: [30, 20],
          z: 12,
          symbolPosition: 'end',
          'itemStyle': {
            'normal': {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
                [{
                  offset: 0,
                  color: '#58C1F9'
                },
                  {
                    offset: 1,
                    color: '#3F8EFE'
                  }
                ],
                false
              ),
            }
          },
          data: barTopData
        },
        // 透明柱体
        {
          name: '',
          type: 'bar',
          barWidth: 30,
          barGap: '-100%', /*此属性设置两个柱状图的间隔位置*/
          data: bardataTrans
        },
      ]
    };
  }

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }

}
