import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../common/services/global.service';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';
import {TroubleProcessService} from '../../../common/services/trouble-process.service';
import {Router} from '@angular/router';
import {setVlaueToLabel} from '../../../common/public/contents';
import {FormBuilder, FormGroup} from '@angular/forms';
import {OragizationTree, TreeNode} from '../../../common/public/Api';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {ListCustomizationService} from '../../../common/services/list-customization.service';

@Component({
  selector: 'app-list-customization',
  templateUrl: './list-customization.component.html',
  styleUrls: ['./list-customization.component.scss']
})
export class ListCustomizationComponent implements OnInit {
  public optionTable: any;
  public archivesListSelect = [];
  public table = {
    tableheader: {background: '#F5F6FA', color: '#000'},
    tableContent: [
      {background: '#FFFFFF', color: '#000'}],
    detailBtn: ['#3B86FF']
  };
  public themeSub: Subscription;
  public archivesListContent: any;
  public dataTrees: OragizationTree[];
  public dataTree: OragizationTree;
  public showDialog: boolean = false;
  public pageNo = 1;
  public pageOption: any;
  public treeDialog: boolean;
  public listName: string;
  public position: string;
  public id;
  public totalFraction = 0;
  // 多个响应式表单
  public contentForms: Array<FormGroup> = [];
  // 记录分数
  public scores = [];
  constructor(
    private themeSrv: ThemeService,
    private req: ListCustomizationService,
    private globalSrv: GlobalService,
    private toolSrv: PublicMethodService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.themeSub = this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.archivesListContent);
      }
    );

    this.archivesListSelect = [];
    this.getOrgazitonTree();
  }


  ngOnInit() {
    this.initarchivesListData();
    this.req.page({'pageNo': '1', 'pageSize': '5'}).subscribe(res => {
      console.log(res);
    });
  }

  public selectData(e): void {
    this.archivesListSelect = e;
    console.log(e);
  }

  public DetailClick(e): void {
    this.totalFraction = 0;
    if (e.label === '详情') {
      console.log(e);
      this.dataTree = {label: '', value: ''};
      this.dataTree.label = e.data.organizationName;
      this.dataTree.value = e.data.organizationId;
      this.position = e.data.position;
      this.listName = e.data.name;
      this.contentForms = [];
      this.id = e.data.id;
      e.data.doubleDutyTemplateContents.forEach(value => {
        const content = {content: [''], fraction: ['']};
        let newform: FormGroup;
        newform = this.fb.group(content);
        newform.patchValue(value);
        this.contentForms.push(newform);
        // tslint:disable-next-line:radix
        this.totalFraction += Number.parseInt(value.fraction);
        this['form' + this.contentForms.length] = newform;
      });
      this.showDialog = true;
    }
  }

  // set table data （设置列表数据）
  public setTableOption(data1): void {
    // console.log(data1.color);
    this.optionTable = {
      width: '100%',
      // height: ''
      header: {
        data: [
          {field: 'name',	header: '清单名称'},
          {field: 'position',	header: '岗位'},
          {field: 'organizationName',	header: '组织名'},
          {field: 'companyName',	header: '分公司'},
          {field: 'factoryName',	header: '厂矿'},
          {field: 'workshopName',	header: '车间'},
          {field: 'className',	header: '班组'},
          {field: null,	header: '检查详情'},
        ],
        style: {background: this.table.tableheader.background, color: this.table.tableheader.color, height: '6vh'}
      },
      Content: {
        data: data1,
        styleone: {
          background: this.table.tableContent[0].background,
          color: this.table.tableContent[0].color,
          textAlign: 'center',
          height: '3vw'
        },
      },
      type: 3,
      tableList: [{label: '详情', color: this.table.detailBtn[0]}]
    };
  }

  public initarchivesListData(): void {
    this.req.page({pageNo: this.pageNo, pageSize: 10}).subscribe(val => {
      console.log(val);
      this.archivesListContent = val.data.contents.map(v => {
        return v;
      });
      this.pageOption = {totalRecord: val.data.totalRecord, pageSize: val.data.pageSize};
      this.setTableOption(this.archivesListContent);
    });
    this.setTableOption(this.archivesListContent);
  }

  // 获取树结构
  public getOrgazitonTree(): void {
    this.globalSrv.getOrgazitionTreeData({}).subscribe(value => {
      if (value.data) {
        this.dataTrees = this.initializeTree(value.data);
      } else {
        this.toolSrv.setToast('error', '操作', '组织数据获取失败');
      }
    });
  }

  // Tree structure initialization
  public initializeTree(data): any {
    const oneChild = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < data.length; i++) {
      const childnode: TreeNode = {};
      childnode.value = data[i].id;
      childnode.label = data[i].organizationName;
      // childnode.level = data[i].level;
      childnode.selectable = true;
      if (data[i].chiled != null && data[i].chiled.length !== 0) {
        childnode.children = this.initializeTree(data[i].chiled);
      } else {
        childnode.children = [];
      }
      oneChild.push(childnode);
    }
    return oneChild;
  }

  // Paging event (分页事件)
  public clickEvent(e): void {
    this.pageNo = e;
    this.initarchivesListData();
  }

  public dataTreeSureClick(): void {
    this.treeDialog = false;
    console.log(this.dataTree);
  }

  public clearData(): void {
    this.contentForms.splice(0);
    this.listName = null;
    this.position = null;
    this.dataTree = null;
    this.id = null;
    this.totalFraction = 0;
    this.scores.splice(0);
  }

  public resetAllData(): void {
    this.archivesListSelect = [];
  }

  public add(): void {
    // 每个表单的项（都是相同的）
    const content = {content: [''], fraction: ['']};
    let newform: FormGroup;
    newform = this.fb.group(content);
    this.contentForms.push(newform);
    this['form' + this.contentForms.length] = newform;
    // 增加一项纪录分数标识
    this.scores.push(0);
  }

  public save(dataTree): void {
    const data = {
      name: this.listName,
      position: this.position,
      organizationId:  dataTree.value,
      organizationName: dataTree.label,
      contentArry: [],
      id : this.id
    };
    // 验证全部表单是否为空
    this.contentForms.forEach(form => {
      data.contentArry.push(form.value);
    });
    console.log(data);
    // 判断是更新还是新增
    if (data.id) {
      this.req.update(data).subscribe(res => {
        console.log(res);
        this.initarchivesListData();
      });
      // 在本地修改
      this.archivesListContent.map(value => {
        if (value.id === data.id) {
          value = data;
        }
        return value;
      });
    } else {
      this.req.add(data).subscribe(res => {
        console.log(res);
        this.initarchivesListData();
      });
      // 在本地增加
      this.archivesListContent.push(data);
    }
    this.showDialog = false;
  }

  public getFraction(e): void {
    this.totalFraction = 0;
    this.scores.forEach(score => {
      this.totalFraction += Number(score);
    });
  }

  public remove(form: FormGroup): void {
    // tslint:disable-next-line:radix
    this.totalFraction -= Number.parseInt(form.get('fraction').value);
    const i = this.contentForms.indexOf(form);
    this.contentForms.splice(i, 1);
    this.scores.splice(i, 1);
  }
}
