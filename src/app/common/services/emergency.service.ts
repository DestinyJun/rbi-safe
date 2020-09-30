import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  constructor(private http: HttpClient) { }

  /** **********************  应急管理机构 **********************  */
  /**
   * 应急管理机构分页查看
   * @param params
   */
  public emergencyOrgAgencyList(params: any): Observable<any> {
    return this.http.post(`/emergencyManagementOrganization/page`, params);
  }

  /**
   * 应急管理机构新增
   * @param params
   */
  public emergencyOrgAgencyAdd(params: any): Observable<any> {
    return this.http.post(`/emergencyManagementOrganization/add`, params);
  }

  /**
   * 应急管理机构删除
   * @param params
   */
  public emergencyOrgAgencyDel(params: any): Observable<any> {
    return this.http.post(`/emergencyManagementOrganization/delete`, params);
  }

  /**
   * 应急管理机构更新
   * @param params
   */
  public emergencyOrgAgencyUpdate(params: any): Observable<any> {
    return this.http.post(`/emergencyManagementOrganization/update`, params);
  }

  /** ********************** 应急救援队伍 **********************  */
  /**
   * 应急救援队伍分页查看
   * @param params
   */
  public emergencyOrgTeamList(params: any): Observable<any> {
    return this.http.post(`/emergencyRescueTeam/page`, params);
  }

  /**
   * 应急救援队伍新增
   * @param params
   */
  public emergencyOrgTeamAdd(params: any): Observable<any> {
    return this.http.post(`/emergencyRescueTeam/add`, params);
  }

  /**
   * 应急救援队伍删除
   * @param params
   */
  public emergencyOrgTeamDel(params: any): Observable<any> {
    return this.http.post(`/emergencyRescueTeam/delete`, params);
  }

  /**
   * 应急救援队伍更新
   * @param params
   */
  public emergencyOrgTeamUpdate(params: any): Observable<any> {
    return this.http.post(`/emergencyRescueTeam/update`, params);
  }

  /** ********************** 外部应急组织 **********************  */
  /**
   * 外部应急组织分页查看
   * @param params
   */
  public emergencyOrgExternalList(params: any): Observable<any> {
    return this.http.post(`/emergencyExternalOrganization/page`, params);
  }

  /**
   * 外部应急组织新增
   * @param params
   */
  public emergencyOrgExternalAdd(params: any): Observable<any> {
    return this.http.post(`/emergencyExternalOrganization/add`, params);
  }

  /**
   * 外部应急组织删除
   * @param params
   */
  public emergencyOrgExternalDel(params: any): Observable<any> {
    return this.http.post(`/emergencyExternalOrganization/delete`, params);
  }

  /**
   * 外部应急组织更新
   * @param params
   */
  public emergencyOrgExternalUpdate(params: any): Observable<any> {
    return this.http.post(`/emergencyExternalOrganization/update`, params);
  }

  /** ********************** 应急预案 **********************  */
  /**
   * 应急预案分页查看
   * @param params
   */
  public emergencyPlanList(params: any): Observable<any> {
    return this.http.post(`/emergencyPlan/page`, params);
  }

  /**
   * 应急预案新增
   * @param params
   */
  public emergencyPlanAdd(params: any): Observable<any> {
    return this.http.post(`/emergencyPlan/add`, params);
  }

  /**
   * 应急预案处理
   * @param params
   */
  public emergencyPlanHandle(params: any): Observable<any> {
    return this.http.post(`/emergencyPlan/handle`, params);
  }

  /**
   * 应急预案更新
   * @param params
   */
  public emergencyPlanUpdate(params: any): Observable<any> {
    return this.http.post(`/emergencyPlan/update`, params);
  }
}
