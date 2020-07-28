import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { graphic } from 'echarts';
import {SecurityRiskService} from '../../../services/security-risk.service';

@Component({
  selector: 'app-echarts-bar-risk',
  templateUrl: './echarts-bar-risk.component.html',
  styleUrls: ['./echarts-bar-risk.component.scss']
})
export class EchartsBarRiskComponent implements OnInit, OnChanges {

  public bgColor: string = '#fff';
  public color: Array<any> = [ '#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];
  @Input()
  public echartData: any;
  @Input()
  public title: any;
  public option: any;
  constructor(
    private srService: SecurityRiskService
  ) { }
  ngOnInit() {
  }
  public hexToRgba(hex, opacity): string {
    let rgbaColor = '';
    const reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
      rgbaColor = `rgba(${Number('0x' + hex.slice(1, 3))},${Number(
        '0x' + hex.slice(3, 5)
      )},${Number('0x' + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
  }




  ngOnChanges(changes: SimpleChanges): void {
    let xAxisData: any;
    let yAxisData1: any;
    let yAxisData2: any;
    if (this.echartData && this.echartData.length > 0) {
      xAxisData = this.echartData.map( v => v.name);
//  ["1", "2", "3", "4", "5", "6", "7", "8"]
      yAxisData1 = this.echartData.map(v => v.value1);
// [100, 138, 350, 173, 180, 150, 180, 230]
      yAxisData2 = this.echartData.map(v => v.value2);
    }
    this.option =  {
      title: {
        text: this.title,
        fontSize: 12,
        left: 20
      },
      backgroundColor: this.bgColor,
      color: this.color,
      legend: {
        right: 10,
        top: 10
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          let html = '';
          params.forEach(v => {
            html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${this.color[v.componentIndex]};"></span>
                ${v.seriesName}
                <span style="color:${this.color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                件`;
          });
          return html;
        },
        extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: '#ffffff',
            shadowColor: 'rgba(225,225,225,1)',
            shadowBlur: 5
          }
        }
      },
      grid: {
        top: 50,
        bottom: 10,
        left: 20,
        right: 20,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#333'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#D9D9D9'
          }
        },
        data: xAxisData
      }],
      yAxis: [{
        type: 'value',
        // name: '单位：万千瓦时',
        axisLabel: {
          textStyle: {
            color: '#666'
          }
        },
        nameTextStyle: {
          color: '#666',
          fontSize: 12,
          lineHeight: 40
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#E9E9E9'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }],
      series: [{
        name: '区域内',
        type: 'line',
        smooth: true,
        // showSymbol: false,/
        symbolSize: 8,
        zlevel: 3,
        lineStyle: {
          normal: {
            color: this.color[0],
            shadowBlur: 3,
            shadowColor: this.hexToRgba(this.color[0], 0.5),
            shadowOffsetY: 8
          }
        },
        areaStyle: {
          normal: {
            color: new graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                offset: 0,
                color: this.hexToRgba(this.color[0], 0.3)
              },
                {
                  offset: 1,
                  color: this.hexToRgba(this.color[0], 0.1)
                }
              ],
              false
            ),
            shadowColor: this.hexToRgba(this.color[0], 0.1),
            shadowBlur: 10
          }
        },
        data: yAxisData1
      }, {
        name: '区域外',
        type: 'line',
        smooth: true,
        // showSymbol: false,
        symbolSize: 8,
        zlevel: 3,
        lineStyle: {
          normal: {
            color: this.color[1],
            shadowBlur: 3,
            shadowColor: this.hexToRgba(this.color[1], 0.5),
            shadowOffsetY: 8
          }
        },
        areaStyle: {
          normal: {
            color: new graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [{
                offset: 0,
                color: this.hexToRgba(this.color[1], 0.3)
              },
                {
                  offset: 1,
                  color: this.hexToRgba(this.color[1], 0.1)
                }
              ],
              false
            ),
            shadowColor: this.hexToRgba(this.color[1], 0.1),
            shadowBlur: 10
          }
        },
        data: yAxisData2
      }]
    };
  }
}
