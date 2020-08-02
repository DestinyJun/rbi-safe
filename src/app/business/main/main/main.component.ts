import {Component, Input, OnInit} from '@angular/core';
import {GeneralInfoService} from '../../../common/services/general-info.service';
import {Router} from '@angular/router';
import {GeneralInfoClass} from '../../../common/public/Api';
import {SecurityRiskService} from "../../../common/services/security-risk.service";
import {graphic} from "echarts";
import {TroubleCheckStatusService} from "../../../common/services/trouble-check-status.service";
import Viewer from 'viewerjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public hiddenDangerOption: any;
  public hiddenDangerData = [];
  public hiddenDangerTitle: any = '月隐患数统计';


  public riskLevelOption: any;
  public riskLevelData = [];
  public riskLevelTitle: any = '风险等级数量统计';




  public mainPageNo: number = 1;
  public genneralInfoList: Array<object> = [];
  public showDetailDialog: boolean = false;
  public genneralInfoData: GeneralInfoClass = new GeneralInfoClass();


  public bgColor: string = '#fff';
  public color: Array<any> = [ '#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];


  constructor(
    private builletinSrv: GeneralInfoService,
    private router: Router,
    private srService: SecurityRiskService,
    private req: TroubleCheckStatusService
  ) {
  }

  ngOnInit() {
    //
    // const viewer = new Viewer(document.getElementById('image'), {
    //   inline: true,
    //   viewed() {
    //     viewer.zoomTo(1);
    //   },
    // });

    // 月隐患数统计
    this.req.findByMonth().subscribe(res => {
      // console.log(res);
      this.hiddenDangerData = [];
      for (const dataKey in res.data) {
        this.hiddenDangerData.push({name: dataKey, value: res.data[dataKey]});
      }
      // 排序根据名称
      this.hiddenDangerData = this.hiddenDangerData.sort((a, b) => {
        return this.getMonthCode(a.name) - this.getMonthCode(b.name);
      });
      // 画图
      this.updateHiddenDangerOption();
    });

    // 风险等级
    this.srService.findByGrade().subscribe(res => {
      console.log(res);
      this.riskLevelData = res.data;
      console.log(this.riskLevelData);
      this.updateRiskLevelOption();
    });

    this.initMainData();
  }

  public initMainData(): void {
    this.builletinSrv.getBulletinBoradPageData({pageNo: this.mainPageNo, pageSize: 3}).subscribe((res) => {
      this.genneralInfoList = res.data.contents;
      // console.log(this.genneralInfoList);
    });
  }
  // 查看更多信息
  public  lookGenneralInfoClick(): void {
      this.router.navigate(['/home/genneral/board']);
  }
  // 点击查看详情
  public  generalInfoItemClick(data): void {
      this.genneralInfoData.content = data.content;
      this.genneralInfoData.title = data.title;
      this.genneralInfoData.file = data.annex.slice(data.annex.lastIndexOf('/') + 1);
      this.genneralInfoData.filePath = data.annex;
      this.showDetailDialog = true;
  }
  // 下载附件
  public downFile(e): void {
    window.open(e);
  }


  private updateHiddenDangerOption(): void {
    let xAxisData: any;
    let yAxisData: any;
    if (this.hiddenDangerData && this.hiddenDangerData.length > 0) {
      xAxisData = this.hiddenDangerData.map( v => v.name);
      yAxisData = this.hiddenDangerData.map(v => v.value);
    }

    this.hiddenDangerOption =  {
      title: {
        text: this.hiddenDangerTitle,
        fontSize: 12,
        left: 20
      },
      backgroundColor: this.bgColor,
      color: this.color,
      legend: {
        right: 10,
        top: 10
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          let html = '';
          params.forEach(v => {
            html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${this.color[v.componentIndex]};"></span>
                ${v.seriesName}
                <span style="color:${this.color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                件`;
          });
          return html;
        },
        extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: '#ffffff',
            shadowColor: 'rgba(225,225,225,1)',
            shadowBlur: 5
          }
        }
      },
      grid: {
        top: 50,
        bottom: 10,
        left: 20,
        right: 20,
        containLabel: true
      },
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLabel: {
          formatter: '{value}',
          textStyle: {
            color: '#333'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#D9D9D9'
          }
        },
        data: xAxisData
      }],
      yAxis: [{
        type: 'value',
        // name: '单位：万千瓦时',
        axisLabel: {
          textStyle: {
            color: '#666'
          }
        },
        nameTextStyle: {
          color: '#666',
          fontSize: 12,
          lineHeight: 40
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#E9E9E9'
          }
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }],
      series: [
        {
        name: this.hiddenDangerTitle,
        type: 'line',
        smooth: true,
        // showSymbol: false,
        symbolSize: 8,
        zlevel: 3,
        lineStyle: {
          normal: {
            color: this.color[1],
            shadowBlur: 3,
            shadowColor: this.hexToRgba(this.color[1], 0.5),
            shadowOffsetY: 8
          }
        },
        areaStyle: {
          normal: {
            color: new graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [{
                  offset: 0,
                  color: this.hexToRgba(this.color[1], 0.3)
                },
                  {
                    offset: 1,
                    color: this.hexToRgba(this.color[1], 0.1)
                  }
                ],
                false
            ),
            shadowColor: this.hexToRgba(this.color[1], 0.1),
            shadowBlur: 10
          }
        },
        data: yAxisData
      }]
    };
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
        const level = {name: riskLevelDatumKey, value:  val};
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
										<span style="color:${color};">   ● </span>${val[0].seriesName}: ${val[0].data}<br/>
										<span style="color:#3AB6EB;">   ● </span>${val[1].seriesName}: ${val[1].data}`;
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

  public hexToRgba(hex, opacity): string {
    let rgbaColor = '';
    const reg = /^#[\da-f]{6}$/i;
    if (reg.test(hex)) {
      rgbaColor = `rgba(${Number('0x' + hex.slice(1, 3))},${Number(
          '0x' + hex.slice(3, 5)
      )},${Number('0x' + hex.slice(5, 7))},${opacity})`;
    }
    return rgbaColor;
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
