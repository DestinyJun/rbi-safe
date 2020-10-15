import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutionRoutingModule } from './institution-routing.module';
import { InstitutionComponent } from './institution.component';
import { InstitutionMainComponent } from './institution-main/institution-main.component';
import { InstitutionManageComponent } from './institution-manage/institution-manage.component';
import { InstitutionRecordComponent } from './institution-record/institution-record.component';
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
import {EchartsBarModule} from '../../common/components/echarts-bar/echarts-bar.module';


@NgModule({
  declarations: [
    InstitutionComponent,
    InstitutionMainComponent,
    InstitutionManageComponent,
    InstitutionRecordComponent
  ],
  imports: [
    CommonModule,
    InstitutionRoutingModule,
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
    EchartsBarModule,
  ]
})
export class InstitutionModule { }
