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
  // 柱状图获取
  public troubleCheckChar(params): Observable<any> {
    return this.http.post('/hid/findByYear', params);
  }
  // 饼状图初始化获取
  public troubleCheckBarInit(params): Observable<any> {
    return this.http.post('/hid/findTypeByMonth', params);
  }
  // 饼状图区间获取
  public troubleCheckBar(params): Observable<any> {
    return this.http.post('/hid/findByType', params);
  }
  // 隐患类型
  public findByType(): Observable<any> {
    return this.http.post('/hid/findByType', '');
  }
}
