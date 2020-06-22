import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../common/services/global.service';
import {PublicMethodService} from '../../../common/public/public-method.service';

@Component({
  selector: 'app-sr-institution',
  templateUrl: './sr-institution.component.html',
  styleUrls: ['./sr-institution.component.scss']
})
export class SrInstitutionComponent implements OnInit {

  public searchData: string = '';
  public itemData = [];
  public url = 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf';
  constructor(
    private globalSrv: GlobalService,
    private toolSrv: PublicMethodService,
  ) {}
  ngOnInit() {
    this.globalSrv.getEducationList({systemCategoryId: 2}).subscribe((res) => {
      console.log(res);
      res.data.forEach(val => {
        this.itemData.push({num: val.id, label: val.fileName, time: val.idt, filePath: val.filePath});
      });
    });
  }
  // 搜索文件
  public  searchDataClick(): void {
    // if (this.)
    // this.toolSrv.setToast('error', )
    // console.log(this);
  }
  // 打开文件
  public  openFile(item): void {
    // this.url = item.filePath;
    console.log(item);
    // window.open(`http://view.officeapps.live.com/op/view.aspx?src=http://${item.filePath}`);
    window.open(item.filePath);
  }


}
