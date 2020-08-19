import {Component, OnInit, ViewChild} from '@angular/core';
import {GeneralInfoService} from "../../services/general-info.service";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {Location} from "@angular/common";
import {PDFSource} from "pdfjs-dist";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-pdf-view',
  templateUrl: './pdf-view.component.html',
  styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit {
  public fileName = '';
  public fileUrl: string | PDFSource | ArrayBuffer;
  public display = true;
  public showHeader = true;
  public totalPage = 1;
  public curPage = 1;
  // @ts-ignore
  @ViewChild('fileView') fileView: any;
  constructor(
    private generalInfo: GeneralInfoService,
    private sanitizer: DomSanitizer,
    public location: Location,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
    this.parsePath();
    // 判断是手机端还是PC端
    if (navigator.platform !== 'Win32') {
      this.showHeader = false;
    }
    this.fileView.onProgress.emit({loaded: 1, total: 100});
  }

  public hide(e): void {
    window.history.back();
  }

  public parsePath(): void {
    // 从路径中获取token和参数 http://139.9.153.27/usr/work/wx/safeMaterial/安全文化_安全科技与科学安全生产观_徐德蜀.pdf
    const url = this.location.path();
    const pathParam = url.split('?'); // 分离路径和参数
    let accessToken = '';

    const params = {
      accessToken: '',
      // ....
    };
    if (pathParam.length > 1) {
      const ps = pathParam[1].toString().split('&');
      ps.forEach(value => {
        const keyValue = value.toString().split('=');
        params[keyValue[0]] = keyValue[1];
      });
    }
    accessToken = params.accessToken;
    delete params.accessToken;
    this.generalInfo.trainingFindByMaterialId(params, accessToken).subscribe(res => {
      console.log(res);
      this.fileName = res.data.resourceName;
      // 拿到资源路径后，请求资源
      this.httpClient.get(res.data.resourcePath + '', {responseType: 'blob'}).subscribe((data: any) => {
        console.log(data);
        const blob = new Blob([data], {type: 'application/pdf'});
        this.fileUrl = URL.createObjectURL(blob);
        console.log(blob);
      });
    });
  }

  public getProgress(e): void {
    this.curPage = e;
  }
  public afterLoadComplete(e): void {
    this.totalPage = e._pdfInfo.numPages;
  }

  pageRendered(e: CustomEvent) {
    console.log('(page-rendered)', e);
  }

}
