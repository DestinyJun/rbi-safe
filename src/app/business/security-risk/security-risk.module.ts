import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import { SecurityRiskRoutingModule } from './security-risk-routing.module';
import { SecurityRiskComponent } from './security-risk/security-risk.component';
import { SrArchivesComponent } from './sr-archives/sr-archives.component';
import { SrManagerComponent } from './sr-manager/sr-manager.component';
import {
    CalendarModule,
    CheckboxModule,
    DialogModule,
    DropdownModule, InputTextareaModule, InputTextModule,
    RadioButtonModule,
    ScrollPanelModule, SpinnerModule, TooltipModule,
    TreeModule
} from 'primeng/primeng';
import { AreaWithinComponent } from './sr-manager/area-within/area-within.component';
import { AreaOutsideComponent } from './sr-manager/area-outside/area-outside.component';
import {UploadImageModule} from '../../common/components/upload-image/upload-image.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ArchiveWithinComponent } from './sr-archives/archive-within/archive-within.component';
import { ArchiveOutsideComponent } from './sr-archives/archive-outside/archive-outside.component';
import {TableModule} from 'primeng/table';
import {PaginationModule} from '../../common/components/pagination/pagination.module';
import { ArchiveBigRiskComponent } from './sr-archives/archive-big-risk/archive-big-risk.component';
import { SrInstitutionComponent } from './sr-institution/sr-institution.component';
import { SrControlStatusComponent } from './sr-control-status/sr-control-status.component';
import {EchartsBarModule} from '../../common/components/echarts-bar/echarts-bar.module';
import {EchartsPieModule} from '../../common/components/echarts-pie/echarts-pie.module';
import {NgxEchartsCoreModule} from "ngx-echarts/core";


@NgModule({
  declarations: [
    SecurityRiskComponent,
    SrArchivesComponent,
    SrManagerComponent,
    AreaWithinComponent,
    AreaOutsideComponent,
    ArchiveWithinComponent,
    ArchiveOutsideComponent,
    ArchiveBigRiskComponent,
    SrInstitutionComponent,
    SrControlStatusComponent],
    imports: [
        CommonModule,
        SecurityRiskRoutingModule,
        ScrollPanelModule,
        CheckboxModule,
        DropdownModule,
        UploadImageModule,
        RadioButtonModule,
        CalendarModule,
        ReactiveFormsModule,
        DialogModule,
        TreeModule,
        InputTextModule,
        InputTextareaModule,
        SpinnerModule,
        FormsModule,
        TableModule,
        PaginationModule,
        TooltipModule,
        EchartsBarModule,
        EchartsPieModule,
        NgxEchartsCoreModule
    ],
  providers: [DatePipe]
})
export class SecurityRiskModule { }
