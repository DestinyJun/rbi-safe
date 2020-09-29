import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-emergency-org',
  templateUrl: './emergency-org.component.html',
  styleUrls: ['./emergency-org.component.scss']
})
export class EmergencyOrgComponent implements OnInit {

  public tabitem = [
    {item: {label: '应急管理机构', ftcolor: '#4F88DE', bgc: '#4F88DE'}, simbol: 'agency'},
    {item: {label: '应急救援队伍', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, simbol: 'team'},
    {item: {label: '外部应急组织', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, simbol: 'external'},
  ];
  public simbol = 'agency';
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
