import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PageOption, TableHeader} from '../../../../../common/public/Api';
import {SafetrainService} from '../../../../../common/services/safetrain.service';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../../../../../common/services/local-storage.service';
import {PublicMethodService} from "../../../../../common/public/public-method.service";

@Component({
  selector: 'app-pl-train',
  templateUrl: './pl-train.component.html',
  styleUrls: ['./pl-train.component.scss']
})
export class PlTrainComponent implements OnInit {
  @Output() nextChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() previousChange: EventEmitter<any> = new EventEmitter<any>();
  public traTabActiveIndex: number = 0;
  public trainPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public trainTableHeader: TableHeader[] = [
    {field: 'resourceName', header: '文件名'},
    {field: 'resourceType', header: '文件类型'},
    {field: 'studyTime', header: '学时'},
  ]; // 表头字段
  public trainTableData: any[]; // 表体数据
  public trainNowPage: number = 1; // 当前页
  public trainClassifyOptions: any[] = []; // 下拉选框option
  public trainClassifySelected: any; // 下拉选框的选择内容
  public trainOperateFlag: string ; // 操作标识
  public trainOperateField: any[] = [] ; // 操作参数
  public trainAddList: any[] = [] ; // 已添加的培训资料列表
  public trainAddFileList: any[] = [] ; // 培训文件列表
  public trainAddVideoList: any[] = [] ; // 培训视频列表
  public totalStudyTime = 0;
  constructor(
    private safeSrv: SafetrainService,
    private localSrv: LocalStorageService,
    private publicMethodService: PublicMethodService
  ) { }

  ngOnInit() {
    this.trainDataInit(this.trainNowPage, this.trainPageOption.pageSize);
    // 分类初始化
    this.safeSrv.getScsContentsClassify().subscribe((res) => {
      this.trainClassifyOptions = res.data;
    });
  }

  // 数据初始化
  private trainDataInit(pageNo, pageSize) {
    this.safeSrv.getScsContentsList({pageNo, pageSize}).subscribe((res) => {
      this.trainTableData = res.data.contents.map((item) => {
        item.active = 0;
        return item;
      });
      this.trainPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 操作代理请求函数
  private trainProxyOperate(arr: any) {
    this.trainOperateField = [];
    this.trainAddFileList = arr.filter((res) => res.resourceType === '文件');
    this.trainAddVideoList = arr.filter((res) => res.resourceType === '视频');
    arr.forEach((res) => {
      if (res) {
        this.trainOperateField.push({trainingMaterialsId: res.id});
      }
    });
    this.localSrv.setObject('safeDataPlanList', this.trainOperateField);
  }

  // 搜索请求
  private trainSearchOperate() {
    const searchField = {
      pageNo: this.trainNowPage,
      pageSize: this.trainPageOption.pageSize,
      value: this.trainClassifySelected.id
    };
    this.safeSrv.searchScsContentsInfo(searchField).subscribe((res) => {
      this.trainTableData = res.data.contents.map((item) => {
        item.active = 0;
        return item;
      });
      this.trainPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 操作
  public trainOperate(flag: string, item?: any, index?: any) {
    switch (flag) {
      // 添加课程
      case 'add':
        this.trainTableData[index].active = 1;
        this.totalStudyTime += item.studyTime;
        this.trainAddList.push(Object.assign({}, item, {index}));
        this.trainProxyOperate(this.trainAddList);
        break;
      // 删除课程
      case 'del':
        this.trainAddList.splice(index, 1);
        this.trainTableData = this.trainTableData.map((res, sIndex) => {
          if (sIndex === item.index) {
            res.active = 0;
          }
          return res;
        });
        this.trainProxyOperate(this.trainAddList);
        break;
      // 筛选搜索
      case 'search':
        if (!this.trainClassifySelected) {
          this.trainDataInit(this.trainNowPage = 1, this.trainPageOption.pageSize);
          break;
        }
        this.trainSearchOperate();
        break;
      // 搜索重置
      case 'reset':
        if ( !this.trainClassifySelected) {
          this.trainDataInit(this.trainNowPage = 1, this.trainPageOption.pageSize);
        }
        break;
      // 上一步
      case 'previous':
        this.previousChange.emit({activeIndex: 0});
        break;
      // 下一步
      case 'next':
        const trainingDuration = this.localSrv.getObject('safeTrainingNeeds').trainingDuration;
        if (trainingDuration > this.totalStudyTime) {
            this.publicMethodService.setToast('error', '提示', '培训时长应小于所选培训内容学时总和!');
        } else {
          this.previousChange.emit({activeIndex: 2});
        }
        break;
    }
  }

  // 分页操作
  public trainPageEvent(page) {
    this.trainNowPage = page;
    if (!this.trainClassifySelected) {
      this.trainDataInit(page, this.trainPageOption.pageSize);
      return;
    }
    this.trainSearchOperate();
  }
}
