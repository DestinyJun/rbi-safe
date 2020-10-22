import { Component, OnInit } from '@angular/core';
import {IntentService} from '../../../../common/services/intent.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent implements OnInit {
  public frameOperateFlag: any ; // 操作标识
  public frameImgPath: any = '' ; // 操作标识

  constructor(
    private intentSrv: IntentService,
  ) { }

  ngOnInit() {
    this.frameDataInit();
  }
  // 数据初始化
  private frameDataInit() {
    this.intentSrv.intentAgencyImgLook().subscribe((res) => {
      this.frameImgPath = res.data;
    });
  }

  // 代理请求函数
  private frameHttpOperate(test: Observable<any>) {
    test.subscribe(() => {
      // 操作成功后重新初始化数据列表
      this.frameDataInit();
    });
  }

  // 基础操作
  public frameOperate(flag: string, item?: any) {
    switch (flag) {
      // 树操作
      case 'upload':
        if ( window.confirm('确定上传么？')) {
          const field = new FormData();
          if (item.length > 0) {
            item.forEach(res => {
              field.append('file', res);
            });
          }
          this.frameHttpOperate(this.intentSrv.intentAgencyImgUpload(field));
        }
        break;
    }
  }
}
