import {Component, OnInit} from '@angular/core';
import {AddManageFieldClass, ManageField, PageOption, TableHeader, UpdateManageFieldClass} from '../../../../common/public/Api';
import {SafetrainService} from '../../../../common/services/safetrain.service';
import {Observable} from 'rxjs';
import {Es, objectCopy} from '../../../../common/public/contents';
import {isArray} from 'util';
import {FormControl} from '@angular/forms';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';

@Component({
  selector: 'app-archives-manage',
  templateUrl: './archives-manage.component.html',
  styleUrls: ['./archives-manage.component.scss']
})
export class ArchivesManageComponent implements OnInit {
  public managePageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public manageTableHeader: TableHeader[] = [
    {field: 'name', header: '姓名'},
    {field: 'unit', header: '单位组织'},
    {field: 'typeOfCertificate', header: '合格证类型'},
    {field: 'termOfValidity', header: '有效期'},
    {field: 'dateOfIssue', header: '发证时间'},
  ]; // 表头字段
  public manageUploadRecordOption: any;
  public manageTableData: any[]; // 表体数据
  public manageNowPage: number = 1; // 当前页
  public manageOperateFlag: any; // 操作标识
  public manageOperateField: ManageField = new AddManageFieldClass(); // 操作字段
  public manageOperateModal: boolean = false; // 模态框
  public manageImportField: FormData = new FormData(); // 导入
  public manageImportFieldModal: boolean = false; // 导入模态框
  public manageEs: any = Es; // 时间选择面板本地化
  public idCard = new FormControl(''); // 监听身份证输入框,检验是否合法
  public idCardIsValid = true; // 身份证是否有效
  constructor(
    private safeSrv: SafetrainService,
  ) {
  }

  ngOnInit() {
    this.manageDataInit(this.manageNowPage, this.managePageOption.pageSize);
    this.idCard.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged()
      ).subscribe(val => {
      const value = (val + '');
      // 检验身份证号的合法性
      if (!val || value === '') {
        this.idCardIsValid = true;
      }else if (value.length > 18) { // 检查长度
        this.idCardIsValid = false;
      } else if (value.length === 18) {
        const regIdCard = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        this.idCardIsValid = regIdCard.test(value);
      } else {
        const regIdCard =  /^\d{0,17}\d$/;
        this.idCardIsValid = regIdCard.test(value);
      }
    });
  }

  // 数据初始化
  private manageDataInit(pageNo, pageSize) {
    this.safeSrv.getManageList({pageNo, pageSize}).subscribe((res) => {
      console.log(res);
      this.manageTableData = res.data.contents;
      this.managePageOption.totalRecord = res.data.totalRecord;
      this.manageOperateFlag = 'add';
    });
  }

  // 操作代理请求函数
  private manageHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.manageOperateModal = false;
      this.manageDataInit(this.manageNowPage, this.managePageOption.pageSize);
    });
  }

  // 台账操作操作
  public manageOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.manageOperateModal = true;
        this.manageOperateField = Object.assign({}, new AddManageFieldClass());
        break;
      // 编辑操作初始化
      case 'update':
        this.manageOperateField = Object.assign({}, new UpdateManageFieldClass(), item);
        for (const manageOperateFieldKey in this.manageOperateField) {
          if (this.manageOperateField[manageOperateFieldKey]) {
            // 2020-08-03 - 2020-08-15
            this.manageOperateField[manageOperateFieldKey] = (this.manageOperateField[manageOperateFieldKey] + '').replace('至', ' - ');
          }
        }
        console.log(this.manageOperateField);
        this.manageOperateModal = true;
        break;
      // 保存操作
      case 'save':
        const field = objectCopy(this.manageOperateField, this.manageOperateField);
        for (const manageOperateFieldKey in field) {
          if (field[manageOperateFieldKey]) {
            // 2020-08-03 - 2020-08-15
            field[manageOperateFieldKey] = (field[manageOperateFieldKey] + '').replace(' - ', '至');
            field[manageOperateFieldKey] = (field[manageOperateFieldKey] + '').replace(',', '至');
          }
        }
        Object.keys(field).forEach((key) => {
          if (isArray(field[key])) {
            field[key] = field[key].join('至');
          }
        });
        // 修改保存
        if (this.manageOperateField.id) {
          console.log(field);
          this.manageHttpOperate(this.safeSrv.updateManageInfo(field));
        }
        // 新增保存
        else {
          this.manageHttpOperate(this.safeSrv.addManageInfo(field));
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.manageHttpOperate(this.safeSrv.delManageInfo({id: item.id}));
        }
        break;
      // 文件导出操作
      case 'export':
        this.safeSrv.exportManageInfo().subscribe((res) => {
          window.open(res.data.path);
        });
        break;
      // 文件导入操作
      case 'import':
        this.manageImportField.append('file', item.files[0]);
        this.safeSrv.importManageInfo(this.manageImportField).subscribe((res) => {
          this.manageImportFieldModal = false;
          this.showUploadRecord(res.data);
          this.manageDataInit(this.manageNowPage, this.managePageOption.pageSize);
        });
        break;
    }
  }
  public  showUploadRecord(value): void {
    this.manageUploadRecordOption = {
      width: '900',
      dialog: true,
      title: '上传记录',
      totalNumber: value.totalNumber,
      realNumber: value.realNumber,
      uploadOption: {
        width: '100%',
        tableHeader: {
          data: [
            {field: 'code', header: '序号'},
            // {field: 'roomCode', header: '房间编号'},
            {field: 'result', header: '结果'},
            {field: 'reason', header: '备注'},
          ],
          style: { background: '#F4F4F4', color: '#000', height: '6vh'}
        },
        tableContent: {
          data: value.log,
          styleone: { color: '#000', height: '2vw', textAlign: 'center'},
          styletwo: { color: '#000', height: '2vw', textAlign: 'center'}
        }
      }
    };

  }
  // 分页操作
  public managePageEvent(page) {
    this.manageNowPage = page;
    this.manageDataInit(page, this.managePageOption.pageSize);
  }

  public idCardChange(e): void {
    const val = e.target.value.toString();
    if (val.length < 18 || val === '') {
      this.idCardIsValid = false;
    }
  }

  public change(e): void {
    console.log(this.manageOperateField.termOfValidity);
  }
}
