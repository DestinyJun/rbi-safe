import {ActionTypes} from './loadstatus.actions';

// 设置初始值
const initstate = true;

export function counterReducer(state = initstate, action: { type: any; }) {
  // 判断不同的状态做不同的数据处理
  switch (action.type) {
    case ActionTypes.show :
      return  false;
    case ActionTypes.hidden :
      return  true;
    default:
      return state;
  }
}
