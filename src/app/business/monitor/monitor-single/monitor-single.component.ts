import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitor-single',
  templateUrl: './monitor-single.component.html',
  styleUrls: ['./monitor-single.component.scss']
})
export class MonitorSingleComponent implements OnInit {

  public tabitem = [
    {item: {label: '猫场铝矿监测预警 ', ftcolor: '#4F88DE', bgc: '#4F88DE'}, simbol: 'cat'},
    {item: {label: '麦坝铝矿监测预警', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, simbol: 'wheat'},
    {item: {label: '小长冲河铝矿监测预警', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, simbol: 'river'},
  ];
  public simbol = 'cat';
  constructor() { }

  ngOnInit() {
  }

  public  tabItemClick(item): void {
    this.tabitem.forEach(val => {
      val.item.ftcolor = '#D4D4D4';
      val.item.bgc = '#EDEDED';
    });
    item.item.ftcolor = '#4F88DE';
    item.item.bgc = '#4F88DE';
    this.simbol = item.simbol;
  }

}
