import { Component, OnInit } from '@angular/core';
import {AddEducateFieldClass, EducateField, PageOption, TableHeader, UpdateEducateFieldClass} from '../../common/public/Api';
import {Es} from '../../common/public/contents';
import {FormControl} from '@angular/forms';
import {SafetrainService} from '../../common/services/safetrain.service';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss']
})
export class EquipmentComponent implements OnInit {
  public educatePageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public educateTableHeader: TableHeader[] = [
    {field: 'name', header: '姓名'},
    {field: 'idCardNo', header: '身份证'},
    {field: 'gender', header: '性别'},
    {field: 'organizationName', header: '单位组织'},
    {field: 'idt', header: '添加时间'},
  ]; // 表头字段
  public educateUploadRecordOption: any;
  public educateTableData: any[]; // 表体数据
  public educateNowPage: number = 1; // 当前页
  public educateOperateFlag: any ; // 操作标识
  public educateOperateField: EducateField = new AddEducateFieldClass(); // 操作字段
  public educateOperateModal: boolean = false; // 模态框
  public educateImportField: FormData = new FormData(); // 导入
  public educateImportFieldModal: boolean = false; // 导入模态框
  public educateEs: any = Es; // 时间选择面板本地化
  public idCard = new FormControl(''); // 监听身份证输入框,检验是否合法
  public idCardIsValid = true; // 身份证是否有效
  constructor(
    private safeSrv: SafetrainService,
  ) { }

  ngOnInit() {
    this.educateDataInit(this.educateNowPage, this.educatePageOption.pageSize);
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
  private educateDataInit(pageNo, pageSize) {
    this.safeSrv.getEducateList({pageNo, pageSize}).subscribe((res) => {
      this.educateTableData = res.data.contents;
      this.educatePageOption.totalRecord = res.data.totalRecord;
      this.educateOperateFlag = 'add';
    });
  }

  // 角色操作代理请求函数
  private educateHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.educateOperateModal = false;
      this.educateDataInit(this.educateNowPage, this.educatePageOption.pageSize);
    });
  }

  // 特殊台账操作操作
  public educateOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.educateOperateModal = true;
        this.educateOperateField = Object.assign({}, new AddEducateFieldClass());
        break;
      // 编辑操作初始化
      case 'update':
        this.educateOperateModal = true;
        this.educateOperateField = Object.assign({}, new UpdateEducateFieldClass(), item);
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.educateOperateField.id) {
          this.educateHttpOperate(this.safeSrv.updateEducateInfo(this.educateOperateField));
        }
        // 新增保存
        else {
          this.educateHttpOperate(this.safeSrv.addEducateInfo(this.educateOperateField));
        }
        break;
      // 删除操作
      case 'del':
        if (window.confirm('您确定需要删除吗？')) {
          this.educateHttpOperate(this.safeSrv.delEducateInfo({data: [{id: item.id}]}));
        }
        break;
      // 文件导出操作
      case 'export':
        this.safeSrv.exportEducateInfo().subscribe((res) => {
          window.open(res.data.path);
        });
        break;
      // 文件导入操作
      case 'import':
        this.educateImportField.append('file', item.files[0]);
        this.safeSrv.importEducateInfo(this.educateImportField).subscribe((res) => {
          console.log(res);
          this.educateImportFieldModal = false;
          this.showUploadRecord(res.data);
          this.educateDataInit(this.educateNowPage, this.educatePageOption.pageSize);
        });
        break;
    }
  }
  public  showUploadRecord(value): void {
    this.educateUploadRecordOption = {
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
  public educatePageEvent(page) {
    this.educateNowPage = page;
    this.educateDataInit(page, this.educatePageOption.pageSize);
  }

  public idCardChange(e): void {
    const val = e.target.value.toString();
    if (val.length < 18 || val === '') {
      this.idCardIsValid = false;
    }
  }

}
