//  日常培训类别接口

import {FormControl, Validators} from '@angular/forms';

export interface EveryCategory {
  name: string;
  value: string;
  flag: number;
}

// 组织前台树形结构接口
export interface OrgTree {
  children?: OrgTree[];
  companyPersonnelBoxList?: any;
  id?: any;
  label?: string;
  level?: any;
  parentId?: any;
  expandedIcon?: string;
  collapsedIcon?: string;
  icon?: string;
  expanded?: boolean;
}

// 组织后台台树形结构接口
export interface OraWebTree {
  chiled?: OraWebTree[];
  companyPersonnelBoxList?: any;
  id?: any;
  organizationName?: string;
  level?: any;
  parentId?: any;
}

// 角色数据接口
export interface Role {
  id?: number;
  roleName?: string;
  level?: string;
  whetherSee?: nums;
  enabled?: nums;
  sysRolePermissionList?: Array<any>;
}

export enum nums {
  zero = 0,
  one = 1
} // 0，1的枚举
// 分页组件参数接口
export interface PageOption {
  pageSize?: any;
  totalRecord?: any;
}

// 组织结构树
export interface OragizationTree {
  code?: any;
  name?: any;
  id?: any;
  label?: any;
  level?: any;
  value?: any;
  parent?: any;
}

// 树节点
export interface TreeNode {
  id?: any;
  value?: any;
  label?: any;
  level?: any;
  router?: any;
  parentCode?: any;
  check?: any;
  color?: any;
  idt?: any;
  udt?: any;
  selectable?: any;
  children?: TreeNode[];
}

// 权限结构
export interface Permission {
  id?: number;
  roleId?: number;
  permissionId?: number;
  permissionName?: string;
  systemId?: number;
  systemName?: string;
  rolePermissionInfos: Permission[];
}

// 属性结构初始化配置项
export interface TreeOption {
  labelName: string; // 需要转换为label的字段
  childrenName: string; // 需要转换为children的字段
  icon?: string; // 如果当前结构的孩子为空，内容旁边的图标，不设置就不显示
  // expandedIcon?: string; // 内容在展开状态下旁边的图标，没有就显示，如何配置了icon则expandedIcon无效
  // collapsedIcon?: string; // 内容在关闭状态下旁边的图标，没有就显示，如何配置了icon则expandedIcon无效
}

/**
 * 特种培训信息接口以及字段映射
 */
export interface SpecialField {
  id?: any;
  idCardNo: any; // 身份证
  typeOfWork: string; // 工种
  operationItems: string; // 操作项目
  workingYears: string; // 本工种工龄
  theoreticalAchievements: number; // 理论成绩
  actualResults: number; // 实际成绩
  operationCertificateNo: string; // 操作证号
  dateOfIssue: string; // 发证日期
  yearsOfWork: number; // 工种年限
  oneReviewResults?: number; // 第一次复审成绩
  oneReviewTime?: string; // 第一次复审时间
  towReviewResults?: number; // 第二次复审成绩
  towReviewTime?: string; // 第二次复审时间
  threeReviewResults?: number; // 第三次复审成绩
  threeReviewTime?: string; // 第三次复审时间
  fourReviewResults?: number; // 第四次复审成绩
  fourReviewTime?: string; // 第四次复审时间
  fiveReviewResults?: number; // 第五次复审成绩
  fiveReviewTime?: string; // 第五次复审时间
  sixReviewResults?: number; // 第六次复审成绩
  sixReviewTime?: string; // 第六次复审时间
  remarks?: string; // 备注
  validityPeriod: number; // 复审年限，默认为3
}
export class SpecialFieldClass implements SpecialField {
  yearsOfWork: number = 3;
  typeOfWork: string = '';
  actualResults: number = null;
  dateOfIssue: string = '';
  fiveReviewResults: number = null;
  fiveReviewTime: string = null;
  fourReviewResults: number = null;
  fourReviewTime: string = null;
  id: any = null;
  idCardNo: any = null;
  oneReviewResults: number = null;
  oneReviewTime: string = null;
  operationCertificateNo: string = '';
  operationItems: string = '';
  remarks: string = null;
  sixReviewResults: number = null;
  sixReviewTime: string = null;
  theoreticalAchievements: number = null;
  threeReviewResults: number = null;
  threeReviewTime: string = null;
  towReviewResults: number = null;
  towReviewTime: string = null;
  validityPeriod: number = 3;
  workingYears: string = '';

