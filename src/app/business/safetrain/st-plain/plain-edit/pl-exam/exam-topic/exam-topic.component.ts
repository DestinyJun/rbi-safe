import { Component, OnInit } from '@angular/core';
import {SafetrainService} from '../../../../../../common/services/safetrain.service';
import {PageOption} from '../../../../../../common/public/Api';
import {LocalStorageService} from '../../../../../../common/services/local-storage.service';

@Component({
  selector: 'app-exam-topic',
  templateUrl: './exam-topic.component.html',
  styleUrls: ['./exam-topic.component.scss']
})
export class ExamTopicComponent implements OnInit {
  public topicData: any[]; // 题库选题列表
  public topicSelectId: any = null; // 已选题的ID
  public topicTabActiveIndex: number = 0; // tab切换
  public topicOperateFlag: any; // 操作标识
  public topicOperateModal: boolean = false; // 模态框
  public topicTableData: any[] = []; // 表体数据
  public topicTableSelect: any[] = []; // 表体数据选择
  public topicSelectList: any[] = []; // 已选择的题目
  public topicPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public topicNowPage: number = 1; // 当前页
  constructor(
    private safeSrv: SafetrainService,
    private localSrv: LocalStorageService
  ) { }

  ngOnInit() {
    this.topicDataInit();
  }

  // 数据初始化
  private topicDataInit() {
    // 初始化题库选题
    this.safeSrv.searchScsQuestionSortInfo().subscribe((res) => {
      this.topicData = res.data;
    });
  }

  // 数据初始化
  private topicTableDataSearch(pageNo, pageSize, subjectStoreId) {
    this.safeSrv.getTopicInfo({pageNo, pageSize, subjectStoreId}).subscribe((res) => {
      this.topicTableData = res.data.contents;
      this.topicPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 操作
  public topicOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'select':
        this.topicOperateModal = true;
        this.topicTableDataSearch(this.topicNowPage, this.topicPageOption.pageSize, this.topicSelectId = item.id);
        break;
      // 取消选题
      case 'cancel':
        this.topicOperateModal = false;
        break;
      // 确定选题
      case 'save':
        this.topicOperateModal = false;
        this.topicTableSelect.forEach( (subject: any) => {
          subject.safeSubject.questionBankSubjectId = subject.safeSubject.id;
          delete subject.safeSubject.id;
        });
        this.topicSelectList = this.topicTableSelect;
        console.log(this.topicTableSelect);
        this.localSrv.setObject('safeTestQuestionsList', this.topicSelectList);
        break;
      // 删除操作
      case 'del':
        this.topicTableSelect = this.topicTableSelect.filter((res) => !(res.safeSubject.id === item.id));
        this.topicSelectList = this.topicTableSelect;
        this.localSrv.setObject('safeTestQuestionsList', this.topicSelectList);
        break;
    }
  }

  // 分页操作
  public topicPageEvent(page) {
    this.topicNowPage = page;
    this.topicTableDataSearch(page, this.topicPageOption.pageSize, this.topicSelectId);
  }
}
