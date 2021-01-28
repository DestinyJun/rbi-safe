import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SafetrainService {

  constructor(
    private http: HttpClient
  ) {
  }

  /** **********************  教育培训现状 **********************  */
  /**
   * 教育培训平均成绩/覆盖率统计统计图
   * @param params
   */
  public trainSituationTopChart(params: any): Observable<any> {
    return this.http.post(`/SafeEducation/currentLevelNum`, params);
  }

  /**
   * 教育培训月数量统计图
   * @param params
   */
  public trainSituationBottomChart(params: any): Observable<any> {
    return this.http.post(`/SafeEducation/multiLevelClassification`, params);
  }


  /**
   * 获取特种培训信息列表
   * @param params
   */
  public getArchivesList(params: any): Observable<any> {
    return this.http.post(`/training/pagingSpecialTraining`, params);
  }

  /**
   * 更新特种人员信息
   * @param params
   */
  public updateArchivesInfo(params: any): Observable<any> {
    return this.http.post(`/training/updateSpecialTraining`, params);
  }

  /**
   * 添加特种人员信息
   * @param params
   */
  public addArchivesInfo(params: any): Observable<any> {
    return this.http.post(`/training/insertSpecialTraining`, params);
  }


  /**
   * 删除特种人员信息
   * @param params
   */
  public delArchivesInfo(params: any): Observable<any> {
    return this.http.post(`/training/deleteSpecialTraining`, params);
  }

  /**
   * 导入特种人员信息
   * @param params
   */
  public importArchivesInfo(params: any): Observable<any> {
    return this.http.post(`/training/importSpecialTrainings`, params);
  }

  /**
   * 导出特种人员信息
   * @param params
   */
  public exportArchivesInfo(params: any = {}): Observable<any> {
    return this.http.post(`/training/export`, params);
  }

  /**
   * 日常需求信息填报新增
   * @param params
   */
  public addReportsInfo(params: any): Observable<any> {
    return this.http.post(`/insertTrainingNeeds`, params);
  }

  /**
   * 日常需求信息填报查看
   * @param params
   */
  public getReportsInfo(params: any): Observable<any> {
    return this.http.post(`/getTrainingNeedsById`, params);
  }

  /**
   * 培训内容列表获取
   * @param params
   */
  public getScsContentsList(params: any): Observable<any> {
    return this.http.post(`/training/findByPage`, params);
  }

  /**
   * 培训内容添加
   * @param params
   */
  public addScsContentsInfo(params: any): Observable<any> {
    return this.http.post(`/training/add`, params);
  }

  /**
   * 培训内容修改
   * @param params
   */
  public updateStudyTime(params: any): Observable<any> {
    return this.http.post(`/training/updateStudyTime`, params);
  }

  /**
   * 培训内容分类获取
   * @param params
   */
  public getScsContentsClassify(params?: {}): Observable<any> {
    return this.http.post(`/training/findType`, params);
  }

  /**
   * 培训内容删除
   * @param params
   */
  public delScsContentsInfo(params: any): Observable<any> {
    return this.http.post(`/training/deleteByIds`, params);
  }

  /**
   * 培训内容精确搜索
   * @param params
   */
  public searchScsContentsInfo(params: any): Observable<any> {
    return this.http.post(`/training/findByCondition`, params);
  }

  /**
   * 培训内容分类列表获取
   * @param params
   */
  public getScsContentsTypeList(params: any): Observable<any> {
    return this.http.post(`/category/findByPage`, params);
  }

  /**
   * 培训内容分类添加
   * @param params
   */
  public addScsContentsTypeInfo(params: any): Observable<any> {
    return this.http.post(`/category/add`, params);
  }

  /**
   * 培训内容分类修改
   * @param params
   */
  public updateScsContentsTypeInfo(params: any): Observable<any> {
    return this.http.post(`/category/update`, params);
  }

  /**
   * 培训内容分类删除
   * @param params
   */
  public delScsContentsTypeInfo(params: any): Observable<any> {
    return this.http.post(`/category/deleteById`, params);
  }

  /**
   * 培训内容分类按分类名称查询
   * @param params
   */
  public searchScsContentsTypeInfo(params: {pageNo: 1, pageSize: 10, contentCategoryName: null}): Observable<any> {
    return this.http.post(`/category/findByContentCategoryName`, params);
  }

  /**
   * 教育培训台账列表获取
   * @param params
   */
  public getEducateList(params: any): Observable<any> {
    return this.http.post(`/safeFourLevel/findSafeFourLevelByPage`, params);
  }

  /**
   * 教育培训台账添加
   * @param params
   */
  public addEducateInfo(params: any): Observable<any> {
    return this.http.post(`/safeFourLevel/insertSafeFourLevel`, params);
  }

  /**
   * 教育培训台账修改
   * @param params
   */
  public updateEducateInfo(params: any): Observable<any> {
    return this.http.post(`/safeFourLevel/updateSafeFourLevel`, params);
  }

  /**
   * 教育培训台账删除
   * @param params
   */
  public delEducateInfo(params: any): Observable<any> {
    return this.http.post(`/safeFourLevel/deleteSafeFourLevelByIds`, params);
  }

  /**
   * 教育台账分类信息查询
   * @param params
   */
  public searchEducateList(params: any): Observable<any> {
    return this.http.post(`/safeFourLevel/deleteSafeFourLevelById`, params);
  }

  /**
   * 主要负责人/安全生产管理员培训台账导出
   * @param params
   */
  public importEducateInfo(params: any): Observable<any> {
    return this.http.post(`/safeFourLevel/excelImport`, params);
  }

  /**
   * 主要负责人/安全生产管理员培训台账导出
   * @param params
   */
  public exportEducateInfo(params: any = {}): Observable<any> {
    return this.http.post(`/safeFourLevel/excelwrite`, params);
  }

  /**
   * 主要负责人/安全生产管理员培训台账列表获取
   * * @param params
   */
  public getManageList(params: any): Observable<any> {
    return this.http.post(`/training/findAdministratorTrainByPage`, params);
  }

  /**
   * 主要负责人/安全生产管理员培训台账添加
   * @param params
   */
  public addManageInfo(params: any): Observable<any> {
    return this.http.post(`/training/insertAdministratorTrain`, params);
  }

  /**
   * 主要负责人/安全生产管理员培训台账修改
   * @param params
   */
  public updateManageInfo(params: any): Observable<any> {
    return this.http.post(`/training/updateAdministratorTrain`, params);
  }

  /**
   * 主要负责人/安全生产管理员培训台账删除
   * @param params
   */
  public delManageInfo(params: any): Observable<any> {
    return this.http.post(`/training/deleteAdministratorTrain`, params);
  }

  /**
   * 主要负责人/安全生产管理员培训台账导出
   * @param params
   */
  public importManageInfo(params: any): Observable<any> {
    return this.http.post(`/training/importAdmin`, params);
  }

  /**
   * 主要负责人/安全生产管理员培训台账导出
   * @param params
   */
  public exportManageInfo(params: any = {}): Observable<any> {
    return this.http.post(`/training/writeAdmin`, params);
  }

  /**
   * 教育台账分类信息查询
   * @param params
   */
  public searchManageList(params: any): Observable<any> {
    return this.http.post(`/training/findAdministratorTrainByCondition`, params);
  }

  /**
   * 获取教育培训计划列表
   * @param params
   */
  public getProgramList(params: any): Observable<any> {
    return this.http.post(`/pagingSafeDemandReport`, params);
  }

  /**
   * 导出教育培训计划列表
   * @param params
   */
  public exportProgramList(params: any): Observable<any> {
    return this.http.post(`/exportTrainingPlan`, params);
  }

  /**
   * 删除教育培训计划列表
   * @param params
   */
  public delProgramList(params: any): Observable<any> {
    return this.http.post(`/deleteTrainingPlan`, params);
  }

  //                                    培训题库
  /*---------------------------------------------------------------------------------------------------------*/
  /**
   * 查询所有题库分类名称
   * @param params
   */
  public searchScsQuestionSortInfo(params?: {}): Observable<any> {
    return this.http.post(`/getAllSubjectStoreName`, params);
  }
  /**
   * 培训题库分页
   * @param params
   */
  public queryScsQuestionPageInfo(params: any): Observable<any> {
    return this.http.post(`/safeSubject/getSafeSubjectByPage`, params);
  }
  /**
   * 培训题库修改
   * @param params
   */
  public editScsQuestionPageInfo(params: any): Observable<any> {
    return this.http.post(`/safeSubject/updateSafeSubjectById`, params);
  }
  /**
   * 培训题库删除
   * @param params
   */
  public delScsQuestionPageInfo(params: any): Observable<any> {
    return this.http.post(`/safeSubject/deleteSafeSubjectById`, params);
  }
  /**
   * 培训题库添加
   * @param params
   */
  public addScsQuestionPageInfo(params: any): Observable<any> {
    return this.http.post(`/safeSubject/insertSafeSubject`, params);
  }
  /**
   * 培训题库导入
   * @param params
   */
  public importSubject(params: any): Observable<any> {
    return this.http.post(`/importSubject`, params);
  }
  //                                    题库分类
  /*---------------------------------------------------------------------------------------------------------*/
  /**
   * 添加题库分类名称
   * @param params
   */
  public addScsQuestionSortInfo(params?: {}): Observable<any> {
    return this.http.post(`/insertSubjectStoreName`, params);
  }
  /**
   * 修改题库分类名称
   * @param params
   */
  public editScsQuestionSortInfo(params?: {}): Observable<any> {
    return this.http.post(`/updateSubjectStoreName`, params);
  }
  /**
   * 删除题库分类名称
   * @param params
   */
  public delScsQuestionSortInfo(params?: {}): Observable<any> {
    return this.http.post(`/deleteSubjectStoreName`, params);
  }

  /**
   * 根据题库类型获取题库
   * @param params
   */
  public getTopicInfo(params?: {}): Observable<any> {
    return this.http.post(`/safeSubject/getSafeSubjectByPageAndSubjectStoreId`, params);
  }

  /**
   * 考试发布（有id）
   */
  public addExamInfo(params: any): Observable<any> {
    return this.http.post(`/handlingRequirements`, params);
  }

  /**
   * 考试发布（无id）
   */
  public addExamInfoNoId(params: any): Observable<any> {
    return this.http.post(`/insertTrainingPlanTest`, params);
  }

  /**
   * 教育需求数据隔离
   */
  public pagingSafeConditionDemandReport(params: any): Observable<any> {
    return this.http.post(`/pagingSafeConditionDemandReport`, params);
  }
  /**
   *  随机试卷获取
   */
  public getRandomTestPaper(params: any): Observable<any> {
    return this.http.post(`/getRandomTestPaper`, params);
  }
}
