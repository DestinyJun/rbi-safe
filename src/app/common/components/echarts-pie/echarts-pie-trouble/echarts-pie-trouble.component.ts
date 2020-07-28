import {Component, Input, OnInit} from '@angular/core';
import {TroubleCheckStatusService} from "../../../services/trouble-check-status.service";

@Component({
  selector: 'app-echarts-pie-trouble',
  templateUrl: './echarts-pie-trouble.component.html',
  styleUrls: ['./echarts-pie-trouble.component.scss']
})
export class EchartsPieTroubleComponent implements OnInit {

  public colorList: Array<any> = ['#226AD5', '#3B86FF', '#63DCAF', '#FCCF4F', '#94F6D2'];
  @Input() public name: string = '';
  public option: any;
  @Input() public data = [];
  public maxRadio: number;
  constructor(
    private req: TroubleCheckStatusService
  ) { }

  ngOnInit() {
    this.req.findByType().subscribe(res => {
      let max = 0;
      let tal = 0;
      for (const dataKey in res.data) {
        this.data.push({name:  dataKey + '的隐患', value: res.data[dataKey]});
        if (max < res.data[dataKey]) {
          max = res.data[dataKey];
          this.name = dataKey + '的隐患';
        }
        tal += res.data[dataKey];
      }
      this.maxRadio = Math.floor((max / tal) * 100);
      this.updateOption();
    });
  }

  private updateOption(): void {
    this.option = {
      title: {
        text: this.name,
        subtext: this.maxRadio + '%',
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
        top: '50%'
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '15%',
        top: '45%',
        itemGap: 20,
        selectedMode: false,
        icon: 'pin',
        textStyle: {
          color: '#77899c',
          rich: {
            uname: {
              width: 20
            },
            // unum: {
            //   color: '#4ed139',
            //   width: 40,
            //   align: 'right'
            // }
          }
        },
        formatter: (name) => {
          // let value =  0;
          // this.data.forEach(v => {
          //   if (name === v.name) {
          //     value = v.value;
          //   }
          // });
          // return `{uname|${name}}{unum|${value}}`;
          return `{uname|${name}}`;
        }
      },
      color: this.colorList,
      series: [
        {
          name: '隐患类型',
          type: 'pie',
          radius: ['45%', '60%'],
          center: ['35%', '60%'],
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: this.data,
        }
      ]
    };
  }
}
