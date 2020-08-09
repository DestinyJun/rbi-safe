import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TopicExamClass, TopicExamOptionClass, TopicFields} from '../../../../../common/public/Api';
import {LocalStorageService} from '../../../../../common/services/local-storage.service';
import {objectCopy} from '../../../../../common/public/contents';
import {SafetrainService} from '../../../../../common/services/safetrain.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pl-release',
  templateUrl: './pl-release.component.html',
  styleUrls: ['./pl-release.component.scss']
})
export class PlReleaseComponent implements OnInit {
  @Output() previousChange: EventEmitter<any> = new EventEmitter<any>();
  public safeTestQuestionsList: TopicFields[] = [];
  public safeTrainingNeeds: any;
  public safeTestPaper: any;
  public safeDataPlanList: any;
  public releaseAddField: any;

  constructor(
    private localSrv: LocalStorageService,
    private safeSrv: SafetrainService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.releaseDataInit();
  }

  // 数据初始化
  private releaseDataInit() {
    // 获取培训计划基础设置
    this.safeTrainingNeeds = this.localSrv.getObject('safeTrainingNeeds');
    // 获取培训内容id列表
    this.safeDataPlanList = this.localSrv.getObject('safeDataPlanList');
    // 获取考试规则
    this.safeTestPaper = this.localSrv.getObject('safeTestPaper');
    // 获取考试题库
    this.safeTestQuestionsList = this.localSrv.getObject('safeTestQuestionsList');

    // 组合参数
    const TopicExam = [];
    this.safeTestQuestionsList.forEach((res) => {
      const exam = objectCopy(Object.assign({}, new TopicExamClass(), {safeTestQuestionOptionsList: []}), res.safeSubject);
      exam.questionBankSubjectId = res.safeSubject.questionBankSubjectId;
      exam.safeTestQuestionOptionsList = [];
      if (res.safeSubjectOptionList !== null) {
        if (res.safeSubjectOptionList.length && res.safeSubject.subjectType !== 4) {
          res.safeSubjectOptionList.forEach((item) => {
            exam.safeTestQuestionOptionsList.push(objectCopy(Object.assign({}, new TopicExamOptionClass()), item));
          });
        } else {
          exam.safeTestQuestionOptionsList = null;
        }
      }
      TopicExam.push(exam);
    });

    this.safeTestPaper = Object.assign(this.safeTestPaper, {safeTestQuestionsList: TopicExam});
    this.releaseAddField = Object.assign(
      {},
      {safeTrainingNeeds: this.safeTrainingNeeds},
      {safeDataPlanList: this.safeDataPlanList},
      {safeTestPaper: this.safeTestPaper},
    );
  }

  // 操作
  public plReleaseOperate(flag: string, id?: any) {
    switch (flag) {
      // 上一步
      case 'previous':
        this.previousChange.emit({activeIndex: 2});
        console.log(this.releaseAddField);
        break;
      // 确认发布
      case 'sure':
        if (this.releaseAddField.safeTrainingNeeds.id) {
          this.safeSrv.addExamInfo(this.releaseAddField).subscribe(() => {
            if (window.confirm('发布成功！')) {
              this.router.navigate(['/home/strain/plain/list']);
            }
          });
        } else {
          delete this.releaseAddField.safeTrainingNeeds.id;
          this.safeSrv.addExamInfoNoId(this.releaseAddField).subscribe(() => {
            if (window.confirm('发布成功！')) {
              this.router.navigate(['/home/strain/plain/list']);
            }
          });
        }
        break;
    }
  }
}