  constructor() {
  }
}

// 表头部数据接口
export interface TableHeader {
  field: string;
  header: string;
}

// 操作行为约束
interface OperateFlag {
  add: string;
  update: string;
  save: string;
  del: string;
}
export class OperateFlagClass implements OperateFlag {
  public add: string;
  public del: string;
  public save: string;
  public update: string;
  constructor() {
    this.add = 'add';
    this.del = 'del';
    this.save = 'save';
    this.update = 'update';
  }
}

/**
 * 培训内容字段接口及实现
 */
export interface ScsContentField {
  file: any;
  contentCategoryId: string;
}
export class ScsContentFieldClass implements ScsContentField{
  file: any;
  contentCategoryId: string;
  constructor() {
    this.file = null;
    this.contentCategoryId = '';
  }
}

/**
 * 单选条目增加
 */
export interface QuestionTemplate {
  rightKey: any;  // 正确答案
  subject: any;  // 试题题目
  order: any;  // 选项顺序
  option: any; // 选项数据
  score: any; // 选项分数
}

/**
 * 特种人员复审接口及实现
 */
export interface ReviewInfo {
  id: any;
  completionStatus: string;
  reasonForHandling: string;
}
export class ReviewInfoClass implements ReviewInfo {
  id: any;
  completionStatus: string;
  reasonForHandling: string;
  constructor() {
    this.id  = null;
    this.completionStatus = '3';
    this.reasonForHandling = '';
  }
}

/**
 * id限定类接口
 */
export interface IdInterface {
  id: any;
}

/**
 * 教育培训台账接口及实现
 */
export interface EducateField {
  id?: any;
  idCardNo?: string;
  organizationName?: string;
  companyEducationTime: string;
  companyFraction: number;
  factoryEducationTime: string;
  factoryFraction: number;
  workshopEducationTime: string;
  workshopFraction: number;
  classEducationTime: string;
  classFraction: number;
}
export class AddEducateFieldClass implements EducateField{
  classEducationTime: string;
  classFraction: number;
  companyEducationTime: string;
  companyFraction: number;
  factoryEducationTime: string;
  factoryFraction: number;
  organizationName: string;
  workshopEducationTime: string;
  workshopFraction: number;
  idCardNo: string;
}
export class UpdateEducateFieldClass implements EducateField {
  classEducationTime: string;
  classFraction: number;
  companyEducationTime: string;
  companyFraction: number;
  factoryEducationTime: string;
  factoryFraction: number;
  id: any;
  workshopEducationTime: string;
  workshopFraction: number;
  constructor() {
    this.id = null;
    this.classEducationTime = '';
    this.companyEducationTime = '';
    this.factoryEducationTime = '';
    this.workshopEducationTime = '';
    this.classFraction = null;
    this.companyFraction = null;
    this.factoryFraction = null;
    this.workshopFraction = null;
  }
}

/**
 * 主要负责人/安全生产管理员培训台账接口及实现
 */
export interface ManageField {
  id?: any;
  idCardNo?: string; // 身份证号
  unit: string; // 单位
  dateOfIssue: string; // 发证时间
  termOfValidity: string; // 有效期
  typeOfCertificate: string; // 合格证类型 手输
  oneTrainingTime: string; // 培训时间1
  twoTrainingTime: string; // 培训时间2
  threeTrainingTime: string; // 培训时间3
  remarks: string; // 备注
}
export class AddManageFieldClass implements ManageField{
  dateOfIssue: string;
  idCardNo: string;
  oneTrainingTime: string;
  remarks: string;
  termOfValidity: string;
  threeTrainingTime: string;
  twoTrainingTime: string;
  typeOfCertificate: string;
  unit: string;
}
export class UpdateManageFieldClass implements ManageField {
  dateOfIssue: string;
  id: any;
  oneTrainingTime: string;
  remarks: string;
  termOfValidity: string;
  threeTrainingTime: string;
  twoTrainingTime: string;
  typeOfCertificate: string;
  unit: string;
}


export interface QuestionItem {
  title?: any;
  option?: Array<object>; // 选项
  sureKey?: any; // 正确答案
  type?: any; // 题目类型
}
export class QuestionItemClass implements QuestionItem{
  title: any;
  option: Array<object>; // 选项
  sureKey: any; // 正确答案
  type: any; // 题目类型
  score: any; // 题目分数
}

export interface Question {
  id?: any; // 题目id
  rightKey?: any; // 正确答案
  subject?: any; // 题目
  subjectType?: any; // 题目类型(1:单选；2：多选；3：判断；4：填空
  option?: any; // 选择题的选项
  order?: any; // 	选项排序
  subjectStoreId?: any; // 	题库id
  score?: any; // 	题库分数
}
export class ChangeQuestion implements Question{
  id: any; // 题目id
  rightKey: any; // 正确答案
  subject: any; // 题目
  subjectType: any; // 题目类型(1:单选；2：多选；3：判断；4：填空
  option: any; // 选择题的选项
  order: any;  // 选项排序
  subjectStoreId?: any;  // 题库id
  score?: any;  // 题库分数
}
export class AddQuestion implements Question{
  rightKey: any; // 正确答案
  subject: any; // 题目
  subjectType: any; // 题目类型(1:单选；2：多选；3：判断；4：填空
  option: any; // 选择题的选项
  order: any;  // 选项排序
  subjectStoreId?: any;  // 题库id
  score?: any;  // 题库分数
}

/**
 * 教育培训相关接口及实现
 */
export interface ProgramField {
  id: any;
  trainingTypeName: string;
  trainingContent: string;
  processingStatus: number; // 1：申请中 2：进行中 3：已完成
  reportPerson: any;
  proposedTime: string;
  name: string;
}
export class ProgramFieldClass implements ProgramField{
  id: any;
  name: string;
  processingStatus: number;
  proposedTime: string;
  reportPerson: any;
  trainingContent: string;
  trainingTypeName: string;
}

export interface TrainingField {
  id?: any;
  targetSet: string;
  trainingTypeId: number;
  trainingContent: string; // 培训内容
  trainingDuration: string; // 培训时长
  startTime: string; // 培训开始时间
  endTime: string; // 培训结束时间
  organizationTrainingDepartmentId: string;
  processingStatus: string; // 培训状态
  targetNameSet?: string[]; // 受训单位人员
  trainingTypeName?: string; // 日常培训类别名称
  organizationName?: string; // 组织培训单位
}
export class TrainingFieldAddClass implements TrainingField {
  endTime: string;
  organizationTrainingDepartmentId: string;
  processingStatus: string;
  startTime: string;
  targetSet: string;
  trainingContent: string;
  trainingDuration: string;
  trainingTypeId: number;
  constructor() {
    this.processingStatus = '1';
  }

  frequency: string;
}
export class TrainingFieldUpdateClass implements TrainingField {
  id: any;
  endTime: string;
  organizationTrainingDepartmentId: string;
  processingStatus: string;
  startTime: string;
  targetSet: string;
  trainingContent: string;
  trainingDuration: string;
  trainingTypeId: number;
  constructor() {
    this.id = '';
    this.endTime = '';
    this.organizationTrainingDepartmentId = '';
    this.processingStatus = '';
    this.startTime = '';
    this.targetSet = '';
    this.trainingContent = '';
    this.trainingDuration = '';
    this.trainingTypeId = null;
  }
}

export interface ExamRuleField {
  startTime: string; // 考试开始时间
  endTime: string; // 考试结束时间
  duration: number; // 考试时长
  frequency: number; // 考试次数
  testPaperName: string; // 考试名称
  examNotes: string; // 考试须知
}
export class ExamRuleFieldClass implements ExamRuleField{
  examNotes: string;
  duration: number;
  endTime: string;
  startTime: string;
  testPaperName: string;
  frequency: number;
}

// 获取公司人员查询参数接口
export interface CompanyPersonParams {
  pageNo: string;
  pageSize: string;
  organizationId?: string; // 根据组织id查询
  employeeNumber?: string; // 根据员工号查询
  name?: string; // 根据姓名查询
  idCardNo?: string; // 根据身份证号查询
  position?: string; // 根据所在职位查询
  workType?: string; // 根据所在职位查询
}

export interface MYLevelFourEducationInfo {
  id?: any;
  entryTime?: any; // 入场时间
  organizationName?: any;
  workType?: any; // 工种
  jobNature?: any; //
  companyEducationTime?: any; // 公司教育时间
  companyFraction?: any; // 公司级成绩
  factoryEducationTime?: any;
  factoryFraction?: any;
  workshopEducationTime?: any;
  workshopFraction?: any;
  classEducationTime?: any;
  classFraction?: any;
  operatingStaff?: any;
}
export class LevelFourEducationDetail implements MYLevelFourEducationInfo{
  entryTime?: any; // 入场时间
  organizationName?: any;
  workType?: any; // 工种
  jobNature?: any; //
  companyEducationTime?: any; // 公司教育时间
  companyFraction?: any; // 公司级成绩
  factoryEducationTime?: any;
  factoryFraction?: any;
  workshopEducationTime?: any;
  workshopFraction?: any;
  classEducationTime?: any;
  classFraction?: any;
  operatingStaff?: any;
}

export interface Principoal {
  id?: any;
  safeAdministratorId?: any;
  oneTrainingTime?: any; // 培训时间1
  twoTrainingTime?: any; // 培训时间2
  threeTrainingTime?: any; // 培训时间3
  reasonForHandling?: any;
}

export class CanclePrincipoal implements Principoal{
  id: any;
  reasonForHandling: any;
  constructor() {
    this.reasonForHandling = '';
  }
}
export class ReviewPrincipoal implements Principoal{
  id: any;
  safeAdministratorId: any;
  oneTrainingTime: any;
  twoTrainingTime: any;
  threeTrainingTime: any;
  constructor() {
    this.id = '';
    this.safeAdministratorId = '';
    this.oneTrainingTime = '';
    this.twoTrainingTime = '';
    this.threeTrainingTime = '';
  }
}

/**
 * 题库接口
 */

// 题型
export interface Topic {
  id?: any;
  subjectType: number; // 题库类型，1单选，2多选，3判断，4填空
  subject: string;  // 题目标题
  rightKey: string; // 正确答案索引
  subjectStoreId?: any; // 所属题库ID
  subjectStoreName?: string; // 所属题库题目
  score: any; // 题目分值
  questionBankSubjectId?: any; // 题目分值
}
// 题型答案
export interface TopicAnswer {
  id?: any;
  subjectId?: any; // 所属题目ID
  option: any; // 答案选项文字标题
  order: any; // 排序
}
// 组合提醒
export interface TopicFields {
  safeSubject: Topic;
  safeSubjectOptionList: TopicAnswer[];
}
// 考试题目
export class TopicExamClass implements Topic{
  rightKey: string;
  score: any;
  subject: string;
  subjectType: number;
  constructor() {
    this.rightKey = '';
    this.score = null;
    this.subject = '';
    this.subjectType = null;
  }
}
// 考试题题目选项
export class TopicExamOptionClass implements TopicAnswer{
  option: any;
  order: any;
  constructor() {
    this.option = null;
    this.order = null;
  }
}

export interface CompleteExam {
  personnelTrainingRecordId?: any;
  safeAnswerRecordList?: SafeAnswerRecord[];
}
export interface SafeAnswerRecord {
  id: any;
  answerResults?: any;
  rightKey?: any;
  score?: any;
  testUestionsId?: any;
  testPapreId?: any;
}

export class CommpleteExamData implements CompleteExam{
  personnelTrainingRecordId: any;
  safeAnswerRecordList: SafeAnswerRecord[];
  constructor() {
    this.safeAnswerRecordList = [];
  }
}

/**
 * 培训内容库分类
 */
export interface ScsContentType {
  id?: any;
  contentCategoryName: string; // 内容分类名称
  idt?: string; // 添加时间
  udt?: string; // 修改时间
}
export class AddScsContentTypeClass implements ScsContentType {
  contentCategoryName: string = '';
}
export class UpdateScsContentTypeClass implements ScsContentType {
  id: any = null;
  contentCategoryName: string = '';
}


export interface SRRisk{
  organizationName: any;
  organizationId: any;
  code: any;
  taskCode: any; // 作业或者任务
  workType: any; // 工种
  step: any; // 步骤
  harmName: any;  // 危害名称
  harmKind: any; // 危害种类
  harmDescription: any; // 危害及相关描述
  riskDescription: any; // 风险描述
  riskKind: any; // 风险种类
  riskCategory: any; // 粉线范畴
  exposeInfo: any; // 风险暴露人员  设备信息
  controlMeasures: any; // 	现有控制措施
  consequence: any; // 后果
  expose: any; // 暴露
  possibility: any; // 可能性
  riskValue: any; // 风险值
  riskGrad: any; // 风险等级
  adviceMeasures: any; // 建议采取措施
  measuresEffective: any; // 控制措施的有效性
  measuresCost: any; // 措施成本
  measuresResult: any; // 控制措施判断结果
  measuresUse: any; // 措施的采纳 选择（单选） 是 否
  evaluateTime: any; // 评估时间
  picture: any; // 图片文件 最大六张
}

export class AddSRRisk implements SRRisk{
  organizationName: any;
  organizationId: any;
  code: any;
  taskCode: any; // 作业或者任务
  workType: any; // 工种
  step: any; // 步骤
  harmName: any;  // 危害名称
  harmKind: any; // 危害种类
  harmDescription: any; // 危害及相关描述
  riskDescription: any; // 风险描述
  riskKind: any; // 风险种类
  riskCategory: any; // 粉线范畴
  exposeInfo: any; // 风险暴露人员  设备信息
  controlMeasures: any; // 	现有控制措施
  consequence: any; // 后果
  expose: any; // 暴露
  possibility: any; // 可能性
  riskValue: any; // 风险值
  riskGrad: any; // 风险等级
  adviceMeasures: any; // 建议采取措施
  measuresEffective: any; // 控制措施的有效性
  measuresCost: any; // 措施成本
  measuresResult: any; // 控制措施判断结果
  measuresUse: any; // 措施的采纳 选择（单选） 是 否
  evaluateTime: any; // 评估时间
  picture: any; // 图片文件 最大六张
  constructor() {
    this.organizationId = '';
    this.organizationName = '';
    this.code = '';
    this.taskCode = '';
    this.workType = '';
    this.step = '';
    this.harmName = '';
    this.harmKind = '';
    this.harmDescription = '';
    this.riskDescription = '';
    this.riskKind = '';
    this.riskCategory = '';
    this.exposeInfo = '';
    this.controlMeasures = '';
    this.consequence = '';
    this.expose = '';
    this.possibility = '';
    this.riskValue = '';
    this.riskGrad = '';
    this.adviceMeasures = '';
    this.measuresEffective = '';
    this.measuresCost = '';
    this.measuresResult = '';
    this.measuresUse = '';
    this.evaluateTime = '';
    this.picture = '';
  }
}
export class AddOuidSRRisk implements SRRisk{
  organizationName: any;
  organizationId: any;
  harmName: any;  // 危害名称
  harmKind: any; // 危害种类
  harmDescription: any; // 危害及相关描述
  riskDescription: any; // 风险描述
  riskKind: any; // 风险种类
  riskCategory: any; // 粉线范畴
  exposeInfo: any; // 风险暴露人员  设备信息
  controlMeasures: any; // 	现有控制措施
  consequence: any; // 后果
  expose: any; // 暴露
  possibility: any; // 可能性
  riskValue: any; // 风险值
  riskGrad: any; // 风险等级
  adviceMeasures: any; // 建议采取措施
  measuresEffective: any; // 控制措施的有效性
  measuresCost: any; // 措施成本
  measuresResult: any; // 控制措施判断结果
  measuresUse: any; // 措施的采纳 选择（单选） 是 否
  evaluateTime: any; // 评估时间
  picture: any; // 图片文件 最大六张
  constructor() {
    this.organizationId = '';
    this.organizationName = '';
    this.harmName = '';
    this.harmKind = '';
    this.harmDescription = '';
    this.riskDescription = '';
    this.riskKind = '';
    this.riskCategory = '';
    this.exposeInfo = '';
    this.controlMeasures = '';
    this.consequence = '';
    this.expose = '';
    this.possibility = '';
    this.riskValue = '';
    this.riskGrad = '';
    this.adviceMeasures = '';
    this.measuresEffective = '';
    this.measuresCost = '';
    this.measuresResult = '';
    this.measuresUse = '';
    this.evaluateTime = '';
    this.picture = '';
  }
  code: any;
  step: any;
  taskCode: any;
  workType: any;
}

