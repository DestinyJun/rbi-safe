import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FileOption} from '../dialog.model';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-file-pop',
  templateUrl: './file-pop.component.html',
  styleUrls: ['./file-pop.component.scss']
})
export class FilePopComponent implements OnInit, OnChanges {

  @Input()
  public UploadFileOption: FileOption = new FileOption();
  @Output()
  public event =  new EventEmitter<any>();
  public photoFiles: any[] = [];
  public regularExcelTemplate: string = ''; // 导入模板地址
  constructor(
    private globalSrv: GlobalService
  ) { }

  ngOnInit() {
    // 模板下载初始化
    this.globalSrv.publicGetExcelTemplate().subscribe((res) => {
      this.regularExcelTemplate = res.data[16].path;
    });
    this.UploadFileOption.files = [];
  }

  // 题库模板下载
  public regularDownloadClick() {
    window.open(this.regularExcelTemplate);
  }

  public  UploadSureClick(): void {
    const fileData = new FormData();
    this.UploadFileOption.files.forEach(v => {
      fileData.append('file', v);
    });
    this.event.emit(fileData);
  }

  public  selectFile(e): void {
    for (let i = 0; i < e.files.length; i++) {
      this.UploadFileOption.files.push(e.files[i]);
    }
  }
  public  removeClick(e): void {
    this.UploadFileOption.files.forEach((val, index) => {
      if (val.name === e.file.name) {
        this.UploadFileOption.files.splice(index, 1);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.UploadFileOption);
  }
}
