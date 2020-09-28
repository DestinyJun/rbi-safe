import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntentRoutingModule } from './intent-routing.module';
import { IntentComponent } from './intent.component';
import { IntentStatusComponent } from './intent-status/intent-status.component';
import { IntentAgencyComponent } from './intent-agency/intent-agency.component';
import { IntentAimsComponent } from './intent-aims/intent-aims.component';
import { IntentInvestComponent } from './intent-invest/intent-invest.component';
import { IntentCultureComponent } from './intent-culture/intent-culture.component';
import { ChecklistComponent } from './intent-aims/checklist/checklist.component';
import { LedgerComponent } from './intent-aims/ledger/ledger.component';
import { FrameComponent } from './intent-agency/frame/frame.component';
import { DetailComponent } from './intent-agency/detail/detail.component';
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


@NgModule({
  declarations: [
    IntentComponent,
    IntentStatusComponent,
    IntentAgencyComponent,
    IntentAimsComponent,
    IntentInvestComponent,
    IntentCultureComponent,
    ChecklistComponent,
    LedgerComponent,
    FrameComponent,
    DetailComponent
  ],
  imports: [
    CommonModule,
    IntentRoutingModule,
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
    PanelModule,
  ]
})
export class IntentModule { }
