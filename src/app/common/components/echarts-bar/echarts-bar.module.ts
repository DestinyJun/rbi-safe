import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { EchartsBarRiskComponent } from './echarts-bar-risk/echarts-bar-risk.component';
import {NgxEchartsModule} from 'ngx-echarts';
import { EchartsBarTroubleComponent } from './echarts-bar-trouble/echarts-bar-trouble.component';
import { EchartsBarDoubleComponent } from './echarts-bar-double/echarts-bar-double.component';
import { EchartsBarStackComponent } from './echarts-bar-stack/echarts-bar-stack.component';
import { EchartsBarLineComponent } from './echarts-bar-line/echarts-bar-line.component';
import { EchartsBarCircleComponent } from './echarts-bar/echarts-bar-circle/echarts-bar-circle.component';
import {EchartsAreaChartComponent} from './echarts-area-chart/echarts-area-chart.component';
import { EchartsLineNormalComponent } from './echarts-line-normal/echarts-line-normal.component';



@NgModule({
  declarations: [
    EchartsBarRiskComponent,
    EchartsBarTroubleComponent,
    EchartsBarDoubleComponent,
    EchartsBarStackComponent,
    EchartsBarLineComponent,
    EchartsBarCircleComponent,
    EchartsAreaChartComponent,
    EchartsLineNormalComponent
  ],
  exports: [
    EchartsBarRiskComponent,
    EchartsBarTroubleComponent,
    EchartsBarDoubleComponent,
    EchartsBarStackComponent,
    EchartsBarLineComponent,
    EchartsBarCircleComponent,
    EchartsAreaChartComponent,
    EchartsLineNormalComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule
  ]
})
export class EchartsBarModule { }
