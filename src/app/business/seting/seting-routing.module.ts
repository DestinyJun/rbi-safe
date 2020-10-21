import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SetingComponent} from './seting/seting.component';
import {UserManagerComponent} from './user-manager/user-manager.component';
import {RolesManagerComponent} from './roles-manager/roles-manager.component';
import {LimitsManagerComponent} from './limits-manager/limits-manager.component';
import {OrganizationManagerComponent} from './organization-manager/organization-manager.component';
import {PersonnelManagerComponent} from './personnel-manager/personnel-manager.component';
import {MobilAppManagerComponent} from './mobil-app-manager/mobil-app-manager.component';
import {SetingSpiComponent} from './seting-spi/seting-spi.component';


const routes: Routes = [
  {
    path: '',
    component: SetingComponent,
    children: [
      {path: 'user', component: UserManagerComponent},
      {path: 'role', component: RolesManagerComponent},
      {path: 'limit', component: LimitsManagerComponent},
      {path: 'orgazition', component: OrganizationManagerComponent},
      {path: 'personnel', component: PersonnelManagerComponent},
      {path: 'mobil', component: MobilAppManagerComponent},
      {path: 'spi', component: SetingSpiComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetingRoutingModule { }
