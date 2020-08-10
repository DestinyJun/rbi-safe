import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TroubleCheckStatusService {

  constructor(
    private http: HttpClient
  ) { }


  // 月隐患统计
  public findByMonth(): Observable<any> {
    return this.http.post('/hid/findByMonth', '');
  }
  // 隐患等级
  public findByGrade(): Observable<any> {
    return this.http.post('/hid/findByGrade', '');
  }
  // 隐患类型
  public findByType(): Observable<any> {
    return this.http.post('/hid/findByType', '');
  }
}
