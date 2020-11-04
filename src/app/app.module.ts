import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from '@ngrx/store';
import {counterReducer} from './store/loadstatus.reducers';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './common/services/auth.interceptor';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {LoadingModule} from './common/components/loading/loading.module';
import {LoginModule} from './login/login.module';
import {ErrorComponent} from './error/error.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {GeneralInfoModule} from './business/general-info/general-info.module';


@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoadingModule,
    LoginModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ConfirmDialogModule,
    GeneralInfoModule,
    // 加入状态管理器
    StoreModule.forRoot({loadhidden: counterReducer}),
    ToastModule,

  ],
  providers: [
    MessageService,
    ConfirmationService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}, // 拦截器进入
    {provide: LocationStrategy, useClass: HashLocationStrategy},  // 配置哈希路由
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
