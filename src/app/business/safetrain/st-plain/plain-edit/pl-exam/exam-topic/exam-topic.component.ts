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
  public selectAllBox: string[] = []; // 全选元素
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

      console.log(this.topicTableData);
      //  判断当前表单项是否被全选
      let f = true;
      this.topicTableData.forEach(value => {
        let flag = false;
        this.topicTableSelect.forEach(value1 => {
          if (value1.safeSubject.id === value.safeSubject.id) {
            flag = true;
          }
        });
        if (!flag) {
          f = false;
        }
      });
      if (this.topicTableSelect.length > 0) {
        this.setCheckBox(f);
      }
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

  // 当前页的全部选择或不选择全部
  public selectAll(e): void {
    if (e.checked) {
      this.setCheckBox(true);
      // 在全选之前，如果选项已经在被选中，则不添加。没有则添加
      this.topicTableData.forEach(value => {
        // 是否在 plInputTableSelect 里面
        let flag = false;
        this.topicTableSelect.forEach(value1 => {
          if (value1.safeSubject.id === value.safeSubject.id) {
            flag = true;
          }
        });
        if (!flag) { // 不存在则添加
          this.topicTableSelect.push(value);
        }
      });
      const newObj = [];
      Object.assign(newObj, this.topicTableSelect);
      this.topicTableSelect = newObj;
    } else {
      // 只有这样才能触发box的改变
      this.setCheckBox(false);
      this.topicTableData.forEach(value => {
        this.topicTableSelect.forEach(value1 => {
          if (value1.safeSubject.id === value.safeSubject.id) {
            this.topicTableSelect.splice(this.topicTableSelect.indexOf(value1), 1);
          }
        });
      });
      const newObj = [];
      Object.assign(newObj, this.topicTableSelect);
      this.topicTableSelect = newObj;
    }
  }

  // 单选
  public select(e, data): void {
    console.log(e.checked);
    if (e.checked) {
      this.topicTableSelect.push(data);
    } else {
      let i = -1;
      this.topicTableSelect.forEach((value, index) => {
        if (value.safeSubject.id === data.safeSubject.id) {
          i = index;
        }
      });
      if (i > -1) {
        this.topicTableSelect.splice(i, 1);
      }
      this.setCheckBox(false);
    }
  }

  public setCheckBox(checked: boolean): void {
    if (checked) {
      this.selectAllBox = ['selectAll'];
    } else {
      this.selectAllBox = [];
    }
  }
}
