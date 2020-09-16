import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DoubleResponsibilyComponent} from './double-responsibily/double-responsibily.component';
import {DrInsitutionComponent} from './dr-insitution/dr-insitution.component';
import {ListCustomizationComponent} from './list-customization/list-customization.component';
import {EmployeeListFileComponent} from './employee-list-file/employee-list-file.component';
import {CheckListMakeComponent} from './check-list-make/check-list-make.component';
import {MyChecklistAddComponent} from './check-list-make/my-checklist/my-checklist-add/my-checklist-add.component';
import {MyCheckListDetailComponent} from './check-list-make/my-checklist/my-check-list-detail/my-check-list-detail.component';


const routes: Routes = [
 {path: '', component: DoubleResponsibilyComponent, children: [
     {path: 'insitution', component: DrInsitutionComponent},
     {path: 'list-customization', component: ListCustomizationComponent},
     {path: 'employee-list-file', component: EmployeeListFileComponent},
     {path: 'checklist-make', component: CheckListMakeComponent},
     {path: 'my-checklist/detail', component: MyCheckListDetailComponent},
     {path: 'my-checklist/add', component: MyChecklistAddComponent},
     {path: 'checklist-make', component: CheckListMakeComponent},
   ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoubleResponsibilyRoutingModule { }
