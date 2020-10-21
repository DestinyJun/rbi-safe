/**
 * SPI系数参数
 */
export interface SetingSpiApiField {
  id?: any;
  name: string; // 	指标名称
  num: number; // 	指标系数
  pid: any; // 父级id 下拉选择，见 ——树结构下拉接口
}
export class AddSetingSpiApiFieldClass implements SetingSpiApiField{
  name: string;
  num: number;
  pid: any;
  constructor() {
    this.name = '';
    this.num = null;
    this.pid = null;
  }
}
export class UpdateSetingSpiApiFieldClass implements SetingSpiApiField {
  id: any;
  name: string;
  num: number;
  pid: any;
  constructor() {
    this.id = null;
    this.name = '';
    this.num = null;
    this.pid = null;
  }
}

/**
 * SPI系数阈值
 */
export interface SetingSillApiField {
  warningCycleCode: string; // 下拉选框
  thresholdOne: number; // 	阈值1
  thresholdTwo: number; // 	阈值2
  thresholdThree: number; // 阈值3
}
export class UpdateSetingSillApiFieldClass implements SetingSillApiField {
  thresholdOne: number;
  thresholdThree: number;
  thresholdTwo: number;
  warningCycleCode: string;

  constructor() {
    this.thresholdOne = null;
    this.thresholdThree = null;
    this.thresholdTwo = null;
    this.warningCycleCode = '';
  }
}
