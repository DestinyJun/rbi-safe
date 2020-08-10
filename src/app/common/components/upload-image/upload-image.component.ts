import {
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, QueryList,
  SimpleChanges
} from '@angular/core';
import {DialogService} from 'primeng/api';

interface ImageOption {
  files: any[];
  showUploadIcon: boolean;
  imgUrls: any[];
  type: string;
}

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})

export class UploadImageComponent implements OnInit, OnChanges {

  @Output()
  public selectFile = new EventEmitter<any>(); // 选择图片后发射的数据
  @Input()
  public ImageOption: ImageOption = {
    files: [],
    imgUrls: [],
    showUploadIcon: true,
    type: ''
  };
  public filePath = [];
  public showImageDiaog: boolean;
  public ImgUrl: any;

  constructor() {
  }

  ngOnInit() {
  }

  public selectImage(e): void {
    console.log(1);
    for (let j = 0; j < e.target.files.length; j++) {
      this.ImageOption.files.push(e.target.files[j]);
    }
    for (let i = 0; i < e.target.files.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[i]);
      reader.onload = (re) => {
        this.filePath.push(re.target['result']);
      };
    }
    const files: any = document.getElementById('files');
    console.log(files);
    this.selectFile.emit({value: this.ImageOption, type: 'add'});
  }

  // 重置函数
  public clearImage(): void {
    this.ImageOption.files = this.filePath = this.ImageOption.imgUrls = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filePath = this.ImageOption.imgUrls;
  }

  public imgClick(e): void {
    this.showImageDiaog = true;
    this.ImgUrl = e;
  }

  public delItemImg(url, i): void {
    if (url.startsWith('http://139.9.153.27/')) {
      this.filePath.splice(i, 1);
      // this.ImageOption.imgUrls.splice(i, 1);
    } else {
      this.filePath.splice(i, 1);
      this.ImageOption.files.splice(i, 1);
    }
    const files: any = document.getElementById('files');
    files.value = '';
    console.log(files);
    this.selectFile.emit({value: this.ImageOption, type: 'del'});
  }

  private arrDel(arr, index): boolean {
    if (isNaN(index) || index >= arr.length) {
      return false;
    }
    for (let i = 0, n = 0; i < arr.length; i++) {
      if (this[i] !== this[index]) {
        this[n++] = this[i];
      }
    }
    arr.length -= 1;
    return true;
  }
}

