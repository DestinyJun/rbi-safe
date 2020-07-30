import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StInstitutionComponent} from './st-institution/st-institution.component';
import {StPlainComponent} from './st-plain/st-plain.component';
import {StContentSetingComponent} from './st-content-seting/st-content-seting.component';
import {SafeTrainComponent} from './safe-train/safe-train.component';
import {PlainEditComponent} from './st-plain/plain-edit/plain-edit.component';
import {PlainListComponent} from './st-plain/plain-list/plain-list.component';
import {StArchivesComponent} from './st-archives/st-archives.component';
import {StMytrainFileComponent} from './st-mytrain-file/st-mytrain-file.component';
import {StOnlineExamComponent} from './st-online-exam/st-online-exam.component';
import {StTakingExamComponent} from './st-online-exam/st-taking-exam/st-taking-exam.component';
import {StExamListComponent} from './st-online-exam/st-exam-list/st-exam-list.component';
import {StStartStudyComponent} from './st-start-study/st-start-study.component';
import {StLearnListComponent} from './st-start-study/st-learn-list/st-learn-list.component';
import {StMyplanDetailComponent} from './st-start-study/st-learn-myplan/st-myplan-detail/st-myplan-detail.component';
import {TaskExamGuard} from '../../common/guard/task-exam.guard';
import {PlanAListComponent} from "./st-plan-a/plan-a-list/plan-a-list.component";
import {PlanAEditComponent} from "./st-plan-a/plan-a-edit/plan-a-edit.component";
import {StPlanAComponent} from "./st-plan-a/st-plan-a.component";


const routes: Routes = [
  {
    path: '', component: SafeTrainComponent,
    children: [
      {path: 'institu', component: StInstitutionComponent, data: {preload: true}},
      {path: 'demand', loadChildren: () => import('./st-demand/st-demand.module').then(m => m.StDemandModule)},
      {path: 'archives', component: StArchivesComponent},
      {
        path: 'plain',
        component: StPlainComponent,
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: PlainListComponent},
          {path: 'edit', component: PlainEditComponent}
        ]
      },
      {
        path: 'plainA',
        component: StPlanAComponent,
        children: [
          {path: '', redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: PlanAListComponent}
        ]
      },
      {path: 'contentset', component: StContentSetingComponent},
      {path: 'mytrainfile', component: StMytrainFileComponent},
      {path: 'exam', component: StOnlineExamComponent, children: [
          {path: '',  redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: StExamListComponent},
          {path: 'tasking', component: StTakingExamComponent, canDeactivate: [TaskExamGuard]},
        ]},
      {path: 'learn', component: StStartStudyComponent, children: [
          {path: '',  redirectTo: 'list', pathMatch: 'full'},
          {path: 'list', component: StLearnListComponent},
          {path: 'detail', component: StMyplanDetailComponent},
        ]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafetrainRoutingModule {
}
