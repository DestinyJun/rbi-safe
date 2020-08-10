import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoticeComponent } from './notice.component';
import {ButtonModule, DialogModule, ScrollPanelModule} from 'primeng/primeng';



@NgModule({
    declarations: [NoticeComponent],
    exports: [
        NoticeComponent
    ],
  imports: [
    CommonModule,
    ScrollPanelModule,
    DialogModule,
    ButtonModule
  ]
})
export class NoticeModule { }
