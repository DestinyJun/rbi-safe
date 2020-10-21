import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../../common/public/Api';
import {GlobalService} from '../../../../common/services/global.service';
import {initializeTableTree, initializeTree} from '../../../../common/public/contents';
import {Observable} from 'rxjs';
import {IntentService} from '../../../../common/services/intent.service';
import {AddIntentAgencyFieldClass, IntentAgencyField, UpdateIntentAgencyFieldClass} from '../../intentApi';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public detailPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public detailTableHeader: TableHeader[] = [
    {field: 'name', header: '指标名称'},
    {field: 'num', header: '指标系数'},
    {field: 'pname', header: '父级名称'},
    {field: 'idt', header: '添加时间'},
  ]; // 表头字段
  public detailTableData: any[]; // 表体数据
  public detailTableSelect: any = {}; // 表格选择数据
  public detailNowPage: number = 1; // 当前页
  public detailOperateFlag: any ; // 操作标识
  public detailOperateField: IntentAgencyField = new AddIntentAgencyFieldClass(); // 操作字段
  public detailOperateModal: boolean = false; // 模态框
  public detailTreeModal: boolean = false; // 组织树模态框
  public detailTree: any[] = []; // 组织树配置项
  public detailTreeSelect: any = {}; // 组织树选择
  public detailTreeSelectLabel: any = '点击选择所属父级'; // 组织树label
  constructor(
    private intentSrv: IntentService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.detailDataInit(this.detailNowPage, this.detailPageOption.pageSize);
  }

  // 数据初始化
  private detailDataInit(pageNo, pageSize) {
    this.detailTreeInit();
    this.intentSrv.intentAgencyList({pageNo, pageSize}).subscribe((res) => {
      this.detailTableData = initializeTableTree(res.data.contents, {labelName: 'name', childrenName: 'organizationManages'});
    });
  }

  // 初始化树
  private detailTreeInit() {
    // 初始化SPI树
    this.globalSrv.publicGetIntentAgencyTree().subscribe(
      (res) => {
        this.detailTree = initializeTree(res.data, {labelName: 'name', childrenName: 'organizationManages'});
      }
    );
  }

  // 代理请求函数
  private detailHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.detailOperateModal = false;
      this.detailDataInit(this.detailNowPage, this.detailPageOption.pageSize);
    });
  }

  // 基础操作
  public detailOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.detailOperateModal = true;
        this.detailTreeSelect = {};
        this.detailOperateField = Object.assign({}, new AddIntentAgencyFieldClass());
        this.detailTreeSelectLabel = '点击选择所属父级';
        break;
      // 编辑操作初始化
      case 'update':
        if (Object.keys(this.detailTableSelect).length === 0) {
          window.alert('请选择需要编辑的项！');
          break;
        }
        this.detailTreeSelect = {};
        if (this.detailTableSelect.data.pname) {
          this.detailTreeSelectLabel = this.detailTableSelect.data.pname;
        } else {
          this.detailTreeSelectLabel = '暂无父级';
        }
        this.detailOperateField = Object.assign({}, new UpdateIntentAgencyFieldClass(), this.detailTableSelect.data);
        this.detailOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.detailOperateField.id) {
          if ('id' in this.detailTreeSelect ) {
            this.detailOperateField.pid = this.detailTreeSelect.id;
          }
          delete this.detailOperateField['pname'];
          delete this.detailOperateField['idt'];
          delete this.detailOperateField['udt'];
          this.detailHttpOperate(this.intentSrv.intentAgencyUpdate(this.detailOperateField));
        }
        // 新增保存
        else {
          this.detailOperateField.pid = this.detailTreeSelect.id;
          this.detailHttpOperate(this.intentSrv.intentAgencyAdd(this.detailOperateField));
        }
        break;
      // 删除操作
      case 'del':
        if (Object.keys(this.detailTableSelect).length === 0) {
          window.alert('请选择需要编辑的项！');
          break;
        }
        if (window.confirm('您确定需要删除吗？')) {
          this.detailHttpOperate(this.intentSrv.intentAgencyDel({id: this.detailTableSelect.data.id}));
        }
        break;
      // 树操作
      case 'tree':
        this.detailTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.detailTreeModal = false;
        break;
    }
  }

  // 分页操作
  public detailPageEvent(page) {
    this.detailNowPage = page;
    this.detailDataInit(page, this.detailPageOption.pageSize);
  }

}
