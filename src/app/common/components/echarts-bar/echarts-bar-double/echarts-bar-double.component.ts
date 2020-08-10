import {Component, OnInit} from '@angular/core';
import {GeneralInfoService} from "../../../services/general-info.service";

@Component({
  selector: 'app-echarts-bar-double',
  templateUrl: './echarts-bar-double.component.html',
  styleUrls: ['./echarts-bar-double.component.scss']
})
export class EchartsBarDoubleComponent implements OnInit {
  public option: any;

  constructor(private builletinSrv: GeneralInfoService) {
  }

  ngOnInit() {

    // const seriesName = ['岗位员工\n安全培训', '外来人员\n安全培训', '应急救援\n培训', '受限空间\n作业培训', '全员安全持证\n复审培训', '相关方\n安全培训', '岗位员工\n安全培训'];
    // const threshold = [60, 90, 50, 70, 85, 95, 55];
    // const avgTime = [55, 80, 45, 44, 38, 72, 63];

    const seriesName = [];
    const threshold = [];
    const avgTime = [];
    const baseNum = 0.01;

    this.builletinSrv.getAver(null).subscribe(res => {
      console.log(res);
      res.data.forEach(value => {
        seriesName.push(value.trainingContent);
        avgTime.push((value.average + baseNum).toFixed(3));
        threshold.push((value.averageClassHours + baseNum).toFixed(3));
      });
      this.updateOption(seriesName, threshold, avgTime, baseNum);
    });
  }

  private updateOption(seriesName, threshold, avgTime, baseNum): void {
    this.option = {
      title: {
        text: '安全管理培训计划',
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
          if ((val[0].axisValue === 'E' || val[0].axisValue === 'G') && val[0].value > threshold[val[0].dataIndex]) {
            color = '#FCE149';
          } else {
            color = '#37C611';
          }
          return `${val[0].name}<br/>
										<span style="color:${color};">   ● </span>${val[0].seriesName}: ${parseFloat((val[0].data - baseNum).toFixed(3))}<br/>
										<span style="color:#3AB6EB;">   ● </span>${val[1].seriesName}: ${parseFloat((val[1].data - baseNum).toFixed(3))}`;
        }
      },
      grid: [
        {
          left: '5%',
          right: '12%',
          bottom: 70,
          top: '60px',
        },
        {
          bottom: 70,
          left: '11%', // 为了让第2个grid显示在2个柱状图中间，中间相隔百分比为100/14
          right: '5%',
          height: 0,  //  不显示第2个grid的图表，只显示label
          // show: true,
        }
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
          min: (value) => {
            return baseNum * 10;
          },
          max: (value) => {
            return value.max > 10 ? value.max : 10;
          },
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
        data: seriesName,
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
          name: '平均成绩',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            normal: {
              color: '#226AD5',
              barBorderRadius: 12,
            },
          },
          label: {
            normal: {
              show: false,
              position: 'top',
              fontSize: 11,
              color: '#3AC712',
              formatter: (val) => {
                return `${val.value}s`;
              }
            }
          },
          data: avgTime,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: '平均学时',
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
          data: threshold,
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

}
