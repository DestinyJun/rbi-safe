import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BigRiskService {

  constructor(
    private http: HttpClient
  ) { }
  /*-----------------------------------重大危险源档案-----------------------------------*/
  /**
   * 重大危险源档案分页
   * @param params
   */
  public getRiskArchivesPageData(params: any): Observable<any> {
    return this.http.post(`/seriousDanger/findSeriousDangerByPage`, params);
  }
  /**
   * 更新重大危险源档案
   * @param params
   */
  public updateRiskArchivesData(params: any): Observable<any> {
    return this.http.post(`/seriousDanger/updateSeriousDanger`, params);
  }
  /**
   * 搜索重大危险源
   * @param params
   */
  public searchRiskArchivesDataByName(params: any): Observable<any> {
    return this.http.post(`/seriousDanger/findSeriousDangerByPageAndName`, params);
  }
  /**
   * 根据id 查询重大危险源的详细信息
   * @param params
   */
  public searchRiskArchivesInfoById(params: any): Observable<any> {
    return this.http.post(`/seriousDanger/findSeriousDangerByID`, params);
  }

  /*-----------------------------------重大危险源识别------------------------------------*/
  /**
   * 添加重大危险源档案
   * @param params
   */
  public addRiskDiscernData(params: any): Observable<any> {
    return this.http.post(`/seriousDanger/insertSeriousDanger`, params);
  }

  /**
   * 添加重大危险源档案
   * @param params
   */
  public addRiskDel(params: any): Observable<any> {
    return this.http.post(`/seriousDanger/deleteByIds`, params);
  }
}
