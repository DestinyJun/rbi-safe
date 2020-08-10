import { Component, OnInit } from '@angular/core';
import {PageOption, TableHeader} from '../../../../common/public/Api';
import {SafetrainService} from '../../../../common/services/safetrain.service';
import {Observable} from 'rxjs';
import {PublicMethodService} from "../../../../common/public/public-method.service";
@Component({
  selector: 'app-scs-contents',
  templateUrl: './scs-contents.component.html',
  styleUrls: ['./scs-contents.component.scss']
})
export class ScsContentsComponent implements OnInit {
  public contentsPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public contentsTableHeader: TableHeader[] = [
    {field: 'resourceName', header: '文件名'},
    {field: 'resourceType', header: '文件类型'},
    {field: 'contentCategoryName', header: '内容类型'},
    {field: 'operatorName', header: '添加人'},
    {field: 'idt', header: '添加时间'},
    {field: 'studyTime', header: '学时'},
  ]; // 表头字段
  public contentsTableData: any[]; // 表体数据
  public contentsNowPage: number = 1; // 当前页
  public contentsOperateFlag: string ; // 操作标识
  public contentsOperateField: FormData = new FormData(); // 操作字段
  public contentsOperateModal: boolean = false; // 模态框
  public editModal: boolean = false; // 编辑模态框
  public contentsClassifyOptions: any[] = []; // 下拉选框option
  public contentsClassifySelected: any; // 下拉选框的选择内容
  public studyTime: number = 0; // 填写当前的学时
  public curId: number = 0; // 填写当前的ID
  public contentsFileOptions: any[] = [
    {label: '视频', value: '视频'},
    {label: '文件', value: '文件'},
  ]; // 下拉选框option
  public contentsFileSelected: any; // 下拉选框的选择内容
  constructor(
    private safeSrv: SafetrainService,
    private toolSrv: PublicMethodService,
  ) { }

  ngOnInit() {
    this.contentsDataInit(this.contentsNowPage, this.contentsPageOption.pageSize);
    // 分类初始化
    this.safeSrv.getScsContentsClassify().subscribe((res) => {
      this.contentsClassifyOptions = res.data;
    });
  }
  // 数据初始化
  private contentsDataInit(pageNo, pageSize) {
    this.safeSrv.getScsContentsList({pageNo, pageSize}).subscribe((res) => {
      this.contentsTableData = res.data.contents;
      this.contentsPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 操作代理请求函数
  private contentsHttpOperate(test: Observable<any>) {
    test.subscribe((res) => {
      console.log(res);
      // 操作成功后重新初始化数据列表
      this.contentsOperateModal = false;
      this.contentsDataInit(this.contentsNowPage, this.contentsPageOption.pageSize);
      // this.contentsOperateField  = new FormData();
    });
  }

  // 搜索请求
  private contentsSearchOperate() {
    const searchField = {
      pageNo: this.contentsNowPage,
      pageSize: this.contentsPageOption.pageSize,
      value: this.contentsClassifySelected.id
    };
    this.safeSrv.searchScsContentsInfo(searchField).subscribe((res) => {
      this.contentsTableData = res.data.contents;
      this.contentsPageOption.totalRecord = res.data.totalRecord;
    });
  }

  public openEdit(data): void {
    console.log(data);
    this.editModal = true;
    this.curId = data.id;
    this.studyTime = data.studyTime;
  }

  // 操作
  public contentsOperate(flag: string, item?: any) {
    switch (flag) {
      // 查看操作
      case 'view':
        window.open(item.resourcePath);
        break;
      // 保存操作
      case 'save':
        this.contentsOperateField.append('contentCategoryId', this.contentsClassifySelected.id);
        this.contentsOperateField.append('file', item.files[0]);
        this.contentsOperateField.append('resourceType', `${this.contentsFileSelected}`);
        this.contentsOperateField.append('studyTime', `${this.studyTime}`);
        this.contentsHttpOperate(this.safeSrv.addScsContentsInfo(this.contentsOperateField));
        break;
      // 删除操作
      case 'del':
        this.contentsHttpOperate(this.safeSrv.delScsContentsInfo({data: [{id: item.id}]}));
        break;
      // 筛选搜索
      case 'search':
        if (!this.contentsClassifySelected) {
          this.contentsDataInit(this.contentsNowPage = 1, this.contentsPageOption.pageSize);
          break;
        }
        this.contentsSearchOperate();
        break;
    }
  }

  // 分页操作
  public contentsPageEvent(page) {
    this.contentsNowPage = page;
    if (!this.contentsClassifySelected) {
      this.contentsDataInit(page, this.contentsPageOption.pageSize);
      return;
    }
    this.contentsSearchOperate();
  }

  // 修改学时
  public editStudyTime(): void {
    this.safeSrv.updateStudyTime({studyTime: this.studyTime, id: this.curId}).subscribe(res => {
      this.contentsDataInit(this.contentsNowPage, this.contentsPageOption.pageSize);
      this.toolSrv.setToast('info', '操作提示', res.message);
    });
  }
}
