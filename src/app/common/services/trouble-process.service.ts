import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TroubleProcessService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 隐患处理模块
   * @param pamars  传入的参数
   */
  // 隐患处理分页
  public  getTroublePageDta(pamars): Observable<any> {
      return  this.http.post(`/hid/findDealByPage`, pamars);
  }
  // 隐患处理详情查询
  public  getTroubleDetailByCode(pamars): Observable<any> {
    return  this.http.post(`/hid/findDealDetailByCode`, pamars);
  }
  // 完成整改
  public  completeTrouble(pamars): Observable<any> {
    return  this.http.post(`/hid/complete`, pamars);
  }

  // 查询整改负责人
  public getCorrectorData(pamars): Observable<any> {
      return this.http.post(`/hid/findCorrector`, pamars);
  }
  // 通知整改
  public issuedNoticeToRectify(pamars): Observable<any>  {
      return this.http.post(`/hid/rectification_notice`, pamars);
  }
  // 上报整改
  public submitReportToSuperior(pamars): Observable<any>  {
    return this.http.post(`/hid/report`, pamars);
  }
  // 审核通过
  public reviewToPass(pamars): Observable<any>  {
    return this.http.post(`/hid/audit_pass`, pamars);
  }
  // 审核通过
  public reviewNoToPass(pamars): Observable<any>  {
    return this.http.post(`/hid/audit_false`, pamars);
  }

  /**
   * 隐患档案模块
   */

  public getTroubleArchiveListPageData(pamars): Observable<any>  {
    return this.http.post(`/hid/findFinishByPage`, pamars);
  }
  public getTroubleArchiveDetailByCode(pamars): Observable<any>  {
    return this.http.post(`/hid/findFinishDetailByCode`, pamars);
  }
  // 隐患档案导出
  public hidExcelwrite(): Observable<any>  {
    return this.http.post(`/hid/excelwrite`, null);
  }
}
