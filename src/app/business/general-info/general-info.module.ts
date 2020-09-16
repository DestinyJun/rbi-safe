import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GeneralInfoRoutingModule} from './general-info-routing.module';
import {GeneralInfoComponent} from './general-info/general-info.component';
import {GiBulletinBoardComponent} from './gi-bulletin-board/gi-bulletin-board.component';
import {GiInfoReleaseComponent} from './gi-info-release/gi-info-release.component';
import {NgxValidatorModule} from '@why520crazy/ngx-validator';
import {
    ButtonModule,
    CalendarModule, CheckboxModule,
    DialogModule,
    InputTextareaModule,
    InputTextModule,
    ScrollPanelModule
} from 'primeng/primeng';
import {PaginationModule} from '../../common/components/pagination/pagination.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DailyOperationReportingComponent} from './daily-operation-reporting/daily-operation-reporting.component';


@NgModule({
  declarations: [
    GeneralInfoComponent,
    GiBulletinBoardComponent,
    GiInfoReleaseComponent,
    DailyOperationReportingComponent
  ],
    imports: [
        CommonModule,
        GeneralInfoRoutingModule,
        NgxValidatorModule,
        ScrollPanelModule,
        PaginationModule,
        InputTextModule,
        ButtonModule,
        DialogModule,
        InputTextareaModule,
        ReactiveFormsModule,
        CalendarModule,
        CheckboxModule
    ],
  exports: [
    DailyOperationReportingComponent
  ]
})
export class GeneralInfoModule {
}
