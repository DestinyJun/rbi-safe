import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../common/services/global.service';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-sr-institution',
  templateUrl: './sr-institution.component.html',
  styleUrls: ['./sr-institution.component.scss']
})
export class SrInstitutionComponent implements OnInit {
  public openDialog = false;
  public searchData: string = '';
  public itemData = [];
  public fileName = '';
  public fileUrl: SafeResourceUrl;
  constructor(
    private globalSrv: GlobalService,
    private toolSrv: PublicMethodService,
    private sanitizer: DomSanitizer
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
    this.fileName = item.fileName;
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.filePath);
    this.openDialog = true;
    // window.open(item.filePath);
  }


}
