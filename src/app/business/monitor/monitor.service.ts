import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private http: HttpClient) { }

  /** ********************* 综合监测预警 ********************* */
  /**
   * 综合监测预警指标分类占比
   * @param params
   */
  public monitorComprehensiveBar(params: any): Observable<any> {
    return this.http.post(`/monitor_warning/findPercentage`, params);
  }

  /**
   * 综合监测预警指标分类占比
   * @param params
   */
  public monitorComprehensiveArea(params: any): Observable<any> {
    return this.http.post(`/monitor_warning/findIndex`, params);
  }

  /** ********************* 单一监测预警 ********************* */
  /**
   * 小长冲河铝矿监测预警
   * @param params
   */
  public monitorSingleRiverList(params: any): Observable<any> {
    return this.http.post(`/accident/xiaoChangCongFindAll`, params);
  }

  /**
   * 麦坝铝矿监测预警
   * @param params
   */
  public monitorSingleWheatList(params: any): Observable<any> {
    return this.http.post(`/accident/maiBanFindAll`, params);
  }

  /**
   * 猫场铝矿监测预警
   * @param params
   */
  public monitorSingleCatList(params: any): Observable<any> {
    return this.http.post(`/accident/catFindAll`, params);
  }
}
