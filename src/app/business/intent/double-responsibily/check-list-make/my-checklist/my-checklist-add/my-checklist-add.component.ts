import {Component, OnInit} from '@angular/core';
import {ChecklistMakeService} from '../../../../../../common/services/checklist-make.service';
import {PublicMethodService} from '../../../../../../common/public/public-method.service';

@Component({
  selector: 'app-my-checklist-add',
  templateUrl: './my-checklist-add.component.html',
  styleUrls: ['./my-checklist-add.component.scss']
})
export class MyChecklistAddComponent implements OnInit {
  public formOption = {
    templateId: 0,
    templateName: '',
    position: '',
    organizationId: 0,
    organizationName: '',
    companyName: '',
    factoryName: '',
    workshopName: '',
    className: '',
    content: []
  };

  constructor(
    private checkListSrv: ChecklistMakeService,
    private toolSrv: PublicMethodService,
  ) {
  }

  ngOnInit() {
    this.checkListSrv.dbEvaluationFindTemplate().subscribe(res => {
      this.getSameAttribValue(this.formOption, res.data);
      this.formOption.templateName = res.data.name;
      res.data.doubleDutyTemplateContents.forEach(value => {
        this.formOption.templateId = value.templateId;
        this.formOption.content.push({
          content: value.content,
          fraction: value.fraction,
          selfEvaluation: '符合',
          selfFraction: value.fraction
        });
      });
    });
  }

  public save(): void {

    // 先检验数据的合法性
    let valid = true;
    this.formOption.content.forEach(content => {
      if (content.selfFraction > content.fraction) {
        valid = false;
      }
    });
    if (!valid) {
      this.toolSrv.setToast('error', '提示', '自评得分不能大于总分');
      return;
    }
    if (this.validObject(this.formOption.content)) {
      this.checkListSrv.dbEvaluationWrite(this.formOption).subscribe(res => {
        console.log(res);
        this.toolSrv.setToast('success', '提示', '提交成功');
        this.close();
      });
    } else {
      this.toolSrv.setToast('error', '提示', '数据不能为空');
    }


    // this.formOption = {
    //   templateId: 0,
    //   templateName: '',
    //   position: '',
    //   organizationId: 0,
    //   organizationName: '',
    //   companyName: '',
    //   factoryName: '',
    //   workshopName: '',
    //   className: '',
    //   content: []
    // };
  }

  public close(): void {
    window.history.back();
  }

  // originObj从targetObj中获取自己已有属性且值为null或''的对应属性的值
  private getSameAttribValue(originObj, targetObj): void {
    for (const targetObjKey in targetObj) {
      const type = Object.prototype.toString.call(targetObj[targetObjKey]).slice(8, -1);
      if (targetObj[targetObjKey] && (originObj[targetObjKey] || originObj[targetObjKey] === '')) {
        if (type === 'Object' || type === 'Array') {
          this.getSameAttribValue(originObj[targetObjKey], targetObj[targetObjKey]);
        } else {
          if (targetObj[targetObjKey] !== '') {
            originObj[targetObjKey] = targetObj[targetObjKey];
          }
        }
      } else {
        if (type === 'Number') {
          originObj[targetObjKey] = targetObj[targetObjKey];
        }
      }
    }
  }


  // 递归判断对象是否有空值
  private validObject(obj: any): boolean {
    let ret = true; // 默认对象有效
    // 拿到数据类型
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    if (type === 'Object' || type === 'Array') {
      if (type === 'Object' && Object.keys(obj).length === 0) { // 判断是否为{}
        return false;
      }
      if (type === 'Array' && obj.length === 0) { // 判断是否为[]
        return false;
      }
      for (const objKey in obj) {
        if (objKey !== 'safeTestQuestionsList') {
          ret = ret && this.validObject(obj[objKey]);
        }
      }
    } else {
      if (!obj || obj === '') {
        ret = false;
      }
    }
    return ret;
  }

}
