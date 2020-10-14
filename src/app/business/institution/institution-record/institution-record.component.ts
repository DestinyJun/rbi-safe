import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../common/public/Api';
import {InstitutionService} from '../../../common/services/institution.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-institution-record',
  templateUrl: './institution-record.component.html',
  styleUrls: ['./institution-record.component.scss']
})
export class InstitutionRecordComponent implements OnInit {

  public institutionRecordPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public institutionRecordTableHeader: TableHeader[] = [
    {field: 'name', header: '制度名称'},
    {field: 'suit', header: '适宜性'},
    {field: 'effective', header: '有效性'},
    {field: 'execute', header: '执行性'},
    {field: 'evaluator', header: '评估人'},
    {field: 'evaluateOpinion', header: '评估意见'},
    {field: 'updater', header: '修改人'},
    {field: 'updateExplain', header: '修改说明'},
  ]; // 表头字段
  public institutionRecordTableData: any[]; // 表体数据
  public institutionRecordTableSelect: any = []; // 表格选择数据
  public institutionRecordNowPage: number = 1; // 当前页
  public institutionRecordOperateFlag: any ; // 操作标识
  constructor(
    private institutionSrv: InstitutionService,
  ) { }

  ngOnInit() {
    this.institutionRecordDataInit(this.institutionRecordNowPage, this.institutionRecordPageOption.pageSize);
  }
  // 数据初始化
  private institutionRecordDataInit(pageNo, pageSize) {
    this.institutionSrv.institutionRecordList({pageNo, pageSize}).subscribe((res) => {
      this.institutionRecordTableData = res.data.contents;
      this.institutionRecordPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private institutionRecordHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.institutionRecordDataInit(this.institutionRecordNowPage, this.institutionRecordPageOption.pageSize);
    });
  }

  // 基础操作
  public institutionRecordOperate(flag: string, item?: any, obj?: any, obj2?: any) {
    switch (flag) {
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.institutionRecordHttpOperate(this.institutionSrv.institutionRecordDel({data: [{id: item.id}]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.institutionRecordTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.institutionRecordTableSelect.length}项删除吗？`)) {
            this.institutionRecordHttpOperate(this.institutionSrv.institutionRecordDel({data: this.institutionRecordTableSelect.map((val) => ({id: val.id}))}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
    }
  }

  // 分页操作
  public institutionRecordPageEvent(page) {
    this.institutionRecordNowPage = page;
    this.institutionRecordDataInit(page, this.institutionRecordPageOption.pageSize);
  }
}
