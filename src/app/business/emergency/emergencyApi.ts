/**
 * 应急管理
 */
export interface EmergencyOrgPersonField {
  id?: any;
  nameOfPersonnel: string; // 	人员名称
  jobTitle: string; // 	岗位职务
  emergencyDuty: string; // 	应急职务
  telephone: number; // 	手机
  remarks: string; // 	备注
}
export class AddEmergencyOrgPersonFieldClass implements EmergencyOrgPersonField{
  nameOfPersonnel: string; // 	人员名称
  jobTitle: string; // 	岗位职务
  emergencyDuty: string; // 	应急职务
  telephone: number; // 	手机
  remarks: string; // 	备注
  constructor() {
    this.nameOfPersonnel = '';
    this.jobTitle = '';
    this.emergencyDuty = '';
    this.telephone = null;
    this.remarks = null;
  }
}

/**
 * 应急管理机构
 */
export interface EmergencyOrgAgencyField {
  id?: any;
  organizationName: string; // 	组织名称
  leadingCadre: string; // 	负责人
  mobilePhone: number; // 	手机
  remarks: string; // 	备注
  mineEmergencyOrganizationPersonnels: EmergencyOrgPersonField[]; // 机构人员
}
export class AddEmergencyOrgAgencyFieldClass implements EmergencyOrgAgencyField{
  leadingCadre: string;
  mineEmergencyOrganizationPersonnels: EmergencyOrgPersonField[];
  mobilePhone: number;
  organizationName: string;
  remarks: string;

}
export class UpdateEmergencyOrgAgencyFieldClass implements EmergencyOrgAgencyField {
  id: any;
  leadingCadre: string;
  mineEmergencyOrganizationPersonnels: EmergencyOrgPersonField[];
  mobilePhone: number;
  organizationName: string;
  remarks: string;

  constructor() {
    this.id = null;
    this.leadingCadre = '';
    this.mineEmergencyOrganizationPersonnels = [];
    this.mobilePhone = null;
    this.organizationName = '';
    this.remarks = '';
  }
}

/**
 * 应急救援队伍
 */
export interface EmergencyOrgTeamField {
  id?: any;
  teamName: string; // 	队伍名称
  affiliatedUnit: string; // 	所属单位
  natureOfTheTeam: string; // 	队伍性质
  captain: string; // 	队长
  mobilePhone: number; // 	手机
  numberOfPeople: number; // 	人数
  mineEmergencyTeamMembers: EmergencyOrgPersonField[]; // 队伍人员
}
export class AddEmergencyOrgTeamFieldClass implements EmergencyOrgTeamField{
  affiliatedUnit: string;
  captain: string;
  mineEmergencyTeamMembers: EmergencyOrgPersonField[];
  mobilePhone: number;
  natureOfTheTeam: string;
  numberOfPeople: number;
  teamName: string;

}
export class UpdateEmergencyOrgTeamFieldClass implements EmergencyOrgTeamField {
  affiliatedUnit: string;
  captain: string;
  id: any;
  mineEmergencyTeamMembers: EmergencyOrgPersonField[];
  mobilePhone: number;
  natureOfTheTeam: string;
  numberOfPeople: number;
  teamName: string;

  constructor() {
    this.id = null;
    this.affiliatedUnit = '';
    this.mineEmergencyTeamMembers = [];
    this.mobilePhone = null;
    this.numberOfPeople = null;
    this.captain = '';
    this.natureOfTheTeam = '';
    this.teamName = '';
  }
}

/**
 * 外部应急组织
 */
export interface EmergencyOrgExternalField {
  id?: any;
  organizationName: string; // 	外部应急组织名称
  ontactNumber: number; // 	联系电话
  remarks: string; // 	备注
}
export class AddEmergencyOrgExternalFieldClass implements EmergencyOrgExternalField{
  ontactNumber: number;
  organizationName: string;
  remarks: string;
}
export class UpdateEmergencyOrgExternalFieldClass implements EmergencyOrgExternalField {
  id: any;
  ontactNumber: number;
  organizationName: string;
  remarks: string;

  constructor() {
    this.id = null;
    this.organizationName = '';
    this.ontactNumber = null;
    this.remarks = '';
  }
}

/**
 * 应急预案
 */
export interface EmergencyPlanField {
  id?: any;
  emergencyPlanName: string; // 	应急预案名称
  reservePlanType: string; // 	预案类别
  preparationUnit: string; // 	编制单位名称
  preparationUnitId: any; // 	编制单位ID
  controlOrganization: string; // 	主控单位名称
  controlOrganizationId: any; // 	主控单位id
  filingOrganization: string; // 	备案单位
}
export class AddEmergencyPlanFieldClass implements EmergencyPlanField{
  controlOrganization: string;
  controlOrganizationId: any;
  emergencyPlanName: string;
  filingOrganization: string;
  preparationUnit: string;
  preparationUnitId: any;
  reservePlanType: string;

}
export class UpdateEmergencyPlanFieldClass implements EmergencyPlanField {
  controlOrganization: string;
  controlOrganizationId: any;
  emergencyPlanName: string;
  filingOrganization: string;
  id: any;
  preparationUnit: string;
  preparationUnitId: any;
  reservePlanType: string;

  constructor() {
    this.id = null;
    this.controlOrganization = '';
    this.controlOrganizationId = null;
    this.emergencyPlanName = '';
    this.filingOrganization = '';
    this.preparationUnit = '';
    this.preparationUnitId = null;
    this.reservePlanType = null;
  }
}

/**
 * 应急预案处理
 */
export interface EmergencyPlanHandleField {
  id?: any;
  emergencyPlanName: string; // 	应急预案名称
  reservePlanType: string; // 	预案类别
  reviewStatus: string; // 	评审状态（0：未通过 1：通过）
  reviewTime: string; // 	评审时间
  reviewOrganization: string; // 	评审组织
}
export class UpdateEmergencyPlanHandleFieldClass implements EmergencyPlanHandleField {
  emergencyPlanName: string;
  id: any;
  reservePlanType: string;
  reviewOrganization: string;
  reviewStatus: string;
  reviewTime: string;

  constructor() {
    this.id = null;
    this.emergencyPlanName = '';
    this.reservePlanType = null;
    this.reviewOrganization = '';
    this.reviewStatus = '';
    this.reviewTime = '';
  }
}


