/**
 * 制度管理
 */
export interface InstitutionManageField {
  id?: any;
  name: string; // 	制度名称
  type: any; // 类型id
}
export class AddInstitutionManageFieldClass implements InstitutionManageField{
  name: string;
  type: any;
}
export interface InstitutionManageUpdateField {
  systemId: any; // 分页查询的id
  name: string; // 	制度名称
  updateExplain: string; // 	修改说明
  type: any; // 类型id
  organizationId: any; // 分页查询的组织id
}
export class UpdateInstitutionManageFieldClass implements InstitutionManageUpdateField {
  systemId: any; // 分页查询的id
  name: string; // 制度名称
  updateExplain: string; // 修改说明
  type: any; // 制度类型id
  organizationId: any; // 组织id
  constructor() {
    this.systemId = null;
    this.name = '';
    this.updateExplain = '';
    this.type = null;
    this.organizationId = null;
  }
}
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
