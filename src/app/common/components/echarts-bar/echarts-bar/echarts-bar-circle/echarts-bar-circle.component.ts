import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { graphic } from 'echarts';
@Component({
  selector: 'app-echarts-bar-circle',
  templateUrl: './echarts-bar-circle.component.html',
  styleUrls: ['./echarts-bar-circle.component.scss']
})
export class EchartsBarCircleComponent implements OnInit, OnChanges {

  @Input() public echartData: any; // 统计图数据
  @Input() public title: any; // 统计图标题
  @Input() public color: Array<any> = [ '#227BD5']; // 列表颜色
  @Output() public chartClick = new EventEmitter<any>();
  public option: any; // 统计图基础配置项
  constructor() { }
  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.updateRiskLevelOption();
  }

  // 图表数据渲染配置
  private updateRiskLevelOption(): void {
    const handred = 100;
    this.option = {
      title: {
        text: this.echartData + '%',
        x: 'center',
        y: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: this.color,
          fontSize: 14
        }
      },
      tooltip: {
        show: false,
      },
      legend: {
        show: false,
      },
      series: [
        {
          name: 'circle',
          type: 'pie',
          clockWise: true,
          radius: ['50%', '63%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [
            {
            value: this.echartData,
            itemStyle: {
              color: this.color,
            }
          },
            {
            value: handred - this.echartData,
            itemStyle: {
              normal: {
                color: '#E1E8EE'
              }
            }
          }
          ]
        }
      ]
    };
  }

  // 图表点击事件
  public onClick(event) {
    this.chartClick.emit(event);
  }

}
