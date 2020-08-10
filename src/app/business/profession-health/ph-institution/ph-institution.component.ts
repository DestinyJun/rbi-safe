import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../../../common/services/global.service';
import {PublicMethodService} from '../../../common/public/public-method.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-ph-institution',
  templateUrl: './ph-institution.component.html',
  styleUrls: ['./ph-institution.component.scss']
})
export class PhInstitutionComponent implements OnInit {

  public searchData: string = '';
  public itemData = [];
  public openDialog = false;
  public fileName = '';
  public fileUrl: SafeResourceUrl;
  constructor(
    private globalSrv: GlobalService,
    private toolSrv: PublicMethodService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit() {
    this.globalSrv.getEducationList({systemCategoryId: 5}).subscribe((res) => {
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
    this.fileName = item.label;
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.filePath);
    this.openDialog = true;
    // window.open(item.filePath);
  }

}
