import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MonitorComponent} from './monitor.component';
import {MonitorComprehensiveComponent} from './monitor-comprehensive/monitor-comprehensive.component';
import {MonitorSingleComponent} from './monitor-single/monitor-single.component';


const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {path: '', redirectTo: 'monitorComprehensive', pathMatch: 'full'},
      {path: 'monitorSingle', component: MonitorSingleComponent},
      {path: 'monitorComprehensive', component: MonitorComprehensiveComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitorRoutingModule { }
