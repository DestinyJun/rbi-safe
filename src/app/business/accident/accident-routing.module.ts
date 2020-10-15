import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccidentComponent} from './accident.component';
import {AccidentSituationComponent} from './accident-situation/accident-situation.component';
import {AccidentRecordComponent} from './accident-record/accident-record.component';


const routes: Routes = [
  {
    path: '',
    component: AccidentComponent,
    children: [
      {path: '', redirectTo: 'accidentSituation', pathMatch: 'full'},
      {path: 'accidentSituation', component: AccidentSituationComponent},
      {path: 'accidentRecord', component: AccidentRecordComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccidentRoutingModule { }
