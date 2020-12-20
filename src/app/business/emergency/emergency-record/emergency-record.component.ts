import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../common/public/Api';
import {EmergencyService} from '../../../common/services/emergency.service';
import {UpdateEmergencyRecordFieldClass, EmergencyRecordField} from '../emergencyApi';

@Component({
  selector: 'app-emergency-record',
  templateUrl: './emergency-record.component.html',
  styleUrls: ['./emergency-record.component.scss']
})
export class EmergencyRecordComponent implements OnInit {

  public emRecordPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public emRecordTableHeader: TableHeader[] = [
    {field: 'emergencyPlanName', header: '应急预案名称'},
    {field: 'reservePlanType', header: '预案类别'},
    {field: 'reviewStatus', header: '评审状态'},
    {field: 'reviewAttachmentName', header: '评审附件名称'},
    {field: 'reviewTime', header: '评审时间'},
  ]; // 表头字段
  public emRecordTableData: any[]; // 表体数据
  public emRecordTableSelect: any = []; // 表格选择数据
  public emRecordNowPage: number = 1; // 当前页
  public emRecordOperateFlag: any ; // 操作标识
  public emRecordOperateField: EmergencyRecordField = new UpdateEmergencyRecordFieldClass(); // 操作字段
  public emRecordOperateModal: boolean = false; // 模态框
  public emRecordSearchField: string = ''; // 搜索操作字段

  constructor(
    private emergencySrv: EmergencyService,
  ) { }

  ngOnInit() {
    this.emRecordDataInit(this.emRecordNowPage, this.emRecordPageOption.pageSize, '');
  }
  // 数据初始化
  private emRecordDataInit(currentPage, pageSize, condition) {
    this.emergencySrv.emergencyRecordList({currentPage, pageSize, condition}).subscribe((res) => {
      this.emRecordTableData = res.data.datas;
      this.emRecordPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 基础操作
  public emRecordOperate(flag: string, item?: any, obj?: any) {
    switch (flag) {
      // 编辑操作初始化
      case 'update':
        const objs = new UpdateEmergencyRecordFieldClass();
        for (const keys in objs) {
          if (objs.hasOwnProperty(keys)) {
            this.emRecordOperateField[keys] = item[keys];
          }
        }
        this.emRecordOperateModal = true;
        break;
      // 文件下载
      case 'open':
        window.open(item);
        break;
      // 搜索操作
      case 'search':
        this.emRecordNowPage = 1;
        if (this.emRecordSearchField) {
          this.emRecordDataInit(this.emRecordNowPage, this.emRecordPageOption.pageSize, this.emRecordSearchField);
        } else {
          window.confirm('请输入搜索关键字');
        }
        break;
      // 搜索重置
      case 'reset':
        this.emRecordNowPage = 1;
        this.emRecordDataInit(this.emRecordNowPage, this.emRecordPageOption.pageSize, '');
        this.emRecordSearchField = '';
        break;
    }
  }

  // 分页操作
  public emRecordPageEvent(page) {
    this.emRecordNowPage = page;
    if (this.emRecordSearchField) {
      this.emRecordDataInit(page, this.emRecordPageOption.pageSize, this.emRecordSearchField);
    } else {
      this.emRecordDataInit(page, this.emRecordPageOption.pageSize, '');
    }
  }

}
