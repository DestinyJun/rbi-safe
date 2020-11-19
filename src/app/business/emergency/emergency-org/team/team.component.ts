import { Component, OnInit } from '@angular/core';
import {OrgTree, PageOption, TableHeader} from '../../../../common/public/Api';
import {EmergencyService} from '../../../../common/services/emergency.service';
import {Observable} from 'rxjs';
import {AddEmergencyOrgPersonFieldClass, AddEmergencyOrgTeamFieldClass, EmergencyOrgPersonField, EmergencyOrgTeamField, UpdateEmergencyOrgTeamFieldClass} from '../../emergencyApi';
import {orgInitializeTree} from '../../../../common/public/contents';
import {GlobalService} from '../../../../common/services/global.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  public eoTeamPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public eoTeamTableHeader: TableHeader[] = [
    {field: 'teamName', header: '队伍名称'},
    {field: 'affiliatedUnit', header: '所属单位'},
    {field: 'natureOfTheTeam', header: '队伍性质'},
    {field: 'numberOfPeople', header: '人数'},
    {field: 'captain', header: '队长'},
    {field: 'mobilePhone', header: '队长手机'},
  ]; // 表头字段
  public eoTeamTableData: any[]; // 表体数据
  public eoTeamTableSelect: any = []; // 表格选择数据
  public eoTeamNowPage: number = 1; // 当前页
  public eoTeamOperateFlag: any ; // 操作标识
  public eoTeamOperateField: EmergencyOrgTeamField = new AddEmergencyOrgTeamFieldClass(); // 操作字段
  public eoTeamOperateModal: boolean = false; // 模态框
  public eoTeamPersonal: EmergencyOrgPersonField[] = [];
  public eoTeamOrgTree: OrgTree[] = []; // 组织单位树配置项
  public eoTeamOrgTreeModal: boolean = false; // 组织单位组织树模态框
  public eoTeamOrgTreeSelect: OrgTree = {}; // 组织单位组织树选择
  public eoTeamOrgTreeSelectLabel: any = '点击选择组织单位'; // 组织单位组织树label
  constructor(
    private emergencySrv: EmergencyService,
    private globalSrv: GlobalService,
  ) { }

  ngOnInit() {
    this.eoTeamDataInit(this.eoTeamNowPage, this.eoTeamPageOption.pageSize);
    // 初始化组织树
    this.globalSrv.getOrgazitionTreeData().subscribe(
      (res) => {
        this.eoTeamOrgTree = orgInitializeTree(res.data);
      }
    );
  }
  // 数据初始化
  private eoTeamDataInit(currentPage, pageSize) {
    this.emergencySrv.emergencyOrgTeamList({currentPage, pageSize}).subscribe((res) => {
      this.eoTeamTableData = res.data.datas;
      this.eoTeamPageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 代理请求函数
  private eoTeamHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.eoTeamOperateModal = false;
      this.eoTeamDataInit(this.eoTeamNowPage, this.eoTeamPageOption.pageSize);
    });
  }

  // 基础操作
  public eoTeamOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.eoTeamOrgTreeSelectLabel = '点击选择组织单位';
        this.eoTeamOrgTreeSelect = {};
        this.eoTeamPersonal = [];
        this.eoTeamOperateModal = true;
        this.eoTeamOperateField = Object.assign({}, new AddEmergencyOrgTeamFieldClass());
        break;
      // 编辑操作初始化
      case 'update':
        this.eoTeamOrgTreeSelectLabel = item.affiliatedUnit;
        this.eoTeamOrgTreeSelect = {};
        this.eoTeamOperateField = Object.assign({}, new UpdateEmergencyOrgTeamFieldClass(), item);
        this.eoTeamPersonal = [...this.eoTeamOperateField.mineEmergencyTeamMembers];
        this.eoTeamOperateModal = true;
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.eoTeamOperateField.id) {
          if ('id' in this.eoTeamOrgTreeSelect ) {
            this.eoTeamOperateField.affiliatedUnitId = this.eoTeamOrgTreeSelect.id;
            this.eoTeamOperateField.affiliatedUnit = this.eoTeamOrgTreeSelect.label;
          }
          this.eoTeamOperateField.mineEmergencyTeamMembers = this.eoTeamPersonal;
          this.eoTeamHttpOperate(this.emergencySrv.emergencyOrgTeamUpdate(this.eoTeamOperateField));
        }
        // 新增保存
        else {
          if ('id' in this.eoTeamOrgTreeSelect ) {
            this.eoTeamOperateField.affiliatedUnitId = this.eoTeamOrgTreeSelect.id;
            this.eoTeamOperateField.affiliatedUnit = this.eoTeamOrgTreeSelect.label;
          }
          this.eoTeamOperateField.mineEmergencyTeamMembers = this.eoTeamPersonal;
          this.eoTeamHttpOperate(this.emergencySrv.emergencyOrgTeamAdd(this.eoTeamOperateField));
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.eoTeamHttpOperate(this.emergencySrv.emergencyOrgTeamDel({ids: [item.id]}));
        }
        break;
      // 批量删除
      case 'multiple':
        if (this.eoTeamTableSelect.length > 0) {
          if (window.confirm(`您确定需要这${this.eoTeamTableSelect.length}项删除吗？`)) {
            this.eoTeamHttpOperate(this.emergencySrv.emergencyOrgTeamDel({ids: this.eoTeamTableSelect.map((val) => val.id)}));
          }
        } else {
          window.alert('请您勾选需要删除的项！');
        }
        break;
      // 组织单位
      case 'orgTree':
        this.eoTeamOrgTreeModal = true;
        break;
      // 人员添加
      case 'addPersonal':
        this.eoTeamPersonal.push(new AddEmergencyOrgPersonFieldClass());
        break;
      // 人员删除
      case 'delPersonal':
        this.eoTeamPersonal = this.eoTeamPersonal.filter((res, index) => (index !== item));
        break;
    }
  }

  // 分页操作
  public eoTeamPageEvent(page) {
    this.eoTeamNowPage = page;
    this.eoTeamDataInit(page, this.eoTeamPageOption.pageSize);
  }

}
