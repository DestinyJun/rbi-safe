import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-echarts-pie-trouble',
  templateUrl: './echarts-pie-trouble.component.html',
  styleUrls: ['./echarts-pie-trouble.component.scss']
})
export class EchartsPieTroubleComponent implements OnInit, OnChanges {
  @Input() public echartData: any; // 统计图数据
  @Input() public title: string = ''; // 统计图标题
  @Input() public color: Array<any> = [
    '#2246D5', '#226AD5', '#3B86FF', '#58C1F9', '#63DCAF',
    '#FFC06A', '#FCCF4F', '#FF6A7E', '#91E5FF',
  ]; // 基础配色
  public option: any;
  constructor() { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.echartData) {
      // console.log(this.echartData);
      this.updateOption();
    }
  }

  private updateOption(): void {
    this.option = {
      title: {
        text: this.title,
        textStyle: {
          fontSize: 14,
          color: '#545663',
          lineHeight: 20
        },
        subtextStyle: {
          fontSize: 20,
          color: '#5797FF'
        },
        textAlign: 'center',
        left: '34.5%',
        top: '48%'
      },
      tooltip: {
        trigger: 'item',
        borderColor: 'rgba(255,255,255,.3)',
        backgroundColor: 'rgba(13,5,30,.6)',
        borderWidth: 1,
        padding: 5,
        formatter: (parms) => {
          return parms.marker + '' + parms.data.name + '</br>' +
            '数量：' + parms.data.value + '起</br>' +
            '占比：' + parms.percent + '%';
        }
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '15%',
        top: 'center',
        itemGap: 20,
        selectedMode: false,
        icon: 'pin',
        textStyle: {
          color: '#77899c',
          rich: {
            uname: {
              width: 20
            },
          }
        },
        formatter: (name, index) => {
          return `{uname|${name}}`;
        }
      },
      color: this.color,
      series: [
        {
          name: '占比统计：',
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['35%', '50%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: this.echartData,
        }
      ]
    };
  }
}
