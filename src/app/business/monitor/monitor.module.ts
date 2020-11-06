import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MonitorRoutingModule } from './monitor-routing.module';
import { MonitorComponent } from './monitor.component';
import { MonitorComprehensiveComponent } from './monitor-comprehensive/monitor-comprehensive.component';
import { MonitorSingleComponent } from './monitor-single/monitor-single.component';
import {EchartsBarModule} from '../../common/components/echarts-bar/echarts-bar.module';
import {EchartsPieModule} from '../../common/components/echarts-pie/echarts-pie.module';
import {DialogModule, DropdownModule, ScrollPanelModule, TooltipModule, TreeModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/button';
import {FormsModule} from '@angular/forms';
import { MonitorSingleCatComponent } from './monitor-single/monitor-single-cat/monitor-single-cat.component';
import { MonitorSingleWheatComponent } from './monitor-single/monitor-single-wheat/monitor-single-wheat.component';
import { MonitorSingleRiverComponent } from './monitor-single/monitor-single-river/monitor-single-river.component';
import {TableModule} from 'primeng/table';
import {PaginationModule} from '../../common/components/pagination/pagination.module';


@NgModule({
  declarations: [
    MonitorComponent,
    MonitorComprehensiveComponent,
    MonitorSingleComponent,
    MonitorSingleCatComponent,
    MonitorSingleWheatComponent,
    MonitorSingleRiverComponent
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
    DropdownModule,
    FormsModule,
    TableModule,
    PaginationModule,
    TooltipModule,
  ]
})
export class MonitorModule { }
