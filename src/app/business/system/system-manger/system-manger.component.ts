import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ThemeService} from '../../../common/public/theme.service';
import {SystemService} from '../../../common/services/system.service';
import {PageOption} from '../../../common/public/Api';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {Router} from "@angular/router";
import {LocalStorageService} from "../../../common/services/local-storage.service";

@Component({
  selector: 'app-system-manger',
  templateUrl: './system-manger.component.html',
  styleUrls: ['./system-manger.component.scss']
})
export class SystemMangerComponent implements OnInit {

  public optionTable: any;
  public roleSelect: any;
  public table = {
    tableheader: {background: '#F5F6FA', color: '#C3C3C5'},
    tableContent: [
      {background: '#FFFFFF', color: '#9899A0'}],
    detailBtn: [ '#3B86FF', '#FF8A9A']
  };
  public systemContent = [];
  public pageNo = 1;
  public themeSub: Subscription;
  // 添加相关
  public showAddSystemDialog: boolean;
  public addSystem: FormGroup;
  public fileType = [];
  public files = [];
  constructor(
    private themeSrv: ThemeService,
    private systemSrv: SystemService,
    private toolSrv: PublicMethodService,
    private fb: FormBuilder,
    private router: Router,
    private localStorageSrv: LocalStorageService,
  ) {
    this.themeSub =  this.themeSrv.changeEmitted$.subscribe(
      value => {
        this.table.tableheader = value.table.header;
        this.table.tableContent = value.table.content;
        this.table.detailBtn = value.table.detailBtn;
        this.setTableOption(this.systemContent);
      }
    );
  }
  public pageOption: PageOption;

  ngOnInit() {
      this.initSystemData();
      this.addSystem = this.fb.group({
        systemCategoryId: new FormControl('', Validators.required),
        multipartFiles: new FormControl([], Validators.required),
      });
      this.getFileTypeList();
  }

  public  initSystemData(): void {
     this.systemSrv.getSystemPageData({pageNo: this.pageNo, pageSize: 10}).subscribe( val => {
       console.log(val);
       this.systemContent = val.data.contents;
       this.setTableOption(this.systemContent);
       this.pageOption = {pageSize: val.data.pageSize, totalRecord: val.data.totalRecord};
     });
  }
  public  selectData(e): void {
    this.roleSelect = e;
  }
  public  DetailClick(e): void {
    if (e.label === '删除'){
      // this.toolSrv.setToast('error', '操作错误', '此功能待开发');
      this.toolSrv.setConfirmation('删除', '删除这项文件', () => {
        this.delSystemFiles(e.data.id);
      });
    }else {
      console.log(e);
      // window.open(e.data.filePath);
      this.router.navigate(['/pdf-view']);
    }
  }
  // set table data （设置列表数据）
  public  setTableOption(data1): void {
    this.optionTable = {
      width: '100%',
      header: {
        data:  [
          {field: 'id', header: '文件编号'},
          {field: 'fileName', header: '文件名称'},
          // {field: 'filePath', header: '文件下载路径'},
          {field: 'categoryName', header: '文件类型名称'},
          {field: 'operating', header: '操作'}
        ],
        style: {background: this.table.tableheader.background, color: this.table.tableheader.color, height: '6vh'}
      },
      Content: {
        data: data1,
        styleone: {background: this.table.tableContent[0].background, color: this.table.tableContent[0].color, textAlign: 'center', height: '3vw'},
      },
      type: 2,
      tableList:  [{label: '下载', color: this.table.detailBtn[0]}, {label: '删除', color: this.table.detailBtn[1]}]
    };
  }
  // search Data (搜索事件)
  public  searchDataClick(): void {
    console.log(123);
  }
  // Paging event (分页事件)
  public  clickEvent(e): void {
    this.pageNo = e;
    this.initSystemData();
  }
  // 重置数据
  public  resetAllData(): void {
      this.addSystem.reset();
  }

  public  addSystemInfoClick(): void {
      if (this.addSystem.valid){
        this.toolSrv.setConfirmation('上传', '上传这些文件', () => {
          const data = new FormData();
          data.append('systemCategoryId', this.addSystem.value.systemCategoryId);
          this.addSystem.value.multipartFiles.forEach(val => {
            data.append('multipartFiles', val);
          });
          this.systemSrv.uploadSystemFile(data).subscribe(val => {
            this.showAddSystemDialog = false;
            this.resetAllData();
            this.initSystemData();
            this.files = [];
          });
        });
      }else {
        this.toolSrv.setToast('error', '操作错误', '数据为填写完整');
      }
  }

 // 获取文件类型
 public getFileTypeList(): void {
     this.systemSrv.getSystemFileTypeList({}).subscribe(val => {
       if (val.status === '1000'){
         this.fileType = val.data.map(v => {
            return {label: v.categoryName, value: v.id};
         });
       }
     });
 }
 // 选择文件
 public  selectFile(e): void {
   const list = [];
   for (let i = 0; i < e.files.length; i++) {
     list.push(e.files[i]);
   }
   this.addSystem.patchValue({multipartFiles: list});
 }

 // 删除文件
  public  delSystemFiles(data): void {
      this.systemSrv.delSystemFile({id: data}).subscribe(val => {
        this.initSystemData();
      });
  }

}
