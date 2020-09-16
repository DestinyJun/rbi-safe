import { Component, OnInit } from '@angular/core';
import {ChecklistMakeService} from "../../../common/services/checklist-make.service";

@Component({
  selector: 'app-check-list-make',
  templateUrl: './check-list-make.component.html',
  styleUrls: ['./check-list-make.component.scss']
})
export class CheckListMakeComponent implements OnInit {
  public tabitem = [
    {item: {label: '我的责任清单', ftcolor: '#4F88DE', bgc: '#4F88DE'}, simbol: 'my-checklist'},
    {item: {label: '待审核责任清单', ftcolor: '#B3B3B3', bgc: '#EDEDED'}, simbol: 'pending-checklist'},
  ];
  public simbol = 'my-checklist';
  constructor(
    private checklistMakeService: ChecklistMakeService
  ) { }

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
