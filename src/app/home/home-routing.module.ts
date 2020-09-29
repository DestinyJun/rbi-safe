import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'main',
        loadChildren: () => import('../business/main/main.module').then(m => m.MainModule)
      },
      {
        path: 'strain',
        loadChildren: () => import('../business/safetrain/safetrain.module').then(m => m.SafetrainModule),
        data: {preload: true}
      },
      {
        path: 'seting',
        loadChildren: () => import('../business/seting/seting.module').then(m => m.SetingModule),
        data: {preload: true}
      },
      {
        path: 'system',
        loadChildren: () => import('../business/system/system.module').then(m => m.SystemModule),
        data: {preload: true}
      },
      {
        path: 'trouble',
        loadChildren: () => import('../business/hidden-trouble/hidden-trouble.module').then(m => m.HiddenTroubleModule),
        data: {preload: true}
      },
      {
        path: 'risk',
        loadChildren: () => import('../business/bigrisk/bigrisk.module').then(m => m.BigriskModule),
        data: {preload: true}
      },
      {
        path: 'strisk',
        loadChildren: () => import('../business/security-risk/security-risk.module').then(m => m.SecurityRiskModule),
        data: {preload: true}
      },
      {
        path: 'health',
        loadChildren: () => import('../business/profession-health/profession-health.module').then(m => m.ProfessionHealthModule),
        data: {preload: true}
      },
      {
        path: 'genneral',
        loadChildren: () => import('../business/general-info/general-info.module').then(m => m.GeneralInfoModule),
        data: {preload: true}
      },
      {
        path: 'double',
        loadChildren: () => import('../business/double-responsibily/double-responsibily.module').then(m => m.DoubleResponsibilyModule),
        data: {preload: true}
      },
      {
        path: 'equipment',
        loadChildren: () => import('../business/equipment/equipment.module').then(m => m.EquipmentModule),
        data: {preload: true}
      },
      {
        path: 'accident',
        loadChildren: () => import('../business/accident/accident.module').then(m => m.AccidentModule),
        data: {preload: true}
      },
      {
        path: 'intent',
        loadChildren: () => import('../business/intent/intent.module').then(m => m.IntentModule),
        data: {preload: true}
      },
      {
        path: 'emergency',
        loadChildren: () => import('../business/emergency/emergency.module').then(m => m.EmergencyModule),
        data: {preload: true}
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
