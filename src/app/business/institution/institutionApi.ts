/**
 * 制度管理
 */
/*制度管理添加*/
export interface InstitutionManageField {
  id?: any;
  name: string; // 	制度名称
  type: any; // 类型id
}
export class AddInstitutionManageFieldClass implements InstitutionManageField{
  name: string;
  type: any;
  constructor() {
    this.name = '';
    this.type = null;
  }
}

/*制度管理修改*/
export interface InstitutionManageUpdateField {
  systemId: any; // 分页查询的id
  name: string; // 	制度名称
  updateExplain: string; // 	修改说明
  updateExplainPath: string; // 	修改附件地址
  evaluateOpinion: string; // 	评估意见
  evaluateOpinionPath: string; // 	评估附件地址
  type: any; // 类型id
  organizationId: any; // 分页查询的组织id
}
export class UpdateInstitutionManageFieldClass implements InstitutionManageUpdateField {
  systemId: any;
  name: string;
  updateExplain: string;
  updateExplainPath: string;
  evaluateOpinion: string;
  evaluateOpinionPath: string;
  type: any;
  organizationId: any;
  constructor() {
    this.systemId = null;
    this.name = '';
    this.updateExplain = '';
    this.updateExplainPath = '';
    this.evaluateOpinion = '';
    this.evaluateOpinionPath = '';
    this.type = null;
    this.organizationId = null;
  }
}

/*制度管理评估*/
export interface InstitutionManageAssessField {
  systemId: any; // 分页查询的id
  name: string; // 	制度名称
  type: any; // 类型id
  organizationId: any; // 分页查询的组织id
  suit: string; // 	适宜性
  effective: string; // 有效性
  execute: string; // 执行性
  evaluateOpinion: string; // 评估意见
}
export class InstitutionManageAssessFieldClass implements InstitutionManageAssessField {
  effective: string;
  evaluateOpinion: string;
  execute: string;
  name: string;
  organizationId: any;
  suit: string;
  systemId: any;
  type: any;
  constructor() {
    this.systemId = null;
    this.name = '';
    this.effective = '';
    this.suit = '';
    this.evaluateOpinion = '';
    this.execute = '';
    this.type = null;
    this.organizationId = null;
  }
}

/**
 * 评估历史记录
 */
export interface InstitutionRecordUpdateField {
  updateExplain: string; // 	修改说明
  updateExplainPath: string; // 	修改附件地址
  evaluateOpinion: string; // 	评估意见
  evaluateOpinionPath: string; // 	评估附件地址
  status: string; // 	评估附件地址
}
export class UpdateInstitutionRecordFieldClass implements InstitutionRecordUpdateField {
  updateExplain: string;
  updateExplainPath: string;
  evaluateOpinion: string;
  evaluateOpinionPath: string;
  status: string;
  constructor() {
    this.updateExplain = '';
    this.updateExplainPath = '';
    this.evaluateOpinion = '';
    this.evaluateOpinionPath = '';
    this.status = '';
  }
}
