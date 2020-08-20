import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {LocalStorageService} from '../../../../common/services/local-storage.service';

@Component({
  selector: 'app-st-exam-list',
  templateUrl: './st-exam-list.component.html',
  styleUrls: ['./st-exam-list.component.scss']
})
export class StExamListComponent implements OnInit {

  public index: number = 0;
  public noExamNum: number =  0;
  public noWrongNum: number =  0;
  public themeSub: Subscription;

  constructor(
    private storage: LocalStorageService
  ) {
  }

  ngOnInit() {
    // 恢复现场
    this.index = Number(this.storage.get('st-exam-list-active')) || 0;
  }


  public clickEvent(e): void {
    console.log(e);
  }
  public  getLength(e): void {
    setTimeout(() => {
      this.noExamNum = e;
    }, 10);
  }

  public  getWrongLength(e): void {
    setTimeout(() => {
      this.noWrongNum = e;
    }, 10);
  }

  public activeIndexChange(e): void {
    // 保存现场
    this.storage.set('st-exam-list-active', e);
    console.log(e);
  }

}
