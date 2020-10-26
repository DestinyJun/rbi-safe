import { Component, OnInit } from '@angular/core';
import {TroubleCheckStatusService} from '../../../services/trouble-check-status.service';
import {graphic} from "echarts";

@Component({
  selector: 'app-echarts-bar-trouble',
  templateUrl: './echarts-bar-trouble.component.html',
  styleUrls: ['./echarts-bar-trouble.component.scss']
})
export class EchartsBarTroubleComponent implements OnInit {

  public hiddenDangerOption: any;
  public hiddenDangerData = [];
  public hiddenDangerTitle: any = '月隐患数统计';

  public bgColor: string = '#fff';
  public color: Array<any> = [ '#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];

  constructor(
    private req: TroubleCheckStatusService
  ) { }

  ngOnInit() {
    // 月隐患数统计
    this.req.findByMonth().subscribe(res => {
      this.hiddenDangerData = [];
      for (const dataKey in res.data) {
        this.hiddenDangerData.push({name: dataKey, value: res.data[dataKey]});
      }
      console.log(this.hiddenDangerData);
      // 排序根据名称
      this.hiddenDangerData = this.hiddenDangerData.sort((a, b) => {
        return this.getMonthCode(a.name) - this.getMonthCode(b.name);
      });
      // 画图
      this.updateHiddenDangerOption();
    });
  }

  private updateHiddenDangerOption(): void {
    let xAxisData: any;
    let yAxisData: any;
    if (this.hiddenDangerData && this.hiddenDangerData.length > 0) {
      xAxisData = this.hiddenDangerData.map( v => v.name);
      yAxisData = this.hiddenDangerData.map(v => v.value);
    }

    this.hiddenDangerOption =  {
      title: {
        text: this.hiddenDangerTitle,
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
                ${v.axisValueLabel}
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
      series: [
        {
          name: this.hiddenDangerTitle,
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
          data: yAxisData
        }]
    };
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

  private getMonthCode(str: string) {
    switch (str) {
      case '1月': return 1;
      case '2月': return 2;
      case '3月': return 4;
      case '4月': return 8;
      case '5月': return 16;
      case '6月': return 32;
      case '7月': return 64;
      case '8月': return 128;
      case '9月': return 258;
      case '10月': return 512;
      case '11月': return 1024;
      case '12月': return 2048;
      default: return 0;
    }
  }

}
