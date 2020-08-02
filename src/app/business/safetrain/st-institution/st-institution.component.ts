import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../common/services/global.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-st-institution',
  templateUrl: './st-institution.component.html',
  styleUrls: ['./st-institution.component.scss']
})
export class StInstitutionComponent implements OnInit {
  public itemData: Array<object> = [];
  public openDialog = false;
  public searchData: string = '';
  public fileName = '';
  public fileUrl: SafeResourceUrl;
  public url: SafeResourceUrl;

  constructor(
    private globalSrv: GlobalService,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit() {
    this.globalSrv.getEducationList({systemCategoryId: 1}).subscribe((res) => {
      res.data.forEach(v => {
        this.itemData.push({num: v.id, label: v.fileName, time: v.idt, filePath: v.filePath});
      });
    });
  }

  // 打开文件
  public openFile(item): void {
    this.fileName = item.label;
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.filePath);
    this.url = item.filePath;
    this.openDialog = true;
  }

  // 搜索文件
  public searchDataClick(): void {
    // if (this.)
    // this.toolSrv.setToast('error', )
    // console.log(this);
  }
}
