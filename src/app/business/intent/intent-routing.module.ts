import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {IntentStatusComponent} from './intent-status/intent-status.component';
import {IntentAgencyComponent} from './intent-agency/intent-agency.component';
import {IntentAimsComponent} from './intent-aims/intent-aims.component';
import {IntentInvestComponent} from './intent-invest/intent-invest.component';
import {IntentCultureComponent} from './intent-culture/intent-culture.component';
import {IntentComponent} from './intent.component';


const routes: Routes = [
  {
    path: '',
    component: IntentComponent,
    children: [
      {path: '', redirectTo: 'mains', pathMatch: 'full'},
      {path: 'mains', component: IntentStatusComponent},
      {path: 'agency', component: IntentAgencyComponent},
      {path: 'aims', component: IntentAimsComponent},
      {
        path: 'double',
        loadChildren: () => import('./double-responsibily/double-responsibily.module').then(m => m.DoubleResponsibilyModule),
        data: {preload: true}
      },
      {path: 'invest', component: IntentInvestComponent},
      {path: 'culture', component: IntentCultureComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntentRoutingModule { }
