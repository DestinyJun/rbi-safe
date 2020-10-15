import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {GeneralInfoService} from '../../../services/general-info.service';

@Component({
  selector: 'app-echarts-bar-double',
  templateUrl: './echarts-bar-double.component.html',
  styleUrls: ['./echarts-bar-double.component.scss']
})
export class EchartsBarDoubleComponent implements OnInit, OnChanges {
  @Input() public echartData: any; // 统计图数据
  @Input() public title: string = ''; // 统计图标题
  @Input() public showSplitLine: boolean = false; // 是否显示Y轴线
  @Input() public showAxisLabel: boolean = false; // 是否显示刻度值
  @Input() public axisLabelRotate: number = 0; // 横坐标类目文字偏转角度
  @Input() public gridBottom: number = 5; // 坐标轴整体距离底部的距离（百分比）
  @Input() public color: Array<any> = [ '#2246D5', '#3B86FF', '#91E5FF', '#FF515A', '#8B5CFF', '#00CA69']; // 基础配色
  public option: any; // 统计图基础配置项

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartData) {
      const series = this.echartData.data.map((item) => {
        return {
          name: item.name,
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              barBorderRadius: 12,
            },
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              fontSize: 11,
              formatter: (val) => {
                return `${val.value}s`;
              }
            }
          },
          xAxisIndex: 0,
          yAxisIndex: 0,
          data: item.value,
        };
      });
      this.updateOption(series);
    }
  }

  private updateOption(series): void {
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
      grid: [
        {
          left: '5%',
          right: '5%',
          bottom: this.gridBottom.toString() + '%',
          top: '10%',
        },
      ],
      legend: {
        data: ['平均成绩', '平均学时'],
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
            interval: 0,
            rotate: this.axisLabelRotate
          },
          data: this.echartData.xdata,
          zlevel: 2
        },
      ],
      series: series
    };
  }

}
