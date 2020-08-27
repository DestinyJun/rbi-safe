import { Component, OnInit } from '@angular/core';
import {SecurityRiskService} from '../../../common/services/security-risk.service';

@Component({
  selector: 'app-sr-control-status',
  templateUrl: './sr-control-status.component.html',
  styleUrls: ['./sr-control-status.component.scss']
})
export class SrControlStatusComponent implements OnInit {

  public itemTypeList: Array<object> = [
    {title: '物理危害', content: '噪音、震动、容易碰撞设备、设施有缺陷的设备....', num: 0},
    {title: '化学危害', content: 'SF6气体及其分解物、强酸、强碱、甲醛气体.....', num: 0},
    {title: '生物危害', content: '细菌、有毒的植物、昆虫(蜜蜂等)、狗、蛇、霉菌、病毒...', num: 0},
    {title: '人机工效危害', content: '设计差、不便使用的工具、狭小的作业空间、重复....', num: 0},
    {title: '其他危害', content: '社会- 心里危害、行为危害、环境危害、能源危害....', num: 0}
  ];
  public lineData: any;
  public lineTilte: any = '风险等级数量统计';

  public baseNum = 0.01;


  public riskLevelOption: any;
  public riskLevelData = [];
  public riskLevelTitle: any = '风险等级数量统计';
  constructor(
    private srService: SecurityRiskService
  ) { }

  ngOnInit() {
    // 风险等级
    this.srService.findByGrade().subscribe(res => {
      // const lineDataKey = [];
      // for (const dataKey in res.data) {
      //   lineDataKey.push(dataKey);
      // }
      // this.lineData = [];
      // for (const datumKey in res.data[lineDataKey[0]]) {
      //   this.lineData.push({name: datumKey, value1: res.data[lineDataKey[0]][datumKey], value2: res.data[lineDataKey[1]][datumKey]});
      // }
      // // 排序根据名称
      // this.lineData = this.lineData.sort((a, b) => {
      //   return this.getZhCode(a.name) - this.getZhCode(b.name);
      // });
      this.riskLevelData = res.data;
      this.updateRiskLevelOption();
    });
    // 风险危害种类占比
    this.srService.findHarmKind().subscribe(res => {
      // 记录总数
      let tal = 0;
      for (const dataKey in res.data) {
        let flag = false; // 用来判断是否有归类，没有就归属到其他
        this.itemTypeList.forEach((value: any) => {
            if (dataKey === value.title) {
              value.num = res.data[dataKey];
              tal += res.data[dataKey];
              flag = true;
            }
        });
        if (!flag) {
          this.itemTypeList.forEach((value: any) => {
            if (value.title === '其他危害') {
              value.num += res.data[dataKey];
              tal += res.data[dataKey];
            }
          });
        }
      }

      let talRadio = 0;
      // 计算百分比
      if (tal > 0) {
        this.itemTypeList.forEach((value: any) => {
          if (value.title === '其他危害') {// 这里保证相加的结果为100%
            value.num = 100 - talRadio;
            value.num = value.num.toFixed(2);
          } else {
            value.num = (value.num / tal) * 100;
            value.num = value.num.toFixed(2);
            talRadio += parseFloat(value.num);
          }
        });
      }
    });
  }


  private getZhCode(str: string) {
    switch (str) {
      case '一级': return 1;
      case '二级': return 2;
      case '三级': return 4;
      case '四级': return 6;
      case '五级': return 16;
      default: return 0;
    }
  }

  private updateRiskLevelOption(): void {

    const seriesName = [];
    const areaOut = [];
    const areaIn = [];

    const data = [];

    const keys = []; // 区域外，区域内
    for (const riskLevelDataKey in this.riskLevelData) {
      const item = {data: [], name: ''};
      item.name = riskLevelDataKey;
      for (const riskLevelDatumKey in this.riskLevelData[riskLevelDataKey]) {
        let val = this.riskLevelData[riskLevelDataKey][riskLevelDatumKey];
        // val = val === 0 ? 1 : val;
        const level = {name: riskLevelDatumKey, value:  val + this.baseNum};
        item.data.push(level);
      }
      // 对区域进行排序
      item.data = item.data.sort((a, b) => {
        return this.getZhCode(a.name) - this.getZhCode(b.name);
      });
      data.push(item);
    }

    data[0].data.forEach(item => {
      seriesName.push(item.name);
      areaOut.push(item.value);
    });
    data[1].data.forEach(item => {
      areaIn.push(item.value);
    });
    // for (const riskLevelDataKey in this.riskLevelData) {
    //
    // }
    // for (const levelKey in this.riskLevelData[keys[0]]) {
    //   seriesName.push(levelKey);
    //
    //   areaIn.push(this.riskLevelData[keys[1]][levelKey]);
    // }

    this.riskLevelOption = {
      title: {
        text: this.riskLevelTitle,
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
          if ((val[0].axisValue === 'E' || val[0].axisValue === 'G') && val[0].value > areaOut[val[0].dataIndex]) {
            color = '#FCE149';
          } else {
            color = '#37C611';
          }
          return `${val[0].name}<br/>
										<span style="color:${color};">   ● </span>${val[0].seriesName}: ${Math.ceil(val[0].data - this.baseNum)}<br/>
										<span style="color:#3AB6EB;">   ● </span>${val[1].seriesName}: ${Math.ceil(val[1].data - this.baseNum)}`;
        }
      },
      grid: [
        {
          left: '5%',
          right: '5%',
          bottom: 30,
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
          min: (value) => {
            return this.baseNum * 10;
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
          name: '区域内',
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
          data: areaIn,
          xAxisIndex: 0,
          yAxisIndex: 0
        },
        {
          name: '区域外',
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
          data: areaOut,
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
