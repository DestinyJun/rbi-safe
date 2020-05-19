import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StDemandRoutingModule } from './st-demand-routing.module';
import { DemandReportComponent } from './demand-report/demand-report.component';
import {StDemandComponent} from './st-demand.component';
import { DemandReviewComponent } from './demand-review/demand-review.component';
import { DemandPrincipalComponent } from './demand-principal/demand-principal.component';
import { DemandRecordComponent } from './demand-record/demand-record.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {PaginationModule} from '../../../common/components/pagination/pagination.module';
import {BasicTableModule} from '../../../common/components/basic-table/basic-table.module';


@NgModule({
  declarations: [
    DemandReportComponent,
    StDemandComponent,
    DemandReviewComponent,
    DemandPrincipalComponent,
    DemandRecordComponent,
  ],
  imports: [
    CommonModule,
    StDemandRoutingModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    PaginationModule,
    BasicTableModule
  ]
})
export class StDemandModule { }
