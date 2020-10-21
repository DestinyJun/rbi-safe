import {APP_INITIALIZER, NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';

import {SetingRoutingModule} from './seting-routing.module';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {SetingComponent} from './seting/seting.component';
import {OrganizationManagerComponent} from './organization-manager/organization-manager.component';
import {RolesManagerComponent} from './roles-manager/roles-manager.component';
import {PersonnelManagerComponent} from './personnel-manager/personnel-manager.component';
import {LimitsManagerComponent} from './limits-manager/limits-manager.component';
import {PaginationModule} from '../../common/components/pagination/pagination.module';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {BasicTableModule} from '../../common/components/basic-table/basic-table.module';
import {DropdownModule} from 'primeng/dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {BasicDialogModule} from '../../common/components/basic-dialog/basic-dialog.module';
import {DialogModule} from 'primeng/dialog';
import {CalendarModule, FileUploadModule, InputTextareaModule, MessageModule, MessagesModule, RadioButtonModule, ScrollPanelModule, TooltipModule, TreeModule, TreeTableModule} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {AppConfig, init_app} from '../../common/services/app.config';
import {MobilAppManagerComponent} from './mobil-app-manager/mobil-app-manager.component';
import { SetingSpiComponent } from './seting-spi/seting-spi.component';

@NgModule({
  declarations: [
    UserManagerComponent,
    SetingComponent,
    OrganizationManagerComponent,
    RolesManagerComponent,
    PersonnelManagerComponent,
    LimitsManagerComponent,
    MobilAppManagerComponent,
    SetingSpiComponent
  ],
  imports: [
    CommonModule,
    SetingRoutingModule,
    PaginationModule,
    InputTextModule,
    ButtonModule,
    BasicTableModule,
    DropdownModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    BasicDialogModule,
    DialogModule,
    ReactiveFormsModule,
    RadioButtonModule,
    CalendarModule,
    InputTextareaModule,
    TreeModule,
    ScrollPanelModule,
    FileUploadModule,
    MessagesModule,
    MessageModule,
    TableModule,
    TooltipModule,
    TreeTableModule
  ],
  providers: [
    DatePipe,
    AppConfig,
    {provide: APP_INITIALIZER, useFactory: init_app, deps: [AppConfig], multi: true}
  ]
})
export class SetingModule {}
