import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyPersonParams, IdInterface} from '../public/Api';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(private http: HttpClient) {
  }

  // 获取组织树
  public getOrgazitionTreeData(params?: {}): Observable<any> {
    return this.http.post(`/getOrganizationTree`, params);
  }

  // 获取角色列表
  public getRolesInfo(pamars): Observable<any> {
    return this.http.post(`/getRole`, pamars);
  }

  // 获取权限树
  public getLimitTreeData(params?: {}): Observable<any> {
    return this.http.post(`/getSystemMenuPermissonTree`, params);
  }

  // 隐患排查模块公共参数接口
  public getHidConfigData(params?: {}): Observable<any> {
    return this.http.post(`/hid/findAdmChoose`, params);
  }

  /**
   * 根据参数获取不同的制度文件列表
   * @param params 根据不同的systemCategoryId获取不同文件
   * 1安全教育培训制度 2风险分级管控制度 3重大危险源管理制度 4隐患排查治理制度 5职业健康规章制度 6 一岗双责管理制度
   */
  public getEducationList(params?: {systemCategoryId: 1 | 2 |3 |4 |5 | 6}): Observable<any> {
    return this.http.post('/getSystemFileByTypeId', params);
  }

  /**
   * 根据id获取特种人员信息
   * @param params 根据不同的systemCategoryId获取不同文件
   */
  public publicGetSpecialInfo(params: IdInterface): Observable<any> {
    return this.http.post('/training/getSpecialTrainingById', params);
  }

  /**
   * 根据ID精确查询四级HSE教育培训台账
   * @param params
   */
  public publicGetEducateById(params: IdInterface): Observable<any> {
    return this.http.post('/training/getSpecialTrainingById', params);
  }

  /**
   * 获取所有培训类型下拉框信息
   * @param params
   */
  public publicGetSafeTrainingType(params?: {}): Observable<any> {
    return this.http.post('/getSafaTrainingType', params);
  }

  /**
   * 获取公司人员信息，带有条件查询
   * @param params
   */
  public publicGetCompanyPerson(params?: CompanyPersonParams): Observable<any> {
    return this.http.post('/company_personnel/query/page', params);
  }

  /**
   * 获取安全事故下拉列表
   * @param params
   */
  public publicGetAccidentTypeList(params): Observable<any> {
    return this.http.post('/accident/getTypes', params);
  }

  /**
   * 获取安全生产管理机构树
   * @param params
   */
  public publicGetIntentAgencyTree(params): Observable<any> {
    return this.http.post('/organizationManage/findTree', params);
  }

  /**
   * 获取安全制度类型
   * @param params
   */
  public publicGetInstitutionType(params): Observable<any> {
    return this.http.post('/getSystemTypeBox', params);
  }
}
