import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsBarRiskComponent } from './echarts-bar-risk/echarts-bar-risk.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { EchartsBarTroubleComponent } from './echarts-bar-trouble/echarts-bar-trouble.component';
import { EchartsBarDoubleComponent } from './echarts-bar-double/echarts-bar-double.component';



@NgModule({
  declarations: [EchartsBarRiskComponent, EchartsBarTroubleComponent, EchartsBarDoubleComponent],
  exports: [
    EchartsBarRiskComponent,
    EchartsBarTroubleComponent,
    EchartsBarDoubleComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule
  ]
})
export class EchartsBarModule { }