// 用户信息接口及实现
interface HarmNameDTOS {
  harmName: string;
}
export interface PersonInfo {
  name: string; // 姓名
  degreeOfEducation: string; // 学历
  nation: string; // 民族
  dateOfBirth: string; // 生日
  position: string; // 所在职位
  employeeNumber: string; // 员工号
  factoryName: string; // 厂矿
  workshopName: string; // 车间
  teamName: string; // 班组
  entryTime: string; // 入仓时间
  jobNature: string; // 岗位性质
  workType: string; // 工种
  harmNameDTOS: HarmNameDTOS[]; // 	我的岗位风险
}
export class PersonInfoClass implements PersonInfo {
  harmNameDTOS: HarmNameDTOS[] = [];
  dateOfBirth: string = '';
  degreeOfEducation: string = '';
  nation: string = '';
  name: string = '';
  employeeNumber: string = '';
  entryTime: string = '';
  factoryName: string = '';
  jobNature: string = '';
  position: string = '';
  teamName: string = '';
  workType: string = '';
  workshopName: string = '';
}

export interface PersionPassword {
  originalPassword?: any;
  latestPassword?: any;
}
export class PersionPasswordClass  implements PersionPassword{
  originalPassword: string = '';
  latestPassword: string = '';
}
// 提醒过期时间接口及实现
export interface SpecialDay {
  id: any;
  values: number;
}
export class SpecialDayClass implements SpecialDay{
  id: any = null;
  values: number = null;
}

// 提交错题集

export interface HandlePersonalMistakes {
  id: any;
  rightKey: any;
  answerResults: any;
}
export class WrongQuestion implements HandlePersonalMistakes{
  id: any = null;
  rightKey: any = null;
  answerResults: any = null;
}
export interface TreeNode {
  id?: any;
  value?: any;
  label?: any;
  menuPermisFlag?: any;
  permisOrder?: any;
  router?: any;
  parentCode?: any;
  // parentId?: any;
  check?: any;
  color?: any;
  partialSelected?: any;
  remark?: any;
  idt?: any;
  udt?: any;
  type?: any;
  selectable?: any;
  children?: TreeNode[];
}
export class TreeNodeClass implements TreeNode{
  id?: any;
  value?: any;
  label?: any;
  menuPermisFlag?: any;
  permisOrder?: any;
  router?: any;
  parentCode?: any;
  // parentId?: any;
  check?: any;
  color?: any;
  partialSelected?: any;
  remark?: any;
  idt?: any;
  udt?: any;
  type?: any;
  selectable?: any;
  children?: TreeNode[];
}

export interface GeneralInfoData {
  title?: any;
  content?: any;
  file?: any;
  filePath?: any;
}
export class GeneralInfoClass implements GeneralInfoData{
  title: any = null;
  content: any = null;
  file: any = null;
  filePath: any = null;
}
