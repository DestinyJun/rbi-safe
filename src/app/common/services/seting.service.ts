import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SetingService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 公司人员管理模块
   * @param pamars
   */
  // 分页公司人员
  public  getPersonnelPageData(pamars): Observable<any> {
     return this.http.post(environment.url_safe + `/company_personnel/query/page`, pamars);
  }
  // 新增公司人员信息
  public  addPersonnelInfo(pamars): Observable<any> {
    return this.http.post(environment.url_safe + `/company_personnel/add`, pamars);
  }
  // 批量删除公司人员信息
  public  delPersonnelInfo(pamars): Observable<any> {
    return this.http.post(environment.url_safe + `/company_personnel/delete`, pamars);
  }
  // 更新公司人员信息
  public  updatePersonnelInfo(pamars): Observable<any> {
    return this.http.post(environment.url_safe + `/company_personnel/update`, pamars);
  }
  // 更新公司人员信息
  public  imoprtPersonnelInfoFile(pamars): Observable<any> {
    return this.http.post(environment.url_safe + `/company_personnel/excel_import`, pamars);
  }
}
