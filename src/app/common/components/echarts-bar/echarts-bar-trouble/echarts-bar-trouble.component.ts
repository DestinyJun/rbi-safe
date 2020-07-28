import { Component, OnInit } from '@angular/core';
import {TroubleCheckStatusService} from "../../../services/trouble-check-status.service";

@Component({
  selector: 'app-echarts-bar-trouble',
  templateUrl: './echarts-bar-trouble.component.html',
  styleUrls: ['./echarts-bar-trouble.component.scss']
})
export class EchartsBarTroubleComponent implements OnInit {

  public option: any;
  public data = [];
  public min = 50;
  constructor(
    private req: TroubleCheckStatusService
  ) { }

  ngOnInit() {
    this.req.findByMonth().subscribe(res => {
      console.log(res);
      this.data = [];
      for (const key in res.data) {
        this.data.push({name: key, value: res.data[key]});
      }
      this.data = this.data.sort((a, b ) => {
        return this.getMonthCode(a.name) - this.getMonthCode(b.name);
      });
      console.log(this.data);
      this.updateOption();
    });
  }

  private updateOption(): void {
    // tslint:disable-next-line:one-variable-per-declaration
    const xData = [], yData = [];
    this.data.map((a, b) => {
      xData.push(a.name);
      yData.push(a.value + this.min);
    });
    this.option = {
      title: {
        text: '月隐患数统计'
      },
      backgroundColor: '#fff',
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            opacity: 0
          }
        },
        formatter: (prams) => {
          return '隐患数：' + (prams[0].data - this.min);
        }
      },
      legend: {
        data: ['直接访问', '背景'],
        show: false
      },
      grid: {
        left: '0%',
        right: '0%',
        bottom: '5%',
        top: '7%',
        height: '85%',
        containLabel: true,
        z: 22
      },
      xAxis: [{
        type: 'category',
        gridIndex: 0,
        data: xData,
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#0c3b71'
          }
        },
        axisLabel: {
          color: 'rgb(170,170,170)',
          fontSize: 16
        }
      }],
      yAxis: [{
        type: 'value',
        gridIndex: 0,
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        min: this.min,
        max: 100,
        axisLine: {
          show: false,
          lineStyle: {
            color: '#0c3b71'
          }
        },
        axisLabel: {
          show: false,
          color: 'rgb(170,170,170)',
          formatter: '{value} %'
        }
      },
        {
          type: 'value',
          gridIndex: 0,
          min: this.min,
          max: 100,
          splitNumber: 10,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.0)', 'rgba(250,250,250,0.05)']
            }
          }
        }
      ],
      series: [{
        name: '合格率',
        type: 'bar',
        barWidth: '20%',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: {
          normal: {
            barBorderRadius: 20,
            color: '#9DC3FF'
          }
        },
        data: yData,
        zlevel: 11

      },

      ]
    };
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
