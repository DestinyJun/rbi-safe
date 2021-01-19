import {OrgTree, TreeOption} from './Api';
import {FormGroup, Validators} from '@angular/forms';

export const SAFE_TREE = [
  {
    label: '人的不安全行为',
    children: [
      {label: '操作错误、忽视安全、忽视警告', children: []},
      {label: '造成安全装置失效', children: []},
      {label: '使用不安全设备', children: []},
      {label: '用手代替工具操作', children: []},
      {label: '物体（指成品、半成品、材料、工具、切屑和生产用品等）存放不当', children: []},
      {label: '冒险进入危险场所', children: []},
      {label: '攀、坐不安全位置（如平台护栏、汽车挡板、吊车吊钩）', children: []},
      {label: '在起吊物下作业、停留', children: []},
      {label: '机器运转时加油、修理、检查、调整、焊接、清扫等工作', children: []},
      {label: '有分散注意力行为', children: []},
      {label: '在必须使用个人防护用品用具的作业或场合中，忽视其使用', children: []},
      {label: '使用不安全装束', children: []},
      {label: '对易燃、易爆等危险物品处理错误', children: []},
      {label: '其他', children: []},
    ]
  },
  {
    label: '物的不安全状态',
    children: [
      {label: '防护、保险、信号等 装置缺乏或有缺陷', children: []},
      {label: '设备、设施、工具、附件有缺陷', children: []},
      {label: '安全帽、安全鞋等缺少或有缺陷', children: []},
      {label: '生产（施工）场地环境不良', children: []},
      {label: '其他', children: []},
    ]
  },
  {
    label: '管理方面存在问题',
    children: [
      {label: '上锁挂牌', children: []},
      {label: '物理隔离', children: []},
      {label: '教育培训', children: []},
      {label: '风险识别', children: []},
      {label: '危险作业分级审批', children: []},
      {label: '承包商七步法', children: []},
      {label: '其他管理因素', children: []},
    ]
  }
];

// p-calendar语言本地化
export const Es = {
  firstDayOfWeek: 1,
  dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
  dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
  dayNamesMin: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
  dateFormat: 'yy-mm-dd',
  today: '当前时间',
  clear: '清除'
};

// p-tree树形结构初始化函数
export function orgInitializeTree(data): any {
  const oneChild = [];
  for (const item of data) {
    const childnode: OrgTree = {};
    for (const refs in item) {
      if (refs === 'chiled') {
        continue;
      }
      if (refs === 'organizationName') {
        childnode.label = item.organizationName;
      } else {
        if (item.hasOwnProperty(refs)) {
          childnode[refs] = item[refs];
        }
      }
    }
    if (item.level === 2) {
      childnode.expanded = true;
    }
    if (item.chiled != null && item.chiled.length !== 0) {
      childnode.children = orgInitializeTree(item.chiled);
    }
    else {
      childnode.children = [];
      childnode.icon = 'fa fa-address-card-o';
    }
    oneChild.push(childnode);
  }
  return oneChild;
}

/**
 * 树形结构初始化工具函数
 * @param data 需要初始化的数据
 * @param option 初始化配置信息
 */
export function initializeTree(data: Array<any>, option: TreeOption): any {
  const oneChild = [];
  for (const item of data) {
    const childnode: any = {};
    for (const refs in item) {
      if (item.hasOwnProperty(refs)) {
        if (refs === option.labelName) {
          childnode.label = item[option.labelName];
          continue;
        }
        if (refs === option.childrenName) {
          continue;
        }
        childnode[refs] = item[refs];
      }
    }
    if (item[option.childrenName] != null && item[option.childrenName].length !== 0) {
      childnode.children = initializeTree(item[option.childrenName], option);
    }
    else {
      childnode.children = [];
      childnode.icon = option.icon;
    }
    oneChild.push(childnode);
  }
  return oneChild;
}

/**
 * 树型结构表初始化
 * @param data
 * @param option
 */
export function initializeTableTree(data: Array<any>, option: TreeOption): any {
  const oneChild = [];
  for (const item of data) {
    const childnode: any = {};
    const childnodeTable: any = {};
    for (const refs in item) {
      if (item.hasOwnProperty(refs)) {
        if (refs === option.labelName) {
          childnodeTable.name = item[option.labelName];
          continue;
        }
        if (refs === option.childrenName) {
          continue;
        }
        childnodeTable[refs] = item[refs];
      }
    }
    childnode.data = childnodeTable;
    if (item[option.childrenName] != null && item[option.childrenName].length !== 0) {
      childnode.children = initializeTableTree(item[option.childrenName], option);
    }
    else {
      childnode.children = [];
      childnode.icon = option.icon;
    }
    oneChild.push(childnode);
  }
  return oneChild;
}

