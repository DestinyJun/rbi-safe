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
  public frameImgNumber: any = null ; // 	单位专职安全生产管理人员
  public frameImgName: any = null ; // 	单位专职安全生产管理人员
  public frameDropdownPlaceholder: any = '下拉切换组织'; //  状态下拉label
  public frameDropdownOptions: any = [
    {value: 87, label: ' 矿业公司'},
    {value: 94, label: ' 坛罐窑铝'},
    {value: 99, label: ' 小长冲河铝矿'},
    {value: 98, label: ' 猫场铝矿'},
    {value: 97, label: ' 麦坝铝矿'},
  ]; // 状态下拉配置项
  public frameDropdownSelected: any; // 状态下拉选择

  constructor(
    private intentSrv: IntentService,
  ) { }

  ngOnInit() {
    this.frameDataInit();
  }
  // 数据初始化
  private frameDataInit() {
    this.intentSrv.intentAgencyImgLook({}).subscribe((res) => {
      this.frameImgPath = res.data.organizationPicture;
      this.frameDropdownSelected = res.data.organizationId;
      this.frameImgNumber = res.data.number;
      this.frameImgName = res.data.name;
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
          field.append('number', this.frameImgNumber);
          this.frameHttpOperate(this.intentSrv.intentAgencyImgUpload(field));
        }
        break;
      // 树操作
      case 'change':
        this.intentSrv.intentAgencyImgLook({organizationId: item.value}).subscribe((res) => {
          this.frameImgPath = res.data.organizationPicture;
          this.frameDropdownSelected = res.data.organizationId;
          this.frameImgNumber = res.data.number;
          this.frameImgName = res.data.name;
        });
        break;
    }
  }
}
