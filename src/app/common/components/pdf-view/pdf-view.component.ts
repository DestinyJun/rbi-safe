import {Component, OnInit} from '@angular/core';
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
  public src = 'http://139.9.153.27/usr/work/wx/safeMaterial/安全文化_安全科技与科学安全生产观_徐德蜀.pdf';

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
    alert(navigator.platform);
    if (navigator.platform !== 'Win32') {
      this.showHeader = false;
    }
    console.log(navigator);
  }

  public hide(e): void {
    window.history.back();
  }

  loadPdf() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://139.9.153.27/usr/work/wx/safeMaterial/安全文化_安全科技与科学安全生产观_徐德蜀.pdf', true);
    xhr.responseType = 'blob';

    xhr.onload = (e: any) => {
      console.log(xhr);
      if (xhr.status === 200) {
        console.log(xhr);
        const blob = new Blob([xhr.response], {type: 'application/pdf'});
        this.fileUrl = URL.createObjectURL(blob);
      }
    };

    xhr.send();
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


}
