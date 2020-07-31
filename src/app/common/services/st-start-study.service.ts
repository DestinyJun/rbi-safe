import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StStartStudyService {

  constructor(
    private http: HttpClient
  ) { }
  // 内容分类文件搜索
  public getStudyLibraryFilePageInfo(pamars): Observable<any> {
      return this.http.post(`/training/findFileByCategory`, pamars);
  }

  // 内容分类文件搜索
  public getStudyLibraryVideoPageInfo(pamars): Observable<any> {
    return this.http.post(`/training/findVideoByCategory`, pamars);
  }

  // 内容类型数据
  public getStudyFindLibraryType(pamars): Observable<any> {
    return this.http.post(`/training/findType`, pamars);
  }
  // 获取我的计划
  public  getMyPlanPageInfo(pamars): Observable<any> {
    return this.http.post(`/getLearningInformation`, pamars);
  }

  // 获取我的计划
  public  getMyPlanInfoById(pamars): Observable<any> {
    return this.http.post(`/getLearningContentById`, pamars);
  }

  // 测试考试
  public  getSimulationTestPaper(pamars): Observable<any> {
    return this.http.post(`/getSimulationTestPaper`, pamars);
  }
  public  completeSimulationTheExam(pamars): Observable<any> {
    return this.http.post(`/completeSimulationTheExam`, pamars);
  }
}
