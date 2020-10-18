import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsBarRiskComponent } from './echarts-bar-risk/echarts-bar-risk.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { EchartsBarTroubleComponent } from './echarts-bar-trouble/echarts-bar-trouble.component';
import { EchartsBarDoubleComponent } from './echarts-bar-double/echarts-bar-double.component';
import { EchartsBarStackComponent } from './echarts-bar-stack/echarts-bar-stack.component';
import { EchartsBarLineComponent } from './echarts-bar-line/echarts-bar-line.component';



@NgModule({
  declarations: [
    EchartsBarRiskComponent,
    EchartsBarTroubleComponent,
    EchartsBarDoubleComponent,
    EchartsBarStackComponent,
    EchartsBarLineComponent
  ],
  exports: [
    EchartsBarRiskComponent,
    EchartsBarTroubleComponent,
    EchartsBarDoubleComponent,
    EchartsBarStackComponent,
    EchartsBarLineComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule
  ]
})
export class EchartsBarModule { }
