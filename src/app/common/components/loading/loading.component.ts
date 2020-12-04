import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {AppState} from '../../../store/loadstatus.state';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  count$: Observable<boolean>;
  constructor(private store: Store<AppState>) {
    this.count$ = store.pipe(select('loadhidden'));
  }
  ngOnInit() {}

}
