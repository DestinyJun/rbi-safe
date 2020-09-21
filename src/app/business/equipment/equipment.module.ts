import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipmentRoutingModule } from './equipment-routing.module';
import {PaginationModule} from '../../common/components/pagination/pagination.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {
  CalendarModule,
  CheckboxModule,
  DialogModule,
  DropdownModule,
  FileUploadModule,
  InputTextareaModule,
  RadioButtonModule,
  ScrollPanelModule,
  StepsModule,
  TabViewModule, TooltipModule,
  TreeModule, CardModule, ProgressBarModule, ConfirmDialogModule, SidebarModule, PanelModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {QuestionTemplateModule} from '../../common/components/question-template/question-template.module';
import {TopicModule} from '../../common/components/topic/topic.module';
import {BasicDialogModule} from '../../common/components/basic-dialog/basic-dialog.module';
import { EquipmentComponent } from './equipment.component';
import { EquipmentSpecialComponent } from './equipment-special/equipment-special.component';
import { EquipmentSafeComponent } from './equipment-safe/equipment-safe.component';
import { EquipmentOtherComponent } from './equipment-other/equipment-other.component';

@NgModule({
  declarations: [
    EquipmentComponent,
    EquipmentSpecialComponent,
    EquipmentSafeComponent,
    EquipmentOtherComponent
  ],
  imports: [
    CommonModule,
    EquipmentRoutingModule,
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
  ],
  providers: []
})
export class EquipmentModule {
}
