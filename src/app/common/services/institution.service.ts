import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  constructor(private http: HttpClient) { }

  /** ********************** 制度管理 **********************  */
  /**
   * 制度管理分页查看
   * @param params
   */
  public institutionManageList(params: any): Observable<any> {
    return this.http.post(`/systemManage/findByPage`, params);
  }

  /**
   * 制度管理新增
   * @param params
   */
  public institutionManageAdd(params: any): Observable<any> {
    return this.http.post(`/systemManage/add`, params);
  }

  /**
   * 制度管理删除
   * @param params
   */
  public institutionManageDel(params: any): Observable<any> {
    return this.http.post(`/systemManage/delete`, params);
  }

  /**
   * 制度管理更新
   * @param params
   */
  public institutionManageUpdate(params: any): Observable<any> {
    return this.http.post(`/systemManage/update`, params);
  }

  /**
   * 制度管理评估
   * @param params
   */
  public institutionManageAssess(params: any): Observable<any> {
    return this.http.post(`/systemManage/evaluate`, params);
  }

  /** ********************** 制度评估历史记录 **********************  */
  /**
   * 制度评估历史记录分页查看
   * @param params
   */
  public institutionRecordList(params: any): Observable<any> {
    return this.http.post(`/systemManage/findRecordByPage`, params);
  }

  /**
   * 制度评估历史记录删除
   * @param params
   */
  public institutionRecordDel(params: any): Observable<any> {
    return this.http.post(`/systemManage/deleteRecord`, params);
  }

  /** ********************** 制度运行现状 **********************  */
  /**
   * 制度运行现状柱状图查看
   * @param params
   */
  public institutionMainBar(params: any): Observable<any> {
    return this.http.post(`/systemManage/findByYear`, params);
  }

}
