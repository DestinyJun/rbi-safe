import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-double-responsibily',
  templateUrl: './double-responsibily.component.html',
  styleUrls: ['./double-responsibily.component.scss']
})
export class DoubleResponsibilyComponent implements OnInit {
  public linkList = [
    {label: '一岗双责管理制度', bgc: '#C80000', router: 'DoubleInsitution'},
    {label: '责任清单制定', bgc: '#226AD5', router: 'list-customization'},
    {label: '责任清单填写', bgc: '#226AD5', router: 'checklist-make'},
    {label: '员工责任清单档案', bgc: '#226AD5', router: 'employee-list-file'},
  ];
  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    const path = this.location.path().split('/');
    const pathUrl = path[path.length - 1];
    this.linkList.forEach((item) => {
      if (item.router === pathUrl) {
        item.bgc = '#C80000';
      } else {
        item.bgc = '#226AD5';
      }
    });
  }

  public onClick(route) {
    this.linkList.forEach((item) => {
      item.bgc = '#226AD5';
    });
    route.bgc = '#C80000';
    this.router.navigate([`/home/intent/double/${route.router}`]);
  }
}
