import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {AddQuestion, ChangeQuestion, OragizationTree, QuestionItemClass} from '../../../../common/public/Api';
import {ThemeService} from '../../../../common/public/theme.service';
import {PublicMethodService} from '../../../../common/public/public-method.service';
import {GlobalService} from '../../../../common/services/global.service';
import {SafetrainService} from '../../../../common/services/safetrain.service';
import {RadioTemplateComponent} from '../../../../common/components/question-template/radio-template/radio-template.component';
import {CheckboxTemplateComponent} from '../../../../common/components/question-template/checkbox-template/checkbox-template.component';
import {FillVacantTemplateComponent} from '../../../../common/components/question-template/fill-vacant-template/fill-vacant-template.component';
import {JudgeTemplateComponent} from '../../../../common/components/question-template/judge-template/judge-template.component';
import {setLabelToVlaue, setVlaueToLabel} from '../../../../common/public/contents';

@Component({
  selector: 'app-scs-question',
  templateUrl: './scs-question.component.html',
  styleUrls: ['./scs-question.component.scss']
})
export class ScsQuestionComponent implements OnInit {
  // @ts-ignore
  @ViewChild('radioTemplateComponent') radioTemplate: RadioTemplateComponent;
  // @ts-ignore
  @ViewChild('checkboxTemplateComponent') checkTemplate: CheckboxTemplateComponent;
  // @ts-ignore
  @ViewChild('judgeTemplateComponent') judgeTemplate: JudgeTemplateComponent;
  // @ts-ignore
  @ViewChild('fillVacantTemplateComponent') fillVancantTemplate: FillVacantTemplateComponent;
  public questionItem: QuestionItemClass = new QuestionItemClass();
  public changeQuestion: ChangeQuestion = new ChangeQuestion();
  public addQuestion: AddQuestion = new AddQuestion();
  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: ['#FF8A9A']
  };
  public questionTemplate: string = 'radioTemplate';
  public themeSub: Subscription;
  public questionContent: any[] = [];
  public questionTitle = [
    {field: 'id', header: '序号'},
    {field: 'subjectStoreName', header: '题库名称'},
    {field: 'type', header: '题目类型'},
    {field: 'operating', header: '操作'}
  ];
  public pageNo = 1;
  public pageOption: any;

  // 删除相关
  public delData = [];
  // 上传文件相关
  public sortQuestionOption: Array<object> = [];
  // public addLimit: FormGroup;
  public showUploadFileDialog: boolean;
  // 修改xiangguan
  public showAddSingleQuestionDialog: boolean;
  // 上传题库文件
  public file: any;
  // 搜索相关
  public searchData: any;
  public showQuesType = 1;
  // 添加单个条目
  public btnQuestionList  = [
    {label: '单选题', active: true, value: 1, template: 'radioTemplate'},
    {label: '多选题', active: false, value: 2, template: 'checkTemplate'},
    {label: '判断题', active: false, value: 3, template: 'judgeTemplate'},
    {label: '填空题', active: false, value: 4, template: 'fillVancantTemplate'},
  ];

  // 权限树相关
  public dataTrees: OragizationTree[];
  public dataTree: OragizationTree;
  public treeDialog: boolean;
  public uploadSubjectFinishDialog: boolean;
  public finishData = {
    data: {
      totalNumber: 4,
      realNumber: 4,
      log: []
    }
  };
  constructor(
    private themeSrv: ThemeService,
    private safeSrv: SafetrainService,
    private toolSrv: PublicMethodService,
    private globalSrv: GlobalService
  ) {
    this.themeSub =  this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        // this.setTableOption(this.questionContent);
      }
    );
  }


  ngOnInit() {
    this.initQuestionData();
  }
  // 初始化题目类型信息
  public getQuestionSortInfoConfig(): void {
    this.safeSrv.searchScsQuestionSortInfo().subscribe(val => {
      this.sortQuestionOption = [];
      val.data.forEach(res => {
        this.sortQuestionOption.push({label: res.subjectStoreName, value: res.id});
      });
    });
  }

  // 初始化题目列表
  public initQuestionData(): void {
    this.questionContent = [];
    this.safeSrv.queryScsQuestionPageInfo({pageNo: this.pageNo, pageSize: 10}).subscribe(
      val => {
         this.pageOption = {
           totalRecord: val.data.totalRecord,
           pageSize: val.data.pageSize
         };
         val.data.contents.forEach( res => {
         res.safeSubject.subjectType = setVlaueToLabel(this.btnQuestionList, res.safeSubject.subjectType);
          // res.res.safeSubject.subjectType
         this.questionItem = {
            title: res.safeSubject.subject,
            score: res.safeSubject.score,
            option: res.safeSubjectOptionList,
            sureKey: res.safeSubject.subjectType === '多选题' ?
              res.safeSubject.rightKey.split('#') :  res.safeSubject.rightKey,
            type: res.safeSubject.subjectType
         };
         this.questionContent.push({
            id: res.safeSubject.id,
            item: this.questionItem,
            subjectStoreName: res.safeSubject.subjectStoreName,
            subjectStoreId: res.safeSubject.subjectStoreId,
            type: res.safeSubject.subjectType
          });
         });

    });
  }
  // 删除题目
  public  delClick(e): void {
    this.toolSrv.setConfirmation('删除', '删除该项', () => {
      this.delData.push({id: e.id});
      this.delQuestionInfo(this.delData);
    });
  }
  // 添加题目选项
  public  addOptionItem(item): void {
      item.push({option: ''});
  }
  // 删除题目选项
  public  delOptionItem(item, index): void {
      item.splice(index, 1);
  }
  // 保存编辑
  public  saveEditDataClick(data): void {
    console.log(data);
    if (data.item.option.some(v => {
      return v.option === '';
    })){
      this.toolSrv.setToast('error', '操作错误',  '选项不能为空');
    }else {
      this.toolSrv.setConfirmation('保存编辑', '保存编辑', () => {
        this.changeQuestion.id = data.id;
        const option = [];
        const IndexList = [];
        data.item.option.forEach((val, index) => {
          option.push(val.option);
          IndexList.push(index + 1);
        });
        this.changeQuestion.option = option.join('#');
        this.changeQuestion.order = IndexList.join('#');
        this.changeQuestion.subject = data.item.title;
        this.changeQuestion.score = data.item.score;
        if (data.item.type !== '填空题'){
          this.changeQuestion.rightKey = data.item.type === '多选题' ? data.item.sureKey.join('#') : data.item.sureKey;
        }else {
          this.changeQuestion.rightKey = this.changeQuestion.option;
        }
        this.changeQuestion.subjectType = setLabelToVlaue(this.btnQuestionList, data.item.type);
        this.changeQuestion.subjectStoreId = data.subjectStoreId;
        this.safeSrv.editScsQuestionPageInfo(this.changeQuestion).subscribe(val => {
          this.initQuestionData();
          this.resetAllData();
        });
      });
    }
  }

  // 收缩行
  public  closeRowClick(e): void {
      this.initQuestionData();
  }
  // search Data (搜索事件)
  public  searchDataClick(): void {
  }
  // 试题切换
  public  questionClick(item): void {
    this.showQuesType = item.value;
    this.btnQuestionList.forEach(val => {
      // @ts-ignore
      val.active = false;
    });
    item.active = true;
  }
  // Paging event (分页事件)
  public  clickEvent(e): void {
    this.pageNo = e;
    this.initQuestionData();
  }
  // 试题改变事件
  public  radioEvent(e): void {
      for (const key in e){
        this.addQuestion[key] = e[key];
      }
  }
  // 删除请求
  public  delQuestionInfo(value): void {
     this.safeSrv.delScsQuestionPageInfo({data: value}).subscribe(val => {
        this.initQuestionData();
        this.resetAllData();
     });
  }
  // 显示上传文件弹窗
  public  showUploadFileClick(): void {
    this.showUploadFileDialog = true;
    this.getQuestionSortInfoConfig();
  }

  public selectFile(e): void {
    console.log(e);
    this.file = e.files[0];
  }

  public  resetAllData(): void {
    switch (this.questionTemplate) {
      case 'radioTemplate': this.radioTemplate.clearData(); break;
      case 'fillVancantTemplate': this.fillVancantTemplate.clearData(); break;
      case 'checkTemplate': this.checkTemplate.clearData(); break;
      case 'judgeTemplate': this.judgeTemplate.clearData(); break;
      default:
        break;
    }
    this.delData = [];
    this.addQuestion = new AddQuestion();
    this.changeQuestion = new ChangeQuestion();
  }
  // 添加题库
  public  addSubjectSetClick(): void {
    console.log(this.addQuestion.subjectStoreId);
    console.log(this.file);
    if (!this.addQuestion.subjectStoreId || !this.file) {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    } else {
      const formData = new FormData();
      formData.append('id', this.addQuestion.subjectStoreId);
      formData.append('file', this.file);
      this.safeSrv.importSubject(formData).subscribe(res => {
        console.log(res);
        this.finishData = res;
        this.uploadSubjectFinishDialog = true;
        this.showUploadFileDialog = false;
      });
    }
  }
  // 添加单个试题
  public  AddQuestionSingleInfoClick(): void {
    if (this.addQuestion.option !== undefined && this.addQuestion.subjectStoreId !== undefined){
      this.toolSrv.setConfirmation('添加', '添加', () => {
        this.btnQuestionList.forEach(val => {
          if (val.active){
            this.addQuestion.subjectType = val.value;
            this.questionTemplate = val.template;
          }
        });
        this.safeSrv.addScsQuestionPageInfo(this.addQuestion).subscribe(value => {
          this.showAddSingleQuestionDialog = false;
          this.initQuestionData();
          this.resetAllData();

        });
      });
    }else {
      this.toolSrv.setToast('error', '操作错误', '数据未填写完整');
    }
  }
}
