import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { graphic } from 'echarts';
import {SecurityRiskService} from '../../../services/security-risk.service';

@Component({
  selector: 'app-echarts-bar-risk',
  templateUrl: './echarts-bar-risk.component.html',
  styleUrls: ['./echarts-bar-risk.component.scss']
})
export class EchartsBarRiskComponent implements OnInit, OnChanges {

  @Input() public echartData: any; // 统计图数据
  @Input() public title: any; // 统计图标题
  @Input() public showSplitLine: boolean = false; // 是否显示Y轴线
  @Input() public showAxisLabel: boolean = false; // 是否显示刻度值
  @Input() public barColor: string = '#36CE9E'; // 柱状图颜色
  @Output() public chartClick = new EventEmitter<any>();
  public color: Array<any> = [ '#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];
  public option: any; // 统计图基础配置项
  constructor() { }
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartData) {
      console.log(this.echartData);
      this.updateRiskLevelOption();
    }
  }

  // 图表数据渲染配置
  private updateRiskLevelOption(): void {
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
          return `<span style="color:${val[0].color};">   ● </span>${val[0].name} : ${Math.ceil(val[0].data)}<br/>`;
        }
      },
      grid: [
        {
          left: '5%',
          right: '5%',
          bottom: 30,
          top: '10%',
        },
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
          gridIndex: 0,
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
        },
        data: this.echartData.xdata,
        zlevel: 2
      },
      ],
      series: [
        {
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: this.barColor,
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
          data: this.echartData.ydata,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
      ]
    };
  }

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }
}
