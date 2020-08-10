import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {InputTextModule} from 'primeng/inputtext';
import {NoticeModule} from '../common/components/notice/notice.module';
import {FormsModule} from '@angular/forms';
import {ButtonModule, DialogModule, ScrollPanelModule, SidebarModule} from 'primeng/primeng';
import { HeaderSidebarComponent } from './header/header-sidebar/header-sidebar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    SidebarComponent,
    HeaderSidebarComponent
  ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        InputTextModule,
        NoticeModule,
        FormsModule,
        SidebarModule,
        ButtonModule,
        DialogModule,
        ScrollPanelModule
    ]
})
export class HomeModule { }
