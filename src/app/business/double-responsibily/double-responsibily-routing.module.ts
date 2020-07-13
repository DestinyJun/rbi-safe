import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoubleResponsibilyComponent} from './double-responsibily/double-responsibily.component';
import {DrInsitutionComponent} from './dr-insitution/dr-insitution.component';
import {ListCustomizationComponent} from './list-customization/list-customization.component';
import {EmployeeListFileComponent} from "./employee-list-file/employee-list-file.component";


const routes: Routes = [
 {path: '', component: DoubleResponsibilyComponent, children: [
     {path: 'insitution', component: DrInsitutionComponent},
     {path: 'list-customization', component: ListCustomizationComponent},
     {path: 'employee-list-file', component: EmployeeListFileComponent},
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoubleResponsibilyRoutingModule { }
