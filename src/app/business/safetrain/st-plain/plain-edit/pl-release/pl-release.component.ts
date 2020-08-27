import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TopicExamClass, TopicExamOptionClass, TopicFields} from '../../../../../common/public/Api';
import {LocalStorageService} from '../../../../../common/services/local-storage.service';
import {objectCopy} from '../../../../../common/public/contents';
import {SafetrainService} from '../../../../../common/services/safetrain.service';
import {Router} from '@angular/router';
import {PublicMethodService} from '../../../../../common/public/public-method.service';

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
    private router: Router,
    private publicSrv: PublicMethodService
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
        if (!this.releaseAddField.safeTrainingNeeds.id) {
          delete this.releaseAddField.safeTrainingNeeds.id;
        }
        // 提交之前验证参数是否全部填充
        if (this.validObject(this.releaseAddField)) {
          if (this.releaseAddField.safeTrainingNeeds.id) {
            this.safeSrv.addExamInfo(this.releaseAddField).subscribe(() => {
              this.publicSrv.setToast('success', '提示', '编辑成功');
              this.router.navigate(['/home/strain/plain/list']);
              // 清空本地缓存
              this.localSrv.remove('safeTrainingNeeds');
              this.localSrv.remove('safeDataPlanList');
              this.localSrv.remove('safeTestPaper');
              this.localSrv.remove('safeTestQuestionsList');
              // if (window.confirm('发布成功！')) {
              //   this.router.navigate(['/home/strain/plain/list']);
              // }
            });
          } else {
            this.safeSrv.addExamInfoNoId(this.releaseAddField).subscribe(() => {
              this.publicSrv.setToast('success', '提示', '发布成功');
              this.router.navigate(['/home/strain/plain/list']);
              // 清空本地缓存
              this.localSrv.remove('safeTrainingNeeds');
              this.localSrv.remove('safeDataPlanList');
              this.localSrv.remove('safeTestPaper');
              this.localSrv.remove('safeTestQuestionsList');
              // if (window.confirm('发布成功！')) {
              //   this.router.navigate(['/home/strain/plain/list']);
              // }
            });
          }
        } else {
          console.log(this.releaseAddField);
          this.publicSrv.setToast('error', '提示', '数据不完整，请检查');
        }
        break;
    }
  }


  // 递归判断对象是否有空值
  private validObject(obj: any): boolean {
    let ret = true; // 默认对象有效
    // 拿到数据类型
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === 'Object' || type === 'Array') {
      for (const objKey in obj) {
        if (objKey !== 'safeTestQuestionsList') {
          ret  = ret && this.validObject(obj[objKey]);
        }
      }
    } else {
      if (!obj || obj === '') {ret =  false; }
    }
    return ret;
  }
}
