import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
}
