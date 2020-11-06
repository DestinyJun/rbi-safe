import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfessionHealthComponent} from './profession-health/profession-health.component';
import {PhInstitutionComponent} from './ph-institution/ph-institution.component';
import {PhManagerComponent} from './ph-manager/ph-manager.component';
import {PhArchiveComponent} from './ph-archive/ph-archive.component';


const routes: Routes = [
 {path: '', component: ProfessionHealthComponent, children: [
     // {path: 'phinstitution', component: PhInstitutionComponent},
     {path: 'phmanager', component: PhManagerComponent},
     {path: 'pharchive', component: PhArchiveComponent},
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionHealthRoutingModule { }
