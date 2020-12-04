import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from './store/loadstatus.state';
import {Hidden, Show} from './store/loadstatus.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rbi-safe';
  constructor(private store: Store<{count: AppState}>) {}
  public showTest() {
    console.log('我执行了showTest');
    this.store.dispatch(new Show());
  }
  public showHidden() {
    console.log('我执行了showHidden');
    this.store.dispatch(new Hidden());
  }
}
