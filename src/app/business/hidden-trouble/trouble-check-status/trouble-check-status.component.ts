import { Component, OnInit } from '@angular/core';
import {TroubleCheckStatusService} from "../../../common/services/trouble-check-status.service";

@Component({
  selector: 'app-trouble-check-status',
  templateUrl: './trouble-check-status.component.html',
  styleUrls: ['./trouble-check-status.component.scss']
})
export class TroubleCheckStatusComponent implements OnInit {
  public lineData = null;
  public lineTilte: any = '隐患等级数量统计';
  constructor(
    private req: TroubleCheckStatusService
  ) { }

  ngOnInit() {

    this.req.findByGrade().subscribe(res => {
      const data = {
        xdata: [],
        ydata: [],
      };
      for (const key in res.data) {
        if (res.data.hasOwnProperty(key)) {
          data.ydata.push(res.data[key]);
          data.xdata.push(key);
        }
      }
      this.lineData = data;
    });


  }

}
