import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {PreloadSelectedModules} from './preload/preload.module';
import {LoginGuard} from './common/guard/login.guard';
import {DailyOperationReportingComponent} from './business/general-info/daily-operation-reporting/daily-operation-reporting.component';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', loadChildren: './home/home.module#HomeModule', data: {preload: true}, canActivate: [LoginGuard]},
  {path: 'pdf-view', loadChildren: () => import('./common/components/pdf-view/pdf-view.module').then(m => m.PdfViewModule), data: {preload: true}},
  {path: 'operation-reporting', component: DailyOperationReportingComponent},
  {path: 'error', component: ErrorComponent},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadSelectedModules})],
  exports: [RouterModule],
  providers: [PreloadSelectedModules]
})
export class AppRoutingModule { }
