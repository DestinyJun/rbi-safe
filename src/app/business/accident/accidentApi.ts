/**
 * 安全生产事故记录
 */
export interface AccidentRecordField {
  id?: any;
  organizationId: any; // 组织id
  accidentPlace: string; // 事故地点
  accidentTypeId: any; // 事故类型id
  accidentAccount: any; // 事故数量
  educationAccount: any; // 召开警示教育会数
  changeStatus: any; // 整改落实情况（文本域）
  detail: any; // 详细描述（文本域）
  reasonAnalysis: any; // 原因分析（文本域）
  measure: any; // 采取措施（文本域）
}
export class AddAccidentRecordFieldClass implements AccidentRecordField{
  accidentAccount: any;
  accidentPlace: string;
  accidentTypeId: any;
  changeStatus: any;
  detail: any;
  educationAccount: any;
  measure: any;
  organizationId: any;
  reasonAnalysis: any;

}
export class UpdateAccidentRecordFieldClass implements AccidentRecordField {
  accidentAccount: any;
  accidentPlace: string;
  accidentTypeId: any;
  changeStatus: any;
  detail: any;
  educationAccount: any;
  id: any;
  measure: any;
  organizationId: any;
  reasonAnalysis: any;

  constructor() {
    this.organizationId = null;
    this.accidentAccount = null;
    this.accidentPlace = '';
    this.accidentTypeId = null;
    this.changeStatus = null;
    this.detail = null;
    this.educationAccount = null;
    this.id = null;
    this.measure = null;
    this.reasonAnalysis = null;
  }
}
