import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-my-check-list-detail',
  templateUrl: './my-check-list-detail.component.html',
  styleUrls: ['./my-check-list-detail.component.scss']
})
export class MyCheckListDetailComponent implements OnInit {


  public items: Array<any> = [];

  constructor(

  ) { }

  ngOnInit() {

  }

}
