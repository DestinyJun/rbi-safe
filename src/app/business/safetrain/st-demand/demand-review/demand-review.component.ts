import { Component, OnInit } from '@angular/core';
import {PageOption, ReviewInfo, ReviewInfoClass, SpecialField, SpecialFieldClass, TableHeader} from '../../../../common/public/Api';
import {Observable} from 'rxjs';
import {GlobalService} from '../../../../common/services/global.service';
import {DemandService} from '../../../../common/services/demand.service';

@Component({
  selector: 'app-demand-review',
  templateUrl: './demand-review.component.html',
  styleUrls: ['./demand-review.component.scss']
})
export class DemandReviewComponent implements OnInit {
  public reviewPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public reviewTableHeader: TableHeader[] = [
    {field: 'name', header: '姓名'},
    {field: 'gender', header: '性别'},
    {field: 'typeOfWork', header: '工种名称'},
    {field: 'degreeOfEducation', header: '文化程度'},
    {field: 'dateOfIssue', header: '发证日期'},
  ]; // 表头字段
  public reviewTableData: any[]; // 表体数据
  public reviewNowPage: number = 1; // 当前页
  public reviewOperateFlag: any; // 操作标识
  public reviewOperateField: SpecialField = new SpecialFieldClass(); // 操作字段
  public reviewOperateFieldCopy: SpecialField = new SpecialFieldClass(); // 状态判断用
  public reviewOperateModal: boolean = false; // 模态框
  public reviewInfoHandle: ReviewInfo = new ReviewInfoClass(); // 取消复审相关处理信息
  constructor(
    private demandSrv: DemandService,
    private globalSrv: GlobalService,
  ) {}

  ngOnInit() {
    this.reviewDataInit(this.reviewNowPage, this.reviewPageOption.pageSize);
  }
  // 数据初始化
  private reviewDataInit(pageNo, pageSize) {
    this.demandSrv.getReviewList({pageNo, pageSize}).subscribe((res) => {
      this.reviewTableData = res.data.contents;
      this.reviewPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 角色操作代理请求函数
  private reviewHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.reviewOperateModal = false;
      this.reviewDataInit(this.reviewNowPage, this.reviewPageOption.pageSize);
    });
  }

  // 特殊台账操作操作
  public reviewOperate(flag: string, item?: any) {
    switch (flag) {
      // 取消操作初始化
      case 'cancel':
        this.reviewOperateModal = true;
        this.reviewInfoHandle.id = item.id;
        this.reviewInfoHandle.completionStatus = '2';
        break;
      // 编辑操作初始化
      case 'update':
        this.globalSrv.publicGetSpecialInfo({id: item.specialPersonnelId}).subscribe((res) => {
          this.reviewOperateField = Object.assign({}, res.data);
          this.reviewOperateFieldCopy = Object.assign({}, res.data);
          this.reviewInfoHandle.completionStatus = '3';
          this.reviewInfoHandle.id = item.id;
          this.reviewOperateModal = true;
        });
        break;
      // 保存操作
      case 'save':
        // 完成复审操作
        if (this.reviewInfoHandle.completionStatus === '3') {
          this.demandSrv.updateArchivesInfo(this.reviewOperateField).subscribe(() => {
            this.reviewHttpOperate(this.demandSrv.handleReviewInfo(this.reviewInfoHandle));
          });
          break;
        }
        this.reviewHttpOperate(this.demandSrv.handleReviewInfo(this.reviewInfoHandle));
        break;
      // 删除操作
      case 'del':
        console.log('暂时不做');
        break;
    }
  }

  // 分页操作
  public reviewPageEvent(page) {
    this.reviewNowPage = page;
    this.reviewDataInit(page, this.reviewPageOption.pageSize);
  }
}
