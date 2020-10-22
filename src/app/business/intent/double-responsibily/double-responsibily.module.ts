import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoubleResponsibilyRoutingModule } from './double-responsibily-routing.module';
import { DoubleResponsibilyComponent } from './double-responsibily/double-responsibily.component';
import { DrInsitutionComponent } from './dr-insitution/dr-insitution.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  ButtonModule,
  DialogModule,
  DropdownModule,
  InputTextModule,
  ScrollPanelModule,
  TreeModule
} from 'primeng/primeng';
import { ListCustomizationComponent } from './list-customization/list-customization.component';
import { EmployeeListFileComponent } from './employee-list-file/employee-list-file.component';
import {CheckListMakeComponent} from './check-list-make/check-list-make.component';
import {MyChecklistComponent} from './check-list-make/my-checklist/my-checklist.component';
import {PendingChecklistComponent} from './check-list-make/pending-checklist/pending-checklist.component';
import {TableModule} from 'primeng/table';
import { MyChecklistAddComponent } from './check-list-make/my-checklist/my-checklist-add/my-checklist-add.component';
import { PendingCheckDetailComponent } from './check-list-make/pending-checklist/pending-check-detail/pending-check-detail.component';
import { MyCheckListDetailComponent } from './check-list-make/my-checklist/my-check-list-detail/my-check-list-detail.component';
import {PaginationModule} from '../../../common/components/pagination/pagination.module';
import {BasicTableModule} from '../../../common/components/basic-table/basic-table.module';


@NgModule({
  declarations: [
    DoubleResponsibilyComponent,
    DrInsitutionComponent,
    ListCustomizationComponent,
    EmployeeListFileComponent,
    CheckListMakeComponent,
    MyChecklistComponent,
    PendingChecklistComponent,
    MyChecklistAddComponent,
    PendingCheckDetailComponent,
    MyCheckListDetailComponent,
  ],
    imports: [
        CommonModule,
        DoubleResponsibilyRoutingModule,
        FormsModule,
        ScrollPanelModule,
        BasicTableModule,
        PaginationModule,
        ButtonModule,
        DropdownModule,
        InputTextModule,
        DialogModule,
        ReactiveFormsModule,
        TreeModule,
        TableModule
    ]
})
export class DoubleResponsibilyModule { }
