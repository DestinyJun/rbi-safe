import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StOnlineExamService {

  constructor(
    private Http: HttpClient
  ) { }
  // 分页开始记录
  public getOnlineExamOPageInfo(parms): Observable<any> {
      return this.Http.post(`/pagingTestPaperInfo`, parms);
  }

  // 获取试卷信息
  public  getExamInfo(pamars): Observable<any>  {
      return this.Http.post(`/getTestPaper`, pamars);
  }
  // 完成考试
  public  completeExamInfo(pamars): Observable<any>  {
    return this.Http.post(`/completeTheExam`, pamars);

  }

  // 查看考试详情
  public  getCompleteExamInfoDetail(pamars): Observable<any>  {
    return this.Http.post(`/getTheExamDetails`, pamars);
  }

/*----------------------------错题集---------------------*/
  public  getWrongQuestionPageData(pamars): Observable<any>  {
    return this.Http.post(`/findByPage`, pamars);
  }
  public  subWrongQuestion(pamars): Observable<any>  {
    return this.Http.post(`/handlePersonalMistakes`, pamars);
  }
}
