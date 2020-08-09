import {Component, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';
import {SetingService} from '../../../common/services/seting.service';
import {nums, PageOption, Role, TreeNodeClass} from '../../../common/public/Api';
import {initializeTree, objectCopy, reverseTree, rmRepeatArray} from '../../../common/public/contents';
import {GlobalService} from '../../../common/services/global.service';
import {PublicMethodService} from '../../../common/public/public-method.service';

@Component({
  selector: 'app-roles-manager',
  templateUrl: './roles-manager.component.html',
  styleUrls: ['./roles-manager.component.scss']
})
export class RolesManagerComponent implements OnInit {
  public themeSub: Subscription;
  public roleTableHeader: any[] = [
    {field: 'roleName', header: '角色名称'},
    {field: 'level', header: '等级'},
    {field: 'whetherSee', header: '是否能看全部隐患'},
    {field: 'enabled', header: '是否启用'},
  ]; // 表格组件表头内容
  public roleTableData: Role[] = []; // 表格组件表体内容
  public rolePageOption: PageOption = {
    pageSize: 10, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public roleNowPage: number = 1; // 当前页
  public rolePermissionInfo: any; // 角色权限信息
  public rolePermissionModal: boolean = false; // 角色权限详情modal
  public roleUpdateModal: boolean = false; // 角色编辑modal
  public roleInputField: Role = {
    roleName: '',
    whetherSee: nums.one,
    enabled: nums.one,
  }; // 角色初始化
  public roleDropdown: any[] = [
    {name: '0', value: 0},
    {name: '1', value: 1},
    {name: '2', value: 2},
    {name: '3', value: 3},
  ];
  public roleWebPermissionCheckList: any = []; // 已选择的权限id列表
  public roleDropdownSelect: any;
  public roleWebPermissionTree: any; // web端权限树
  public roleAppPermissionTree: any; // app端权限树
  public roleWebPermissionSelected: any[] = []; // web端权限选择
  public roleAppPermissionSelected: any; // app端权限选择
  public roleOperateFlag: 'update' | 'save' | 'del' | 'permission' | 'add' | 'addSave'; // 角色操作标签
  constructor(
    private themeSrv: ThemeService,
    private setSrv: SetingService,
    private globalSrv: GlobalService,
    private publicSrv: PublicMethodService,
  ) {

  }


  ngOnInit() {
    this.roleDataInit(this.roleNowPage, this.rolePageOption.pageSize);
  }

  // 数据初始化
  private roleDataInit(pageNo, pageSize) {
    this.setSrv.getRoleInfoPageData(
      {pageNo, pageSize}
    ).subscribe((res) => {
      this.roleTableData = res.data.contents;
      this.rolePageOption.totalRecord = res.data.totalRecord;
    });
  }

  // 权限树初始化函数
  private rolePermissionTreeInit(item = null) {
    this.globalSrv.getLimitTreeData().subscribe((res) => {
      this.roleWebPermissionTree = initializeTree(
        res.data[0].permissionTreeInfoList ? res.data[0].permissionTreeInfoList : [],
        {labelName: 'permissionName', childrenName: 'sysPermissionList'}
      );
      this.checkNode(this.roleWebPermissionSelected, this.roleWebPermissionTree, this.roleWebPermissionCheckList);
      this.roleAppPermissionTree = initializeTree(
        res.data[1].permissionTreeInfoList ? res.data[1].permissionTreeInfoList : [],
        {labelName: 'permissionName', childrenName: 'sysPermissionList'}
      );
    });
  }

  // 角色操作代理请求函数
  private roleHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.roleDataInit(this.roleNowPage, this.rolePageOption.pageSize);
      this.roleUpdateModal = false;
    });
  }

  // 角色增删改操作
  public roleOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.rolePermissionTreeInit();
        this.roleUpdateModal = true;
        this.roleWebPermissionSelected = null; // 初始化权限树选择
        this.roleInputField = {
          roleName: '',
          level: '',
          whetherSee: nums.one,
          enabled: nums.one,
          sysRolePermissionList: []
        };
        break;
      // 编辑操作初始化
      case 'update':
        this.roleWebPermissionCheckList = []; // 初始化权限树id列表
        this.getTreeValue(item.rolePermissionInfoList);
        this.rolePermissionTreeInit(item);
        this.roleUpdateModal = true; // 显示弹窗
        this.roleWebPermissionSelected = []; // 初始化权限树选择
        this.roleDropdownSelect = Object.assign({}, { name: item.level, value: item.level}); // 下拉初始化
        this.roleInputField = Object.assign(objectCopy(
          {
            id: null,
            roleName: '',
            level: item.level,
            whetherSee: nums.one,
            enabled: nums.one,
            sysRolePermissionList: []
          }, item), {sysRolePermissionList: item.rolePermissionInfoList ? item.rolePermissionInfoList : []});
        //
        // console.log(this.roleWebPermissionTree);
        break;
      // 保存操作
      case 'save':
        // 角色名称非空校验
        if (!this.roleInputField.roleName) {
          this.publicSrv.setToast('error', '操作提示', '角色名称必填');
          break;
        }
        // 修改保存操作
        if ('id' in this.roleInputField) {
          // 如果选择了权限
          if (this.roleWebPermissionSelected) {
            this.roleInputField.sysRolePermissionList = [];
            this.roleWebPermissionSelected.forEach((res) => {
              this.roleInputField.sysRolePermissionList.push({permissionId: res.id});
              this.roleInputField.sysRolePermissionList.push({permissionId: res.parentId});
            });
          }
          // 如果没有选择权限，则初始化自身权限
          else {
            // 判断下是否选择了权限
            if (this.roleInputField.sysRolePermissionList) {
              this.roleInputField.sysRolePermissionList = reverseTree(
                initializeTree(
                  this.roleInputField.sysRolePermissionList,
                  {labelName: 'permissionName', childrenName: 'rolePermissionInfos'}))
                .map((res) => ({permissionId: res.id})
                );
            }
          }
          this.roleInputField.sysRolePermissionList = rmRepeatArray(this.roleInputField.sysRolePermissionList);
          // 请求更新操作
          if (this.roleDropdownSelect) {
            this.roleInputField.level = this.roleDropdownSelect.value;
          }
          this.roleHttpOperate(this.setSrv.updateRoleInfo(this.roleInputField));
        }
        // 新增保存操作
        else {
          // 如果选择了权限
          if (this.roleWebPermissionSelected) {
            this.roleWebPermissionSelected.forEach((res) => {
              this.roleInputField.sysRolePermissionList.push({permissionId: res.id});
              this.roleInputField.sysRolePermissionList.push({permissionId: res.parentId});
            });
          }
          // 请求保存操作
          if (this.roleDropdownSelect) {
            this.roleInputField.level = this.roleDropdownSelect.value;
          }
          this.roleInputField.sysRolePermissionList = rmRepeatArray(this.roleInputField.sysRolePermissionList);
          this.roleHttpOperate(this.setSrv.addRoleInfo(this.roleInputField));
        }
        break;
      // 查看权限操作
      case 'permission':
        this.rolePermissionModal = true;
        this.rolePermissionInfo = initializeTree(
          item.rolePermissionInfoList ? item.rolePermissionInfoList : [],
          {labelName: 'permissionName', childrenName: 'rolePermissionInfos', icon: 'fa fa-clipboard'}
        );
        break;
      // 删除操作
      case 'del':
        console.log('暂时不做');
        break;
      // 测试操作：
      case 'test':
        console.log(this.roleWebPermissionSelected);
        break;
    }
  }

  // 分页操作
  public rolePageEvent(e): void {
    this.roleNowPage = e;
    this.roleDataInit(e, this.rolePageOption.pageSize);
  }

  // 角色搜索
  public roleSearchOperate(): void {
    console.log(123);
  }
  // 递归赛选后台给的权限id列表
  public  getTreeValue(data): void {
    console.log(data);
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.roleWebPermissionCheckList.push(data[i].permissionId);
        // 追加子元素
        if (data[i].hasOwnProperty('rolePermissionInfos')) {
          if (data[i].rolePermissionInfos !== null && data[i].rolePermissionInfos.length !== 0) {
            this.getTreeValue(data[i].rolePermissionInfos);
          }
        }
      }
    } else {
      this.roleWebPermissionCheckList = [];
    }
  }
  /**
   * 还原选中树结构
   * @param selectData  树结构绑定选择的列表
   * @param nodes  递归出来的树结构
   * @param str   后端返回过来的权限id列表
   */
  public  checkNode(selectData, nodes: TreeNodeClass[], str: any[]): any {
    for (let i = 0 ; i < nodes.length ; i++) {
      if (!nodes[i].check) {
        for (let j = 0 ; j < nodes[i].children.length ; j++) {
          if (str.includes(nodes[i].children[j].id)) {
            if (!selectData.includes(nodes[i].children[j])) {
              selectData.push(nodes[i].children[j]);
            }
          }
        }
      }
      if (nodes[i].check) {
        return;
      }
      this.checkNode(selectData, nodes[i].children, str);
      const count = nodes[i].children.length;
      let c = 0;
      for (let j = 0 ; j < nodes[i].children.length ; j++) {
        if (selectData.includes(nodes[i].children[j])) {
          c++;
        }
        if (nodes[i].children[j].partialSelected) { nodes[i].partialSelected = true; }
      }
      if (c === 0) {} else if (c === count) {
        nodes[i].partialSelected = false;
        if (!selectData.includes(nodes[i])) {
          selectData.push(nodes[i]);
        }
      } else {
        nodes[i].partialSelected = true;
      }
    }
  }
}
