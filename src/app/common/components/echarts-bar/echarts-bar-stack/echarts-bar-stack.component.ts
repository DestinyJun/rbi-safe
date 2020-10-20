import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-bar-stack',
  templateUrl: './echarts-bar-stack.component.html',
  styleUrls: ['./echarts-bar-stack.component.scss']
})
export class EchartsBarStackComponent implements OnInit, OnChanges {

  @Input() public echartData: any; // 统计图数据
  @Input() public title: string = ''; // 统计图标题
  @Input() public showSplitLine: boolean = false; // 是否显示Y轴线
  @Input() public showAxisLabel: boolean = false; // 是否显示刻度值
  @Input() public axisLabelRotate: number = 0; // 横坐标类目文字偏转角度
  @Input() public gridBottom: number = 5; // 坐标轴整体距离底部的距离（百分比）
  @Input() public color: Array<any> = [ '#2246D5', '#3B86FF', '#91E5FF', '#FF515A', '#8B5CFF', '#00CA69']; // 基础配色
  @Output() public chartClick = new EventEmitter<any>();
  public option: any; // 统计图基础配置项

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartData) {
      const series = this.echartData.data.map((item) => {
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
          bottom: '8%',
          top: '10%',
        },
      ],
      legend: {
        right: '10%',
        top: '3%',
        textStyle: {
          color: '#AAAAAA'
        },
        itemWidth: 16,
        itemHeight: 16,
        borderRadius: 10,  // borderRadius最大为宽高最小值的一半，即为5
        itemGap: 30,
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
        data: this.echartData.xdata,
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
      series: series
    };
  }

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }

}
