import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import * as echarts from 'echarts';
import { graphic } from 'echarts';

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
      /*const series = this.echartData.data.map((item) => {
        return {
          name: item.name,
          type: 'bar',
          stack: '总量',
          barGap: '50%',
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: [12, 12, 12, 12],
            },
          },
          label: {
            position: 'insideRight',
            show: false,
          },
          data: item.value,
        };
      });*/
      // this.updateOption();
    }
  }

 /* private updateOption(): void {
    // 绘制左侧面
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
        formatter: (params, ticket, callback) => {
          const item = params[1];
          return item.name + ' : ' + item.value;
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: 0,
        top: '15%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
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
        data: ['立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑'],
      },
      yAxis: {
        type: 'value',
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
          tooltip: {},
          data: MAX
        }
      ]
    };
  }*/

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }

}