/**
 * 树形结构数据平行序列化函数
 * @param data 需要平行序列化的数据
 */
export function reverseTree(data): Array<any> {
  let queen = [];
  const out = [];
  queen = queen.concat(data);
  while (queen.length) {
    const first = queen.shift();
    if (first.children) {
      queen = queen.concat(first.children);
      delete first.children;
    }
    out.push(first);
  }
  return out;
}

/**
 * 对象赋值
 * @param assignedObj Object 需要赋值的对象
 * @param copyObj Object 被复制的对象
 * @returns {*}
 */
export function objectCopy(assignedObj: any, copyObj: any): any {
  const obj = {};
  for (const prop in assignedObj) {
    if (assignedObj.hasOwnProperty(prop)) {
      obj[prop] = copyObj[prop];
    }
  }
  return obj;
}

// 下拉框数据转换
export function  setDrapdownOptionList(list: Array<any>): any {
  return list.map(val => {
    return {label: val.settingName, value: val.settingCode};
  });
}

/**
 * formData的图像列表
 * @param data formdata 动态表单对象
 * @param label formdata 的文件参数名
 * @param formData formdata对象
 */
export function setImageToFromData(data: FormGroup , label: string, formData: FormData) {
  console.log(data);
  if (data.value[label] && data.value[label] !== ''){
    data.value[label].forEach(val => {
      formData.append(label, val);
    });
  }else {
    formData.append(label, '');
  }
}

export function setVlaueToLabel(list: Array<any>, data: string){
   list.forEach(val => {
     if (val.value === data){
       data = val.label;
     }
   });
   return data;
}

export function setLabelToVlaue(list: Array<any>, data: string){
  list.forEach(val => {
    if (val.label === data){
      data = val.value;
    }
  });
  return data;
}

// 给表单赋值
export function setValueToFromValue(list: Array<string>, data: object, formGroup: FormGroup) {
  const obj = {};
  list.forEach(val => {
    obj[val] = data[val];
    formGroup.patchValue({[val]: data[val]});
  });
}

export function InitFormGroup(obj: any, option = []): any  {
  const a = Object.assign(obj);
  for (const keys in a) {
    if (a.hasOwnProperty(keys)) {
      if (option.includes(keys)) {
        a[keys] = [''];
      } else {
        a[keys] = ['', Validators.required];
      }
    }
  }
  return a;
}

/**
 * 去除数组中重复的项
 * @param arr
 */
export function rmRepeatArray(arr: Array<any>): Array<any> {
  const oldArr = [];
  const newArr = [];
  const resArr = [];
  for (const item of arr) {
    oldArr.push(item.permissionId);
  }
  oldArr.forEach((item, i) => {
    if (newArr.indexOf(oldArr[i]) < 0) {
     newArr.push(oldArr[i]);
   }
  });
  newArr.forEach((item, i) => {
    resArr.push({permissionId: item});
  });
  return resArr;
}

/**
 * 将base64转成File
 * @param urlData
 * @param filename
 */
function base64ToFile(urlData, filename) {
  if (typeof urlData !== 'string') {
    return false;
  }
  const arr = urlData.split(',');
  const type = arr[0].match(/:(.*?);/)[1];
  const fileExt = type.split('/')[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${filename}.` + fileExt, {
    type: type
  });
}

/**
 * 将Uint8Array转换成base64
 * @param u8Arr Uint8Array对象
 */
function uint8arrayToBase64(u8Arr) {
  const CHUNK_SIZE = 0x8000;
  let index = 0;
  const length = u8Arr.length;
  let result = '';
  let slice;
  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length));
    result += String.fromCharCode.apply(null, slice);
    index += CHUNK_SIZE;
  }
  return 'data:image/jpg;base64,' + btoa(result);
}

/**
 * 将符合字节流的string转化成Uint8Array
 * @param {String} data
 * @return {Blob}
 * @api public
 */
function binaryToUint8Array(data) {
  const arr = new Uint8Array(data.length);
  for (let i = 0, l = data.length; i < l; i++) {
    arr[i] = data.charCodeAt(i);
  }
  return arr;
}

/**
 * 根据URL获取图片的并转成File对象
 * @param {String} url 需要请求的图片地址
 * @param fileName 图片的文件名
 * @return {File} 返回一个File对象
 */
export function getImageFile(url, fileName) {
  const r = new XMLHttpRequest();
  r.open('GET', url, false);
  r.overrideMimeType('text/plain; charset=x-user-defined');
  r.send(null);
  const unit8Arr = binaryToUint8Array(r.responseText);
  const base64 = uint8arrayToBase64(unit8Arr);
  return base64ToFile(base64, fileName);
}
