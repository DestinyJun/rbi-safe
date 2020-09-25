import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccidentRoutingModule } from './accident-routing.module';
import { AccidentComponent } from './accident.component';
import { AccidentSituationComponent } from './accident-situation/accident-situation.component';
import { AccidentRecordComponent } from './accident-record/accident-record.component';
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
    AccidentComponent,
    AccidentSituationComponent,
    AccidentRecordComponent
  ],
  imports: [
    CommonModule,
    AccidentRoutingModule,
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
export class AccidentModule { }
