import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plan-a-list',
  templateUrl: './plan-a-list.component.html',
  styleUrls: ['./plan-a-list.component.scss']
})
export class PlanAListComponent implements OnInit {
  public optionTable: any;
  constructor() { }

  ngOnInit() {
  }

}
