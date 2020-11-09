import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intent-agency',
  templateUrl: './intent-agency.component.html',
  styleUrls: ['./intent-agency.component.scss']
})
export class IntentAgencyComponent implements OnInit {

  public tabitem = [
    {item: {label: '组织构架', ftcolor: '#4F88DE', bgc: '#4F88DE'}, simbol: 'frame'},
    // {item: {label: '组织详情', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, simbol: 'detail'},
  ];
  public simbol = 'frame';
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
