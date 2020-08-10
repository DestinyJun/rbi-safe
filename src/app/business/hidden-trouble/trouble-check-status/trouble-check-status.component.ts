import { Component, OnInit } from '@angular/core';
import {TroubleCheckStatusService} from "../../../common/services/trouble-check-status.service";

@Component({
  selector: 'app-trouble-check-status',
  templateUrl: './trouble-check-status.component.html',
  styleUrls: ['./trouble-check-status.component.scss']
})
export class TroubleCheckStatusComponent implements OnInit {
  public lineData = [];
  public lineTilte: any = '隐患等级数量统计';
  constructor(
    private req: TroubleCheckStatusService
  ) { }

  ngOnInit() {

    this.req.findByGrade().subscribe(res => {
      this.lineData = res.data;
      console.log(res);
    });


  }

}
