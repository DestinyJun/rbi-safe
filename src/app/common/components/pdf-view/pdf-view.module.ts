import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PdfViewRoutingModule } from './pdf-view-routing.module';
import { PdfViewComponent } from './pdf-view.component';
import {DialogModule} from "primeng/dialog";
import {ScrollPanelModule} from "primeng/primeng";
import {PdfViewerModule} from "ng2-pdf-viewer";


@NgModule({
  declarations: [PdfViewComponent],
    imports: [
        CommonModule,
        PdfViewRoutingModule,
        DialogModule,
        ScrollPanelModule,
        PdfViewerModule
    ]
})
export class PdfViewModule { }
