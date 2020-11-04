import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { MonitorComprehensiveComponent } from './monitor-comprehensive/monitor-comprehensive.component';
import { MonitorSingleComponent } from './monitor-single/monitor-single.component';
import {EchartsBarModule} from '../../common/components/echarts-bar/echarts-bar.module';
import {EchartsPieModule} from '../../common/components/echarts-pie/echarts-pie.module';
import {DialogModule, ScrollPanelModule, TreeModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';


@NgModule({
  declarations: [
    MonitorComponent,
    MonitorComprehensiveComponent,
    MonitorSingleComponent
  ],
  imports: [
    CommonModule,
    MonitorRoutingModule,
    EchartsBarModule,
    EchartsPieModule,
    DialogModule,
    ButtonModule,
    ScrollPanelModule,
    TreeModule,
  ]
})
export class MonitorModule { }
