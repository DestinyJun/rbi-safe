/**
 * 安全生产管理机构设置管理
 */
export interface IntentAgencyField {
  id?: any;
  name: string; // 机构名称
  description: string; // 机构描述
  pid: any; // 父级id
}
export class AddIntentAgencyFieldClass implements IntentAgencyField{
  description: string;
  name: string;
  pid: any;
}
export class UpdateIntentAgencyFieldClass implements IntentAgencyField {
  description: string;
  id: any;
  name: string;
  pid: any;

  constructor() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.pid = null;
  }
}

/**
 * 目标职责清单制定
 */
export interface IntentAimsChecklistContentField {
  id?: any;
  content: string; // 内容
  targetType: string; // 类型下拉的settingCode参数
  fraction: number; // 分值
  cycle: number; // 考评周期
}
export class AddIntentAimsChecklistContentFieldClass implements IntentAimsChecklistContentField{
  content: string;
  targetType: string;
  cycle: number;
  fraction: number;
  constructor() {
    this.content = '';
    this.targetType = '';
    this.fraction = null;
    this.cycle = null;
  }
}
export interface IntentAimsChecklistField {
  id?: any;
  organizationId: any; // 组织ID
  organizationName: string; // 组织名称
  targetDutyContent: IntentAimsChecklistContentField[]; // 清单内容
}
export class AddIntentAimsChecklistField implements IntentAimsChecklistField{
  organizationId: any;
  organizationName: string;
  targetDutyContent: IntentAimsChecklistContentField[];
}
export class UpdateIntentAimsChecklistField implements IntentAimsChecklistField{
  id: any;
  organizationId: any;
  organizationName: string;
  targetDutyContent: IntentAimsChecklistContentField[];
  constructor() {
    this.id = null;
    this.organizationId = null;
    this.organizationName = null;
    this.targetDutyContent = [];
  }
}

/**
 * 目标台账管理
 */
export interface IntentAimsLedgerContentField {
  id?: any;
  content: string; // 内容
  targetType: string; // 类型下拉的settingCode参数
  fraction: number; // 分值
  cycle: number; // 考评周期
  completionSituation: string; // 完成情况
  reduceFraction: number; // 扣分
  adjustment: string; // 目标指标调整
  remarks: string; // 备注
}
export class AddIntentAimsLedgerContentFieldClass implements IntentAimsLedgerContentField{
  adjustment: string;
  completionSituation: string;
  content: string;
  cycle: number;
  fraction: number;
  reduceFraction: number;
  remarks: string;
  targetType: string;
  constructor() {
    this.adjustment = '';
    this.completionSituation = '';
    this.content = '';
    this.cycle = null;
    this.fraction = null;
    this.reduceFraction = null;
    this.remarks = '';
    this.targetType = '';
  }
}
export interface IntentAimsLedgerField {
  id?: any;
  organizationId: any; // 组织ID
  organizationName: string; // 组织名称
  maker: string; // 制定人员（人员列表）
  makerId: any; // 制定人员ID
  targetDutyContent: IntentAimsLedgerContentField[]; // 清单内容
}
export class UpdateIntentAimsLedgerField implements IntentAimsLedgerField{
  maker: string;
  makerId: any;
  organizationId: any;
  organizationName: string;
  targetDutyContent: IntentAimsLedgerContentField[];
  constructor() {
    this.maker = '';
    this.makerId = null;
    this.organizationId = null;
    this.organizationName = '';
    this.targetDutyContent = [];
  }
}

/**
 * 安全生产投入
 */
export interface IntentInvestField {
  id?: any;
  organizationId: any; // 组织ID
  organizationName: string; // 组织名称
  date: string; // 日期
  outdoorsAmount: number; // 露天矿量
  wellAmount: number; // 井下矿量
  outdoorsPrice: number; // 露天单价
  wellPrice: number; // 井下单价
  planMoney: number; // 提取金额
  useMoney: number; // 使用金额
  ifShare: string; // 是否共用（使用下拉框）
  remarks: string; // 备注（使用下拉框）
}
export class AddIntentInvestField implements IntentInvestField{
  date: string;
  ifShare: string;
  organizationId: any;
  organizationName: string;
  outdoorsAmount: number;
  outdoorsPrice: number;
  planMoney: number;
  remarks: string;
  useMoney: number;
  wellAmount: number;
  wellPrice: number;

}
export class UpdateIntentInvestField implements IntentInvestField{
  date: string;
  id: any;
  ifShare: string;
  organizationId: any;
  organizationName: string;
  outdoorsAmount: number;
  outdoorsPrice: number;
  planMoney: number;
  remarks: string;
  useMoney: number;
  wellAmount: number;
  wellPrice: number;

  constructor() {
    this.id = null;
    this.organizationId = null;
    this.organizationName = '';
    this.date = '';
    this.ifShare = '';
    this.outdoorsAmount = null;
    this.outdoorsPrice = null;
    this.planMoney = null;
    this.remarks = '';
    this.useMoney = null;
    this.wellAmount = null;
    this.wellPrice = null;
  }
}

/**
 * 安全文化建设
 */
export interface IntentCultureField {
  id?: any;
  organizationId: any; // 组织ID
  organizationName: string; // 组织名称
  activityName: string; // 活动名称
  startTime: string; // 开展日期
  activityLevel: number; // 活动等级
  remarks: string; // 备注
}
export class AddIntentCultureField implements IntentCultureField{
  activityLevel: number;
  activityName: string;
  organizationId: any;
  organizationName: string;
  remarks: string;
  startTime: string;
}
export class UpdateIntentCultureField implements IntentCultureField{
  activityLevel: number;
  activityName: string;
  id: any;
  organizationId: any;
  organizationName: string;
  remarks: string;
  startTime: string;
  constructor() {
    this.id = null;
    this.organizationId = null;
    this.organizationName = '';
    this.activityLevel = null;
    this.activityName = '';
    this.remarks = '';
    this.startTime = '';
  }
}

