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
  constructor(
    private srService: SecurityRiskService
  ) { }

  ngOnInit() {
    // 风险等级
    this.srService.findByGrade().subscribe(res => {
      const lineDataKey = [];
      for (const dataKey in res.data) {
        lineDataKey.push(dataKey);
      }
      this.lineData = [];
      for (const datumKey in res.data[lineDataKey[0]]) {
        this.lineData.push({name: datumKey, value1: res.data[lineDataKey[0]][datumKey], value2: res.data[lineDataKey[1]][datumKey]});
      }
      // 排序根据名称
      this.lineData = this.lineData.sort((a, b) => {
        return this.getZhCode(a.name) - this.getZhCode(b.name);
      });
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

}
