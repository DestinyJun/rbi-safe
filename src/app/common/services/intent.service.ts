import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntentService {

  constructor(private http: HttpClient) { }

  /** ********************** 安全生产管理机构设置 **********************  */
  /**
   * 安全生产管理机构分页
   * @param params
   */
  public intentAgencyList(params: any): Observable<any> {
    return this.http.post(`/organizationManage/findByPage`, params);
  }

  /**
   * 安全生产管理机构新增
   * @param params
   */
  public intentAgencyAdd(params: any): Observable<any> {
    return this.http.post(`/organizationManage/add`, params);
  }

  /**
   * 安全生产管理机构删除
   * @param params
   */
  public intentAgencyDel(params: any): Observable<any> {
    return this.http.post(`/organizationManage/delete`, params);
  }

  /**
   * 安全生产管理机构更新
   * @param params
   */
  public intentAgencyUpdate(params: any): Observable<any> {
    return this.http.post(`/organizationManage/update`, params);
  }

  /**
   * 组织图上传
   * @param params
   */
  public intentAgencyImgUpload(params: any): Observable<any> {
    return this.http.post(`/organizationManage/addPicture`, params);
  }

  /**
   * 组织图查看
   * @param params
   */
  public intentAgencyImgLook(params: any): Observable<any> {
    return this.http.post(`/organizationManage/findPicture`, params);
  }

  /** ********************** 目标管理职责 **********************  */
  /**
   * 目标管理职责分页
   * @param params
   */
  public intentAgencyDutyList(params: any): Observable<any> {
    return this.http.post(`/target/findByPage`, params);
  }

  /**
   * 目标管理职责新增
   * @param params
   */
  public intentAgencyDutyAdd(params: any): Observable<any> {
    return this.http.post(`/target/add`, params);
  }

  /**
   * 目标管理职责删除
   * @param params
   */
  public intentAgencyDutyDel(params: any): Observable<any> {
    return this.http.post(`/target/delete`, params);
  }

  /**
   * 目标管理职责更新
   * @param params
   */
  public intentAgencyDutyUpdate(params: any): Observable<any> {
    return this.http.post(`/target/update`, params);
  }

  /**
   * 目标管理职责指定删除
   * @param params
   */
  public intentAgencyDutySingleDel(params: any): Observable<any> {
    return this.http.post(`/target/deleteContentById`, params);
  }

  /** ********************** 目标职责清单制定 **********************  */
  /**
   * 目标职责清单制定分页
   * @param params
   */
  public intentAimsCheckList(params: any): Observable<any> {
    return this.http.post(`/target/findByPage`, params);
  }

  /**
   * 目标职责清单制定新增
   * @param params
   */
  public intentAimsCheckAdd(params: any): Observable<any> {
    return this.http.post(`/target/add`, params);
  }

  /**
   * 目标职责清单制定删除
   * @param params
   */
  public intentAimsCheckDel(params: any): Observable<any> {
    return this.http.post(`/target/delete`, params);
  }

  /**
   * 目标职责清单制定修改
   * @param params
   */
  public intentAimsCheckUpdate(params: any): Observable<any> {
    return this.http.post(`/target/update`, params);
  }

  /**
   * 目标职责清单制定指定删除项
   * @param params
   */
  public intentAimsCheckSingleDel(params: any): Observable<any> {
    return this.http.post(`/target/deleteContentById`, params);
  }

  /** ********************** 目标台账管理 **********************  */
  /**
   * 目标台账管理分页
   * @param params
   */
  public intentAimsLedgerList(params: any): Observable<any> {
    return this.http.post(`/target/findFileByPage`, params);
  }

  /**
   * 目标台账管理新增
   * @param params
   */
  public intentAimsLedgerAdd(params: any): Observable<any> {
    return this.http.post(`/target/addFile`, params);
  }

  /**
   * 目标台账管理清单获取
   * @param params
   */
  public intentAimsLedgerChecklist(params: any): Observable<any> {
    return this.http.post(`/target/findFileByOrganizationId`, params);
  }

  /** ********************** 安全生产投入 **********************  */
  /**
   * 安全生产投入分页
   * @param params
   */
  public intentInvestList(params: any): Observable<any> {
    return this.http.post(`/productionInput/findByPage`, params);
  }

  /**
   * 安全生产投入新增
   * @param params
   */
  public intentInvestAdd(params: any): Observable<any> {
    return this.http.post(`/productionInput/add`, params);
  }

  /**
   * 安全生产投入删除
   * @param params
   */
  public intentInvestDel(params: any): Observable<any> {
    return this.http.post(`/productionInput/delete`, params);
  }

  /**
   * 安全生产投入更新
   * @param params
   */
  public intentInvestUpdate(params: any): Observable<any> {
    return this.http.post(`/productionInput/update`, params);
  }

  /**
   * 安全生产投入金额
   * @param params
   */
  public intentInvestTotal(params: any): Observable<any> {
    return this.http.post(`/productionInput/findTotalMoney`, params);
  }

  /** ********************** 安全文化建设 **********************  */
  /**
   * 安全文化建设分页
   * @param params
   */
  public intentCultureList(params: any): Observable<any> {
    return this.http.post(`/cultural/findByPage`, params);
  }

  /**
   * 安全文化建设新增
   * @param params
   */
  public intentCultureAdd(params: any): Observable<any> {
    return this.http.post(`/cultural/add`, params);
  }

  /**
   * 安全文化建设删除
   * @param params
   */
  public intentCultureDel(params: any): Observable<any> {
    return this.http.post(`/cultural/delete`, params);
  }

  /**
   * 安全文化建设更新
   * @param params
   */
  public intentCultureUpdate(params: any): Observable<any> {
    return this.http.post(`/cultural/update`, params);
  }

  /**
   * 安全文化建设图片删除
   * @param params
   */
  public intentCultureImgDel(params: any): Observable<any> {
    return this.http.post(`/cultural/deletePictureById`, params);
  }
}
