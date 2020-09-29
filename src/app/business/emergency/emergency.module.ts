import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmergencyRoutingModule } from './emergency-routing.module';
import { EmergencyComponent } from './emergency.component';
import { EmergencySituationComponent } from './emergency-situation/emergency-situation.component';
import { EmergencyOrgComponent } from './emergency-org/emergency-org.component';
import { AgencyComponent } from './emergency-org/agency/agency.component';
import { TeamComponent } from './emergency-org/team/team.component';
import { EmergencyPlanComponent } from './emergency-plan/emergency-plan.component';
import { EmergencyRecordComponent } from './emergency-record/emergency-record.component';
import { EmergencyDrillComponent } from './emergency-drill/emergency-drill.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {CalendarModule, CardModule, CheckboxModule, ConfirmDialogModule, DialogModule, DropdownModule, FileUploadModule, InputTextareaModule, PanelModule, ProgressBarModule, RadioButtonModule, ScrollPanelModule, SidebarModule, StepsModule, TabViewModule, TooltipModule, TreeModule} from 'primeng/primeng';
import {PaginationModule} from '../../common/components/pagination/pagination.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {QuestionTemplateModule} from '../../common/components/question-template/question-template.module';
import {TopicModule} from '../../common/components/topic/topic.module';
import {BasicDialogModule} from '../../common/components/basic-dialog/basic-dialog.module';
import { ExternalComponent } from './emergency-org/external/external.component';


@NgModule({
  declarations: [
    EmergencyComponent,
    EmergencySituationComponent,
    EmergencyOrgComponent,
    AgencyComponent,
    TeamComponent,
    EmergencyPlanComponent,
    EmergencyRecordComponent,
    EmergencyDrillComponent,
    ExternalComponent,
  ],
  imports: [
    CommonModule,
    EmergencyRoutingModule,
    InputTextModule,
    ButtonModule,
    BasicTableModule,
    ScrollPanelModule,
    PaginationModule,
    StepsModule,
    TabViewModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    DialogModule,
    TreeModule,
    TableModule,
    RadioButtonModule,
    InputTextareaModule,
    FileUploadModule,
    QuestionTemplateModule,
    CheckboxModule,
    TooltipModule,
    CardModule,
    ProgressBarModule,
    TopicModule,
    ConfirmDialogModule,
    SidebarModule,
    BasicDialogModule,
    ReactiveFormsModule,
    PanelModule
  ]
})
export class EmergencyModule { }
