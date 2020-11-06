import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
// declare const echarts;

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
  public graphic: any = echarts.graphic; // 统计图基础配置项

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartData) {
      // console.log(this.echartData);
      // console.log(echarts.graphic);
      const data = this.echartData.barData;
      const sideData = data.map(item => {
        if (item === 0) {
          return 0;
        } else {
          return (item + 1.2);
        }
      });
      this.updateOption(this.echartData.xdata, data, sideData);
    }
  }

  private updateOption(xdata, data, sideData): void {
  /*  // 绘制左侧面
    const CubeLeft = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: (ctx, shape) => {
        // 会canvas的应该都能看得懂，shape是从custom传入的
        const xAxisPoint = shape.xAxisPoint;
        const c0 = [shape.x, shape.y];
        const c1 = [shape.x - 13, shape.y - 13];
        const c2 = [xAxisPoint[0] - 13, xAxisPoint[1] - 13];
        const c3 = [xAxisPoint[0], xAxisPoint[1]];
        ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
      }
    });
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: (ctx, shape) => {
        const xAxisPoint = shape.xAxisPoint;
        const c1 = [shape.x, shape.y];
        const c2 = [xAxisPoint[0], xAxisPoint[1]];
        const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
        const c4 = [shape.x + 18, shape.y - 9];
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
      }
    });
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
      shape: {
        x: 0,
        y: 0
      },
      buildPath: (ctx, shape) => {
        const c1 = [shape.x, shape.y];
        const c2 = [shape.x + 18, shape.y - 9];
        const c3 = [shape.x + 5, shape.y - 22];
        const c4 = [shape.x - 13, shape.y - 13];
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
      }
    });
    // 注册三个面图形
    echarts.graphic.registerShape('CubeLeft', CubeLeft);
    echarts.graphic.registerShape('CubeRight', CubeRight);
    echarts.graphic.registerShape('CubeTop', CubeTop);

    const MAX = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300];
    const VALUE = [21.9, 26.8, 24.2, 54.9, 74.5, 78.3, 119.0, 126.9, 190.8, 123.2, 156.2, 169.3, 179.5, 155.5];
    this.option = {
      backgroundColor: '#012366',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params, ticket, callback) => {
          const item = params[1];
          return item.name + ' : ' + item.value;
        }
      },
      grid: {
        left: 40,
        right: 40,
        bottom: 100,
        top: 100,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: ['立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑'],
        axisLine: {
          show: false,
          lineStyle: {
            color: 'white'
          }
        },
        offset: 25,
        axisTick: {
          show: false,
          length: 9,
          alignWithLabel: true,
          lineStyle: {
            color: '#7DFFFD'
          }
        },
        axisLabel: {
          show: true,
          fontSize: 16
        },
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false,
          lineStyle: {
            color: 'white'
          }
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          show: false,
          fontSize: 16
        },
        boundaryGap: ['20%', '20%']
      },
      series: [
        {
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: 'group',
            children: [{
              type: 'CubeLeft',
              shape: {
                api,
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: 'rgba(47,102,192,.27)'
              }
            }, {
              type: 'CubeRight',
              shape: {
                api,
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: 'rgba(59,128,226,.27)'
              }
            }, {
              type: 'CubeTop',
              shape: {
                api,
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: 'rgba(72,156,221,.27)'
              }
            }]
          };
        },
        data: MAX
      },
        {
        type: 'custom',
        renderItem: (params, api) => {
          const location = api.coord([api.value(0), api.value(1)]);
          const color = api.value(1) > 2000 ? 'red' : new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(67,102,243,1)'
          },
            {
              offset: 1,
              color: 'rgba(29,67,243,1)'
            }
          ]);
          return {
            type: 'group',
            children: [{
              type: 'CubeLeft',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: color
              }
            }, {
              type: 'CubeRight',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: color
              }
            }, {
              type: 'CubeTop',
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0])
              },
              style: {
                fill: color
              }
            }]
          };
        },
        data: VALUE
      },
        {
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'top',

            fontSize: 16,
            color: '#fff',
            offset: [2, -25]
          }
        },
        itemStyle: {
          color: 'transparent'
        },
        tooltip: {

        },
        data: MAX
      }
      ]
    };*/
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
        formatter: '{b} : {c}%',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
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
          show: false
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
        {
        name: 'a',
        type: 'bar',
        label: {
          show: true,
          color: '#448BFF',
          position: [0, -25],
          formatter: '{c}%',
        },
        barWidth: 24.5,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#0B4EC3' // 0% 处的颜色
            }, {
              offset: 0.6,
              color: '#138CEB' // 60% 处的颜色
            }, {
              offset: 1,
              color: '#17AAFE' // 100% 处的颜色
            }], false)
          }
        },
        data: data,
        barGap: 0
      },
        {
        type: 'bar',
        tooltip: {
            show: false
          },
        barWidth: 8,
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
              offset: 0,
              color: '#09337C' // 0% 处的颜色
            }, {
              offset: 0.6,
              color: '#0761C0' // 60% 处的颜色
            }, {
              offset: 1,
              color: '#0575DE' // 100% 处的颜色
            }], false)
          }
        },
        barGap: 0,
        data: sideData
      },
        {
        name: 'b',
        tooltip: {
          show: false
        },
        type: 'pictorialBar',
        itemStyle: {
          borderWidth: 1,
          borderColor: '#0571D5',
          color: '#1779E0'
        },
        symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
        symbolSize: ['30', '12'],
        symbolOffset: ['0', '-11'],
        symbolPosition: 'end',
        data: data,
        z: 3
      }
      ]
    };
  }

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }

}
