import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InstitutionComponent} from './institution.component';
import {InstitutionMainComponent} from './institution-main/institution-main.component';
import {InstitutionManageComponent} from './institution-manage/institution-manage.component';
import {InstitutionRecordComponent} from './institution-record/institution-record.component';


const routes: Routes = [
  {
    path: '',
    component: InstitutionComponent,
    children: [
      {path: '', redirectTo: 'inmain', pathMatch: 'full'},
      {path: 'inmain', component: InstitutionMainComponent},
      {path: 'inmanage', component: InstitutionManageComponent},
      {path: 'inrecord', component: InstitutionRecordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutionRoutingModule { }
