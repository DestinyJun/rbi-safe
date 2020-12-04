import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccidentService {

  constructor(private http: HttpClient) { }

  /** ********************* 生产安全事故记录 ********************* */
  /**
   * 生产安全事故分页
   * @param params
   */
  public accidentRecordList(params: any): Observable<any> {
    return this.http.post(`/accident/getPage`, params);
  }

  /**
   * 生产安全事故添加
   * @param params
   */
  public accidentRecordAdd(params: any): Observable<any> {
    return this.http.post(`/accident/insert`, params);
  }

  /**
   *  生产安全事故删除
   * @param params
   */
  public accidentRecordDel(params: any): Observable<any> {
    return this.http.post(`/accident/delete`, params);
  }

  /**
   * 生产安全事故更新
   * @param params
   */
  public accidentRecordUpdate(params: any): Observable<any> {
    return this.http.post(`/accident/update`, params);
  }

  /** ********************* 生产安全事故现状 ********************* */
  /**
   * 生产安全事故现状柱状图
   * @param params
   */
  public accidentSituationBar(params: any): Observable<any> {
    return this.http.post(`/accident/getMonthData`, params);
  }

  /**
   * 生产安全事故现状饼状图一
   * @param params
   */
  public accidentSituationPie(params: any): Observable<any> {
    return this.http.post(`/accident/getMonthDataType`, params);
  }

  /**
   * 生产安全事故现状饼状图二
   * @param params
   */
  public accidentSituationPieRTwo(params: any): Observable<any> {
    return this.http.post(`/accident/getYearMonthDataType`, params);
  }
}
