import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../common/public/Api';
import {AddIntentCultureField, IntentCultureField, UpdateIntentCultureField, UpdateIntentInvestField} from '../intentApi';
import {Es, InitFormGroup, orgInitializeTree} from '../../../common/public/contents';
import {IntentService} from '../../../common/services/intent.service';
import {GlobalService} from '../../../common/services/global.service';
import {Observable} from 'rxjs';
import {Hidden, Show} from '../../../store/loadstatus.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store/loadstatus.state';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-intent-culture',
  templateUrl: './intent-culture.component.html',
  styleUrls: ['./intent-culture.component.scss']
})
export class IntentCultureComponent implements OnInit {

  public culturePageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public cultureTableHeader: TableHeader[] = [
    {field: 'organizationName', header: '实施单位'},
    {field: 'activityName', header: '活动名称'},
    {field: 'activityLevel', header: '活动等级'},
    {field: 'startTime', header: '开展日期'},
  ]; // 表头字段
  public cultureTableData: any[]; // 表体数据
  public cultureTableSelect: any = []; // 表格选择数据
  public cultureNowPage: number = 1; // 当前页
  public cultureOperateFlag: any ; // 操作标识
  public cultureOperateField: IntentCultureField = new AddIntentCultureField(); // 操作字段
  public cultureOperateModal: boolean = false; // 模态框
  public cultureOrgTreeModal: boolean = false; // 组织树模态框
  public cultureOrgTree: OrgTree[] = []; // 组织树配置项
  public cultureOrgTreeSelect: OrgTree = {}; // 组织树选择
  public cultureOrgTreeSelectLabel: any = '点击选择单位'; // 组织树label
  public cultureDropdownOptions: any = [
    {label: '公司级', value: '公司级'},
    {label: '分厂级', value: '分厂级'},
    {label: '车间级', value: '车间级'},
    {label: '班组级', value: '班组级'},
  ]; // 状态下拉配置项
  public cultureEs: any = Es; // 日期选择插件
  public cultureImgList: any = []; // 图片文件列表
  public cultureFormModal = this.fbSrv.group(InitFormGroup(new AddIntentCultureField())); // 表单模型
  constructor(
    private intentSrv: IntentService,
    private globalSrv: GlobalService,
    private store: Store<AppState>,
    private fbSrv: FormBuilder
  ) { }

  ngOnInit() {
    this.cultureDataInit(this.cultureNowPage, this.culturePageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.cultureOrgTree = orgInitializeTree(res.data);
      }
    );
  }
  // 数据初始化
  private cultureDataInit(pageNo, pageSize) {
    this.intentSrv.intentCultureList({pageNo, pageSize}).subscribe((res) => {
      this.cultureTableData = res.data.contents;
      this.culturePageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private cultureHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.cultureOperateModal = false;
      this.cultureDataInit(this.cultureNowPage, this.culturePageOption.pageSize);
    });
  }

  // 基础操作
  public cultureOperate(flag: string, item?: any, obj?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.cultureOperateModal = true;
        this.cultureOperateField = Object.assign({}, new AddIntentCultureField());
        this.cultureOrgTreeSelectLabel = '点击选择单位';
        this.cultureOrgTreeSelect = {};
        item.clear();
        break;
      // 编辑操作初始化
      case 'update':
        obj.clear();
        this.cultureImgList = [];
        item.culturalConstructionAnnexes.forEach(res => {
          this.cultureImgList.push(res);
        });
        this.cultureOrgTreeSelectLabel = item.organizationName;
        this.cultureOrgTreeSelect = {};
        this.cultureOperateField = Object.assign({}, new UpdateIntentCultureField(), item);
        const Obj = {};
        Object.keys(this.cultureFormModal.value).forEach((keys) => {
          Obj[keys] = item[keys];
        });
        this.cultureFormModal.setValue(Obj);
        this.cultureOperateModal = true;
        break;
      // 保存操作
      case 'save':
        this.store.dispatch(new Show());
        // 修改保存
        if (this.cultureOperateField.id) {
          if ('id' in this.cultureOrgTreeSelect ) {
            this.cultureOperateField.organizationId = this.cultureOrgTreeSelect.id;
            this.cultureOperateField.organizationName = this.cultureOrgTreeSelect.label;
            this.cultureFormModal.patchValue({
              organizationId: this.cultureOrgTreeSelect.id,
              organizationName: this.cultureOrgTreeSelect.label,
            }, {onlySelf: false, emitEvent: false});
          }
          if (this.cultureFormModal.valid) {
            const field = new FormData();
            Object.keys({...this.cultureFormModal.value, id: this.cultureOperateField.id }).forEach(res => {
              field.append(res, this.cultureOperateField[res]);
            });
            if (item.length > 0) {
              item.forEach(res => {
                field.append('img', res);
              });
            }
            this.cultureHttpOperate(this.intentSrv.intentCultureUpdate(field));
          }
          else {
            window.alert('请把参数填写完整!');
            this.store.dispatch(new Hidden());
          }
        }
        // 新增保存
        else {
          this.cultureFormModal.patchValue({
            organizationId: this.cultureOrgTreeSelect.id,
            organizationName: this.cultureOrgTreeSelect.label,
          }, {onlySelf: false, emitEvent: false});
          if (this.cultureFormModal.valid) {
            const field = new FormData();
            Object.keys(this.cultureFormModal.value).forEach(res => {
              field.append(res, this.cultureFormModal.value[res]);
            });
            if (item.length > 0) {
              item.forEach(res => {
                field.append('img', res);
              });
            }
            this.cultureHttpOperate(this.intentSrv.intentCultureAdd(field));
          }
          else {
            window.alert('请把参数填写完整!');
            this.store.dispatch(new Hidden());
          }
        }
        break;
      // 取消操作
      case 'cancel':
        this.cultureOperateModal = false;
        this.cultureFormModal.reset({}, {onlySelf: true, emitEvent: false});
        break;
      // 删除操作
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.cultureHttpOperate(this.intentSrv.intentCultureDel({data: [{id: item.id}]}));
        }
        break;
      // 图片删除操作
      case 'imgDel':
        if (window.confirm('您确定需要删除吗？')) {
          this.intentSrv.intentCultureImgDel({id: item}).subscribe((res) => {
            this.cultureImgList = this.cultureImgList.filter((val) => (val.id !== item));
            this.cultureDataInit(this.cultureNowPage, this.culturePageOption.pageSize);
          });
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.cultureTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.cultureTableSelect.length}项删除吗？`)) {
            this.cultureHttpOperate(this.intentSrv.intentCultureDel({data: this.cultureTableSelect.map((val) => ({id: val.id}))}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
      // 树操作
      case 'tree':
        this.cultureOrgTreeModal = true;
        break;
      // 树选择确定
      case 'select':
        this.cultureOrgTreeModal = false;
        break;
    }
  }

  // 分页操作
  public culturePageEvent(page) {
    this.cultureNowPage = page;
    this.cultureDataInit(page, this.culturePageOption.pageSize);
  }

}
