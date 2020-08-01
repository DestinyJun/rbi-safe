import {Component, OnInit} from '@angular/core';
import { PageOption, SpecialField, SpecialFieldClass, TableHeader} from '../../../../common/public/Api';
import {Observable} from 'rxjs';
import {SafetrainService} from '../../../../common/services/safetrain.service';
import {Es, objectCopy} from '../../../../common/public/contents';
import {debounceTime, distinctUntilChanged} from "rxjs/operators";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-archives-special',
  templateUrl: './archives-special.component.html',
  styleUrls: ['./archives-special.component.scss']
})
export class ArchivesSpecialComponent implements OnInit {
  public specialPageOption: PageOption = {
    pageSize: 8, // 默认显示多少条
    totalRecord: null // 总条数
  }; // 分页组件配置
  public specialTableHeader: TableHeader[] = [
    {field: 'name', header: '姓名'},
    {field: 'typeOfWork', header: '工种名称'},
    {field: 'gender', header: '性别'},
    {field: 'degreeOfEducation', header: '文化程度'},
    {field: 'yearsOfWork', header: '工种年限'},
  ]; // 表头字段
  public specialUploadRecordOption: any;
  public specialTableData: any[]; // 表体数据
  public specialNowPage: number = 1; // 当前页
  public specialOperateFlag: any ; // 操作标识
  public specialOperateField: SpecialField = new SpecialFieldClass(); // 操作字段
  public specialOperateModal: boolean = false; // 模态框
  public specialImportField: FormData = new FormData(); // 导入
  public specialImportFieldModal: boolean = false; // 导入模态框
  public specialEs: any = Es; // 时间选择面板本地化
  public idCard = new FormControl(''); // 监听身份证输入框,检验是否合法
  public idCardIsValid = true; // 身份证是否有效
  constructor(
    private safeSrv: SafetrainService,
  ) {
  }

  ngOnInit() {
    this.specialDataInit(this.specialNowPage, this.specialPageOption.pageSize);
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
        console.log(234);
      }
    });
  }

  // 数据初始化
  private specialDataInit(pageNo, pageSize) {
    this.safeSrv.getArchivesList({pageNo, pageSize}).subscribe((res) => {
      this.specialTableData = res.data.contents;
      this.specialPageOption.totalRecord = res.data.totalRecord;
      this.specialOperateFlag = 'add';
    });
  }

  // 角色操作代理请求函数
  private specialHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.specialOperateModal = false;
      this.specialDataInit(this.specialNowPage, this.specialPageOption.pageSize);
    });
  }

  // 特殊台账操作操作
  public specialOperate(flag: string, item?: any) {
    switch (flag) {
      // 添加操作初始化
      case 'add':
        this.specialOperateModal = true;
        this.specialOperateField = Object.assign({}, new SpecialFieldClass());
        break;
      // 编辑操作初始化
      case 'update':
        this.specialOperateModal = true;
        this.specialOperateField = objectCopy(Object.assign({}, this.specialOperateField), item);
        break;
      // 保存操作
      case 'save':
        // 修改保存
        if (this.specialOperateField.id) {
          this.specialHttpOperate(this.safeSrv.updateArchivesInfo(this.specialOperateField));
        }
        // 新增保存
        else {
          this.specialHttpOperate(this.safeSrv.addArchivesInfo(this.specialOperateField));
      }
        break;
      // 删除操作
      case 'del':
        console.log('暂时不做');
        break;
      // 文件导出操作
      case 'export':
        this.safeSrv.exportArchivesInfo().subscribe((res) => {
          window.open(res.data.path);
        });
        break;
      // 文件导入操作
      case 'import':
        this.specialImportField.append('multipartFiles', item.files[0]);
        this.safeSrv.importArchivesInfo(this.specialImportField).subscribe((res) => {
          this.specialImportFieldModal = false;
          this.showUploadRecord(res.data);
          this.specialDataInit(this.specialNowPage, this.specialPageOption.pageSize);
        });
        break;
    }
  }
    public  showUploadRecord(value): void {
        this.specialUploadRecordOption = {
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
                        {field: 'roomCode', header: '房间编号'},
                        {field: 'result', header: '结果'},
                        {field: 'remarks', header: '备注'},
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
  public specialPageEvent(page) {
    this.specialNowPage = page;
    this.specialDataInit(page, this.specialPageOption.pageSize);
  }

  public idCardChange(e): void {
    const val = e.target.value.toString();
    if (val.length < 18 || val === '') {
      this.idCardIsValid = false;
    }
  }
}
