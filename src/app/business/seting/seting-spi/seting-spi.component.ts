import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../common/public/Api';
import {initializeTableTree, initializeTree} from '../../../common/public/contents';
import {GlobalService} from '../../../common/services/global.service';
import {Observable} from 'rxjs';
import {SetingSpiService} from './seting-spi.service';
import {AddSetingSpiApiFieldClass, SetingSillApiField, SetingSpiApiField, UpdateSetingSillApiFieldClass, UpdateSetingSpiApiFieldClass} from './SetingSpiApi';

@Component({
  selector: 'app-seting-spi',
  templateUrl: './seting-spi.component.html',
  styleUrls: ['./seting-spi.component.scss']
})
export class SetingSpiComponent implements OnInit {

  public setingSpiPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public setingSpiTableHeader: TableHeader[] = [
    {field: 'name', header: '指标名称'},
    {field: 'num', header: '计算系数'},
    {field: 'pname', header: '父级名称'},
    {field: 'idt', header: '添加时间'},
  ]; // 表头字段
  public setingSpiTableData: any[]; // 表体数据
  public setingSpiTableSelect: any = {}; // 表格选择数据
  public setingSpiNowPage: number = 1; // 当前页
  public setingSpiOperateFlag: any ; // 操作标识
  public setingSpiOperateField: SetingSpiApiField = new AddSetingSpiApiFieldClass(); // 操作字段
  public setingSpiOperateModal: boolean = false; // 模态框
  public setingSpiTreeModal: boolean = false; // 组织树模态框
  public setingSpiTree: any[] = []; // 组织树配置项
  public setingSpiTreeSelect: any = {}; // 组织树选择
  public setingSpiTreeSelectLabel: any = '点击选择所属父级'; // 组织树label
  public setingSpiDropdownOptions: any = []; // 状态下拉配置项
  public setingSpiSillOperateField: SetingSillApiField = new UpdateSetingSillApiFieldClass(); // 阈值操作字段
  constructor(
    private setingSpiSrv: SetingSpiService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.setingSpiDataInit(this.setingSpiNowPage, this.setingSpiPageOption.pageSize);

    // 初始化隐患排查模块公共参数接口
    this.globalSrv.getHidConfigData({data: [{settingType: 'WARNING_CYCLE'}]}).subscribe(
      (res) => {
        this.setingSpiDropdownOptions = res.data.WARNING_CYCLE.map((item) => ({label: item.settingName, value: item.settingCode}));
        this.setingSpiSillInit();
      }
    );
  }

  // 初始化周期阈值
  private setingSpiSillInit() {
    this.setingSpiSrv.setingSpiViewSill().subscribe((res) => {
      for (const key in this.setingSpiSillOperateField) {
        if (this.setingSpiSillOperateField.hasOwnProperty(key)) {
          this.setingSpiSillOperateField[key] = res.data[key];
        }
      }
    });
  }

  // 数据初始化
  private setingSpiDataInit(pageNo, pageSize) {
    this.setingSpiTreeInit();
    this.setingSpiSrv.setingSpiList({pageNo, pageSize}).subscribe((res) => {
      this.setingSpiTableData = initializeTableTree(res.data.contents, {labelName: 'name', childrenName: 'spiDTOs'});
    });
  }

  // 初始化树
  private setingSpiTreeInit() {
    // 初始化SPI树
    this.globalSrv.publicGetSpiTree().subscribe(
      (res) => {
        this.setingSpiTree = initializeTree(res.data, {labelName: 'name', childrenName: 'spiDTOs'});
      }
    );
  }

  // 代理请求函数
  private setingSpiHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.setingSpiOperateModal = false;
      this.setingSpiDataInit(this.setingSpiNowPage, this.setingSpiPageOption.pageSize);
    });
  }

  // 基础操作
  public setingSpiOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.setingSpiOperateModal = true;
        this.setingSpiTreeSelect = {};
        this.setingSpiOperateField = Object.assign({}, new AddSetingSpiApiFieldClass());
        this.setingSpiTreeSelectLabel = '点击选择所属父级';
        break;
      // 编辑操作初始化
      case 'update':
        if (Object.keys(this.setingSpiTableSelect).length === 0) {
          window.alert('请选择需要编辑的项！');
          break;
        }
        this.setingSpiTreeSelect = {};
        if (this.setingSpiTableSelect.data.pname) {
          this.setingSpiTreeSelectLabel = this.setingSpiTableSelect.data.pname;
        } else {
          this.setingSpiTreeSelectLabel = '暂无父级';
        }
        this.setingSpiOperateField = Object.assign({}, new UpdateSetingSpiApiFieldClass(), this.setingSpiTableSelect.data);
        this.setingSpiOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.setingSpiOperateField.id) {
          if ('id' in this.setingSpiTreeSelect ) {
            this.setingSpiOperateField.pid = this.setingSpiTreeSelect.id;
          }
          delete this.setingSpiOperateField['pname'];
          delete this.setingSpiOperateField['idt'];
          delete this.setingSpiOperateField['udt'];
          this.setingSpiHttpOperate(this.setingSpiSrv.setingSpiUpdate(this.setingSpiOperateField));
        }
        // 新增保存
        else {
          this.setingSpiOperateField.pid = this.setingSpiTreeSelect.id;
          this.setingSpiHttpOperate(this.setingSpiSrv.setingSpiAdd(this.setingSpiOperateField));
        }
        break;
      // 删除操作
      case 'del':
        if (Object.keys(this.setingSpiTableSelect).length === 0) {
          window.alert('请选择需要编辑的项！');
          break;
        }
        if (window.confirm('您确定需要删除吗？')) {
          this.setingSpiHttpOperate(this.setingSpiSrv.setingSpiDel({id: this.setingSpiTableSelect.data.id}));
        }
        break;
      // 阈值修改操作
      case 'sillUpdate':
        if (window.confirm('您确定需要修改吗？')) {
          this.setingSpiSrv.setingSpiUpdateSill(this.setingSpiSillOperateField).subscribe(() => {
            this.setingSpiSillInit();
          });
        }
        break;
      // 树操作
      case 'tree':
        this.setingSpiTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.setingSpiTreeModal = false;
        break;
    }
  }

  // 分页操作
  public setingSpiPageEvent(page) {
    this.setingSpiNowPage = page;
    this.setingSpiDataInit(page, this.setingSpiPageOption.pageSize);
  }

}
