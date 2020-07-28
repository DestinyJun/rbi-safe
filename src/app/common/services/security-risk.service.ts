import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityRiskService {

  constructor(
    private http: HttpClient
  ) { }
  /*--------------------------------------------------- 风险管理模块---------------------------------------------------*/
  /**
   * 计算风险值和风险等级
   * @param pamars
   */
  public calcRiskValue(pamars): Observable<any> {
    return this.http.post(`/risk/riskValueAndGrade `, pamars);
  }
  /**
   * 区域内风险添加
   * @param pamars
   */
  public addWithInAreaRisk(pamars): Observable<any> {
    return this.http.post(`/risk/addInside`, pamars);
  }
  /**
   * 区域外风险添加
   * @param pamars
   */
  public addOutSideAreaRisk(pamars): Observable<any> {
    return this.http.post(`/risk/addOutside`, pamars);
  }

  /**
   * 计算风险值结果
   * @param pamars
   */
  public calcRiskMeasuresResult(pamars): Observable<any> {
    return this.http.post(`/risk/measuresResult`, pamars);
  }

  /*--------------------------------------------------- 风险档案---------------------------------------------------*/
  /**
   * 区域内条件查询
   * @param pamars
   */
  public searchArchiveWithinData(pamars): Observable<any> {
    return this.http.post(`/risk/findInsideByCondition`, pamars);
  }
  /**
   * 区域内分页查询
   * @param pamars
   */
  public queryArchiveWithinPageData(pamars): Observable<any> {
    return this.http.post(`/risk/findInsideByPage`, pamars);
  }


  /**
   * 区域外条件查询
   * @param pamars
   */
  public searchArchiveOutSideData(pamars): Observable<any> {
    return this.http.post(`/risk/findOutsideByCondition`, pamars);
  }
  /**
   * 区域外分页查询
   * @param pamars
   */
  public queryArchiveOutSidePageData(pamars): Observable<any> {
    return this.http.post(`/risk/findOutsideByPage`, pamars);
  }


  /**
   * 重大危险条件查询
   * @param pamars
   */
  public searchArchiveBigRiskData(pamars): Observable<any> {
    return this.http.post(`/risk/findOutsideByCondition`, pamars);
  }
  /**
   * 重大危险分页查询
   * @param pamars
   */
  public queryArchiveBigRiskPageData(pamars): Observable<any> {
    return this.http.post(`/risk/findSeriousRiskByPage`, pamars);
  }


  /**
   * 图片删除接口
   * @param pamars
   */
  public delImage(pamars): Observable<any> {
    return this.http.post(`/risk/deleteByPictureId`, pamars);
  }

  /**
   * 更新数据
   * @param pamars
   */
  public updateArchivesData(pamars): Observable<any> {
    return this.http.post(`/risk/update`, pamars);
  }


  /*--------------------------------------------------- 风险分级管控现状---------------------------------------------------*/
  // 危害种类
  public findHarmKind(): Observable<any> {
    return this.http.post('/risk/findByHarmKind', '');
  }
  // 风险等级
  public findByGrade(): Observable<any> {
    return this.http.post('/risk/findByGrade', '');
  }
  // 风险范畴统计
  public findByRiskCategory(): Observable<any> {
    return this.http.post('/risk/findByRiskCategory', '');
  }
}
