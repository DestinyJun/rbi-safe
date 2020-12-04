import {Action} from '@ngrx/store';
export enum ActionTypes {
  show = '[Counter Component] show',
  hidden = '[Counter Component] hidden',
}
// 显示操作
export class Show implements Action {
  readonly type = ActionTypes.show;
}

// 隐藏操作
export class Hidden implements Action {
  readonly type = ActionTypes.hidden;
}

