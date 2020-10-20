import { Component, OnInit } from '@angular/core';
import {OrgTree} from '../../../common/public/Api';
import {GlobalService} from '../../../common/services/global.service';
import {orgInitializeTree} from '../../../common/public/contents';
import {EquipmentService} from '../../../common/services/equipment.service';

@Component({
  selector: 'app-equipment-main',
  templateUrl: './equipment-main.component.html',
  styleUrls: ['./equipment-main.component.scss']
})
export class EquipmentMainComponent implements OnInit {

  public equipmentMainCar: any = null ; // 卡片图数据
  public equipmentMainLine: any = null ; // 柱状图数据
  public equipmentMainType: string = 'all' ; // 类型
  public equipmentMainYear: any = new Date().getFullYear() ; // 当前年
  public equipmentMainOperateFlag: any ; // 操作标识
  public equipmentMainOrgTreeModal: boolean = false; // 组织树模态框
  public equipmentMainOrgTree: OrgTree[] = []; // 组织树配置项
  public equipmentMainOrgTreeSelect: OrgTree = {}; // 组织树选择
  public equipmentMainOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  public equipmentMainTabItem = [
    {
      item: {label: '全部', ftcolor: '#4F88DE', bgc: '#4F88DE'},
      show: true,
      symbol: 'all'
    },
    {item: {label: '安全设备', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, show: false, symbol: 'safe'},
    {item: {label: '特种设备', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, show: false, symbol: 'special'},
    {item: {label: '其他设备', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, show: false, symbol: 'other'},
  ];
  constructor(
    private equipmentSrv: EquipmentService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.equipmentMainOrgTreeSelectLabel = res.data[0].organizationName;
        this.equipmentMainChartHttp(res.data[0].id, this.equipmentMainYear, this.equipmentMainType);
        this.equipmentMainOrgTree = orgInitializeTree(res.data);
      }
    );
  }

  // 柱状图数据获取
  private equipmentMainChartHttp(organizationId, year, type) {
    this.equipmentSrv.equipmentMainChart({organizationId, year, type}).subscribe((res) => {
      this.equipmentMainCar = res.data.mineEquipmentRealTime.map((item) => {
        if (item.name === '安全设备故障数量') {
          return {...item, color: '#227BD5'};
        }
        else if (item.name === '特种设备故障数量') {
          return {...item, color: '#58C1F9'};
        }
        else {
          return {...item, color: '#91E5FF'};
        }
      });
      this.equipmentMainLine = res.data.mineEquipmentHistory;
    });
  }

  // 基础操作
  public equipmentMainOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'tree':
        this.equipmentMainOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.equipmentMainOrgTreeModal = false;
        this.equipmentMainOrgTreeSelectLabel = this.equipmentMainOrgTreeSelect.label;
        // this.equipmentMainChartHttp(this.equipmentMainOrgTreeSelect.id, this.equipmentMainYear);
        break;
    }
  }

  // tab切换
  public equipmentMainTabItemClick(item): void {
    this.equipmentMainTabItem.forEach(val => {
      val.item.ftcolor = '#D4D4D4';
      val.item.bgc = '#EDEDED';
      val.show = false;
    });
    item.item.ftcolor = '#4F88DE';
    item.item.bgc = '#4F88DE';
    item.show = true;
    this.equipmentMainChartHttp(34, this.equipmentMainYear, item.symbol);
  }

}
