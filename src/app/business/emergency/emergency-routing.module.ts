import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmergencyComponent} from './emergency.component';
import {EmergencyOrgComponent} from './emergency-org/emergency-org.component';
import {EmergencyDrillComponent} from './emergency-drill/emergency-drill.component';
import {EmergencyPlanComponent} from './emergency-plan/emergency-plan.component';
import {EmergencyRecordComponent} from './emergency-record/emergency-record.component';
import {EmergencySituationComponent} from './emergency-situation/emergency-situation.component';


const routes: Routes = [
  {
    path: '',
    component: EmergencyComponent,
    children: [
      {path: '', redirectTo: 'situation', pathMatch: 'full'},
      {path: 'org', component: EmergencyOrgComponent},
      {path: 'drill', component: EmergencyDrillComponent},
      {path: 'plan', component: EmergencyPlanComponent},
      {path: 'record', component: EmergencyRecordComponent},
      {path: 'situation', component: EmergencySituationComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmergencyRoutingModule { }
