import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralInfoService {

  constructor(
    private http: HttpClient
  ) { }

  /**
   * 信息公告栏
   * 分页查询
   * @param pamars
   */
  public  getBulletinBoradPageData(pamars): Observable<any> {
    return this.http.post(`/notice/findByPage`, pamars);
  }

  public  noticeDeleteByIds(pamars): Observable<any> {
    return this.http.post(`/notice/deleteByIds`, pamars);
  }

  public  submitinfoRelease(pamars): Observable<any> {
    return this.http.post(`/notice/add`, pamars);
  }

  // 获取当前登陆人员所在部门及其子部门的平均培训学时和平均成绩
  public  getAver(pamars): Observable<any> {
    return this.http.post(`/getAver`, pamars);
  }

  // 获取特种人员自身待复审信息
  public  selfReview(pamars): Observable<any> {
    return this.http.post(`/selfReview`, pamars);
  }

  // 获取特种人员自身待复审信息
  public  hidNotice(pamars): Observable<any> {
    return this.http.post(`/hid/notice`, pamars);
  }

  // 获取特种人员自身待复审信息
  public  administratorReviewNotice(pamars): Observable<any> {
    return this.http.post(`/administratorReview/notice`, pamars);
  }

  // 根据资料id查资料路径
  public  trainingFindByMaterialId(pamars, token): Observable<any> {
    const headerOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accessToken': token})};
    return this.http.post(`/training/findByMaterialId`, pamars, headerOption);
  }

  // 生产运营日报1
  public complainProductionFindAll(pamars, token): Observable<any> {
    const headerOption = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'accessToken': token})};
    return this.http.post(`${environment.url_safe}/production/findAll`, pamars, headerOption);
  }

  // 生产运营日报2
  public complainProductionFindAllLocation(pamars): Observable<any> {
    return this.http.post(`/production/findAll`, pamars);
  }

}
