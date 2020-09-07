import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../common/services/global.service';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {GeneralInfoService} from '../../../common/services/general-info.service';
import {PageOption} from '../../../common/public/Api';

@Component({
  selector: 'app-gi-bulletin-board',
  templateUrl: './gi-bulletin-board.component.html',
  styleUrls: ['./gi-bulletin-board.component.scss']
})
export class GiBulletinBoardComponent implements OnInit {

  public searchData: string = '';
  public itemData = [];
  public detailData = {
    title: '',
    content: '',
    file: '',
    filePath: ''
  };
  public PageOption: PageOption = {
    pageSize: 10,
    totalRecord: ''
  };
  public showDetailDialog: boolean = false;
  public bulletionPageNo: number = 1;
  public isOperateState = 0;
  public selectedItems: Array<any> = [];
  constructor(
    private toolSrv: PublicMethodService,
    private builletinSrv: GeneralInfoService
  ) {}
  ngOnInit() {
   this.initBulletinData();
  }
  public  initBulletinData(): void {
    this.builletinSrv.getBulletinBoradPageData({pageNo: this.bulletionPageNo, pageSize: 10}).subscribe((res) => {
      console.log(res);
      res.data.contents.forEach(val => {
        this.itemData.push({
          num: val.id,
          title: val.title,
          time: val.idt,
          filePath: val.annex,
          content: val.content,
          file: val.annex.slice(val.annex.lastIndexOf('/') + 1),
          checked: null
        });
      });
      this.PageOption.totalRecord = res.data.totalRecord;
    });
  }
  // 搜索文件
  public  searchDataClick(): void {
  }
  // 打开文件
  public  detailClick(item): void {
    console.log(item);

    this.showDetailDialog = true;
    for (let key in this.detailData){
      this.detailData[key] = item[key];
    }
    // window.open(item.filePath);
  }
  public  downFile(e): void {
    window.open(e);
  }
  public  PageEvent(e): void {
    this.bulletionPageNo = e;
    this.initBulletinData();
  }

  public delete(): void {
    this.toolSrv.setConfirmation('删除', '删除', () => {
      const params = {
        data: []
      };
      this.selectedItems.forEach(item => {
        params.data.push({id: item.num});
      });
      this.builletinSrv.noticeDeleteByIds(params).subscribe(res => {
        this.toolSrv.setToast('success', '提示', '删除成功');
        this.initBulletinData();
      });
    });
  }

  public operate(state): void {
    this.isOperateState = state;
  }

  public selectAll(): void {
    this.selectedItems = [];
    this.selectedItems.push(...this.itemData);
    this.selectedItems.forEach(item => {item.checked = ['1']; });
    console.log(this.selectedItems);
  }
  public selectItem(state, item: any): void {
    console.log(state);
    const i = this.selectedItems.indexOf(item);
    if (state.checked) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(i, 1);
    }
    console.log(this.selectedItems);
  }

}
