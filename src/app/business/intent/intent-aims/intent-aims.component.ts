import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-intent-aims',
  templateUrl: './intent-aims.component.html',
  styleUrls: ['./intent-aims.component.scss']
})
export class IntentAimsComponent implements OnInit {

  public tabitem = [
    {item: {label: '目标职责清单定制', ftcolor: '#4F88DE', bgc: '#4F88DE'}, simbol: 'list'},
    {item: {label: '目标台账管理', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, simbol: 'ledger'},
  ];
  public simbol = 'list';
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
