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
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {PaginationModule} from '../../common/components/pagination/pagination.module';


@NgModule({
  declarations: [
    DoubleResponsibilyComponent,
    DrInsitutionComponent,
    ListCustomizationComponent,
    EmployeeListFileComponent
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
    TreeModule
  ]
})
export class DoubleResponsibilyModule { }
