import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EquipmentComponent} from './equipment.component';
import {EquipmentSpecialComponent} from './equipment-special/equipment-special.component';
import {EquipmentSafeComponent} from './equipment-safe/equipment-safe.component';
import {EquipmentOtherComponent} from './equipment-other/equipment-other.component';
import {EquipmentMainComponent} from './equipment-main/equipment-main.component';

const routes: Routes = [
  {
    path: '',
    component: EquipmentComponent,
    children: [
      {path: '', redirectTo: 'equipmentMain', pathMatch: 'full'},
      {path: 'equipmentMain', component: EquipmentMainComponent},
      {path: 'equipmentSafe', component: EquipmentSafeComponent},
      {path: 'special', component: EquipmentSpecialComponent},
      {path: 'other', component: EquipmentOtherComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EquipmentRoutingModule {
}
