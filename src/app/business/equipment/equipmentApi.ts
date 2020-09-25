/**
 * 新增安全设施设备
 */
export interface EquipmentSafeField {
  id?: any;
  organizationId: any; // 组织id
  type: string; // 类型
  majorEquipment: string; // 	主要设备设施
  modelAndSpecification: string; // 型号及规格
  unit: string; // 单位
  number: number; // 数量
  position: string; // 安装位置
  operationStatus: number; // 运行状况（状态码1正常 2异常）
  remarks: string; // 备注
}
export class AddEquipmentSafeFieldClass implements EquipmentSafeField{
  majorEquipment: string;
  modelAndSpecification: string;
  number: number;
  operationStatus: number;
  organizationId: any;
  position: string;
  remarks: string;
  type: string;
  unit: string;
}
export class UpdateEquipmentSafeFieldClass implements EquipmentSafeField {
  id: number;
  majorEquipment: string;
  modelAndSpecification: string;
  number: number;
  operationStatus: number;
  organizationId: any;
  position: string;
  remarks: string;
  type: string;
  unit: string;
  constructor() {
    this.majorEquipment = '';
    this.modelAndSpecification = '';
    this.number = null;
    this.operationStatus = null;
    this.organizationId = null;
    this.position = '';
    this.remarks = '';
    this.unit = '';
  }
}

/**
 * 新增特种设施设备
 */
export interface EquipmentSpecialField {
  id?: any;
  organizationId: any; // 组织id
  equipmentName: string; // 设备名称
  specialParameters: string; // 特种参数
  factoryNumber: string; // 出厂编号
  operationTime: string; // 投用时间
  inspectionDate: string; // 检验日期
  inspectionPeriod: string; // 检验周期
  nextInspectionDate: string; // 下次检验时间
  licenseNo: string; // 使用证号
  registeredUnit: string; // 注册单位
  manufacturer: string; // 制造单位
  equipmentCode: string; // 设备代码
  inspectionUnit: string; // 检验单位
  reportNo: string; // 报告编号
  position: string; // 安装位置
  operationStatus: number; // 运行状况（状态码1正常 2异常）
  remarks: string; // 备注
}
export class AddEquipmentSpecialFieldClass implements EquipmentSpecialField{
  equipmentCode: string;
  equipmentName: string;
  factoryNumber: string;
  inspectionDate: string;
  inspectionPeriod: string;
  inspectionUnit: string;
  licenseNo: string;
  manufacturer: string;
  nextInspectionDate: string;
  operationStatus: number;
  operationTime: string;
  organizationId: any;
  position: string;
  registeredUnit: string;
  remarks: string;
  reportNo: string;
  specialParameters: string;

}
export class UpdateEquipmentSpecialFieldClass implements EquipmentSpecialField {
  equipmentCode: string;
  equipmentName: string;
  factoryNumber: string;
  id: any;
  inspectionDate: string;
  inspectionPeriod: string;
  inspectionUnit: string;
  licenseNo: string;
  manufacturer: string;
  nextInspectionDate: string;
  operationStatus: number;
  operationTime: string;
  organizationId: any;
  position: string;
  registeredUnit: string;
  remarks: string;
  reportNo: string;
  specialParameters: string;
  constructor() {
    this.id = null;
    this.equipmentCode = '';
    this.equipmentName = '';
    this.factoryNumber = '';
    this.inspectionDate = '';
    this.inspectionPeriod = '';
    this.inspectionUnit = '';
    this.licenseNo = '';
    this.manufacturer = '';
    this.nextInspectionDate = '';
    this.operationTime = '';
    this.position = '';
    this.registeredUnit = '';
    this.reportNo = '';
    this.specialParameters = '';
    this.operationStatus = null;
    this.organizationId = null;
    this.remarks = '';
  }
}

/**
 * 新增其他设施设备
 */
export interface EquipmentOtherField {
  id?: any;
  organizationId: any; // 组织id
  numberOfSets: number; // 台数
  intactNumber: number; // 完好台数
  remarks: string; // 备注
}
export class AddEquipmentOtherFieldClass implements EquipmentOtherField{
  intactNumber: number;
  numberOfSets: number;
  organizationId: any;
  remarks: string;
}
export class UpdateEquipmentOtherFieldClass implements EquipmentOtherField {
  id: any;
  intactNumber: number;
  numberOfSets: number;
  organizationId: any;
  remarks: string;
  constructor() {
    this.id = null;
    this.organizationId = null;
    this.numberOfSets = null;
    this.organizationId = null;
    this.remarks = '';
  }
}
