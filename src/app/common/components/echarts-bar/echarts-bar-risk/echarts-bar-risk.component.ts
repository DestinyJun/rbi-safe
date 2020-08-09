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
  public baseNum = 0.01;
  constructor(
    private srService: SecurityRiskService
  ) { }
  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.echartData);
    this.updateRiskLevelOption();
  }
  // public hexToRgba(hex, opacity): string {
  //   let rgbaColor = '';
  //   const reg = /^#[\da-f]{6}$/i;
  //   if (reg.test(hex)) {
  //     rgbaColor = `rgba(${Number('0x' + hex.slice(1, 3))},${Number(
  //       '0x' + hex.slice(3, 5)
  //     )},${Number('0x' + hex.slice(5, 7))},${opacity})`;
  //   }
  //   return rgbaColor;
  // }
  //
  //



  private updateRiskLevelOption(): void {

    const x = [];
    const y = [];

    console.log(this.echartData);
    for (const key in this.echartData) {
      x.push(this.echartData[key] + this.baseNum);
      y.push(key);
    }

    this.option = {
      title: {
        text: this.title,
        left: 26,
        top: 26,
        textStyle: {
          color: '#4D4F5C',
          fontSize: 18,
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: (val) => {
          let color = '';
          if ((val[0].axisValue === 'E' || val[0].axisValue === 'G') && val[0].value > x[val[0].dataIndex]) {
            color = '#FCE149';
          } else {
            color = '#37C611';
          }
          return `<span style="color:${color};">   ● </span>${val[0].name} : ${Math.ceil(val[0].data - this.baseNum)}<br/>`;
        }
      },
      grid: [
        {
          left: '5%',
          right: '5%',
          bottom: 30,
          top: '30px',
        },
        {
          bottom: 30,
          left: '5%', // 为了让第2个grid显示在2个柱状图中间，中间相隔百分比为100/14
          right: '5%',
          height: 0,  //  不显示第2个grid的图表，只显示label
          // show: true,
        }
      ],
      legend: {
        data: ['区域内', '区域外'],
        right: '10%',
        top: '3%',
        textStyle: {
          color: '#AAAAAA'
        },
        itemWidth: 16,
        itemHeight: 16,
        borderRadius: 10,  // borderRadius最大为宽高最小值的一半，即为5
        itemGap: 30
      },
      yAxis: [
        {
          type: 'value',
          min: (value) => {
            return this.baseNum * 10;
          },
          max: (value) => {
            return value.max > 10 ? value.max : 10;
          },
          gridIndex: 0,
          axisLine: {
            show: false,
            onZero: true
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          }
        },
        {
          type: 'value',
          gridIndex: 1,
          axisLine: {
            show: false,
            onZero: true
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        }
      ],
      xAxis: [{
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
        },
        data: y,
        zlevel: 2
      },
        {
          type: 'category',
          gridIndex: 1,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#A3B4E5',
              fontSize: '14px'
            }
          },
          zlevel: 1,
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,

          },
          data: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']  //  必须写data数据
        }
      ],
      series: [
        {
          name: this.title,
          type: 'bar',
          barWidth: 10,
          barGap: '40%', // 不同系列的柱间距离  为barWidth的 1.5倍
          // barCateGoryGap: 40,  //同一系列的柱间距离，默认为类目间距的20%，可设固定值
          itemStyle: {
            normal: {
              color: '#63DCAF',
              barBorderRadius: 11,
            }
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              fontSize: 11,
              color: '#48FAB1',
              formatter: (val) => {
                return `${val.value}s`;
              }
            }
          },
          data: x,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          type: 'bar',
          xAxisIndex: 1, //  表示第2个grid的数据
          yAxisIndex: 1
        }
      ]
    };
  }


  private getZhCode(str: string) {
    switch (str) {
      case 'Ⅰ': return 1;
      case 'Ⅱ': return 2;
      case 'Ⅲ': return 4;
      case 'Ⅳ': return 6;
      case 'Ⅴ': return 16;
      default: return 0;
    }
  }
}
