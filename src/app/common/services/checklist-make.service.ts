import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChecklistMakeService {

  constructor(private http: HttpClient) { }


  // 个人责任清单
  public dbEvaluationFindPersonelByPage(params?: any): Observable<any> {
    return this.http.post(`/db_evaluation/findPersonelByPage`, params);
  }

  // 填写清单接口
  public dbEvaluationWrite(params?: any): Observable<any> {
    return this.http.post(`/db_evaluation/write`, params);
  }

  // 点按钮获取清单，并填写
  public dbEvaluationFindTemplate(params?: any): Observable<any> {
    return this.http.post(`/db_evaluation/findTemplate`, params);
  }

  // 待审核责任清单
  public dbEvaluationFindAuditByPage(params?: any): Observable<any> {
    return this.http.post(`/db_evaluation/findAuditByPage`, params);
  }

  // 审核
  public dbEvaluationAudit(params?: any): Observable<any> {
    return this.http.post(`/db_evaluation/audit`, params);
  }


}
