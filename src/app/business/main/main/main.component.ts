import {Component, Input, OnInit} from '@angular/core';
import {GeneralInfoService} from '../../../common/services/general-info.service';
import {Router} from '@angular/router';
import {GeneralInfoClass} from '../../../common/public/Api';
import {SecurityRiskService} from "../../../common/services/security-risk.service";
import {graphic} from "echarts";
import {TroubleCheckStatusService} from "../../../common/services/trouble-check-status.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public riskLevelOption: any;
  public riskLevelData = [];
  public riskLevelTitle: any = '风险等级数量统计';


  public baseNum = 0.01;


  public mainPageNo: number = 1;
  public genneralInfoList: Array<object> = [];
  public showDetailDialog: boolean = false;
  public genneralInfoData: GeneralInfoClass = new GeneralInfoClass();

  public color: Array<any> = [ '#0090FF', '#36CE9E', '#FFC005', '#FF515A', '#8B5CFF', '#00CA69'];


  constructor(
    private builletinSrv: GeneralInfoService,
    private router: Router,
    private srService: SecurityRiskService,
    private req: TroubleCheckStatusService
  ) {
  }

  ngOnInit() {

    // 风险等级
    this.srService.findByGrade().subscribe(res => {
      this.riskLevelData = res.data;
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

}
