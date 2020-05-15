import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import {PaginatorModule} from 'primeng/primeng';



@NgModule({
  declarations: [PaginationComponent],
  exports: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    PaginatorModule
  ]
})
export class PaginationModule { }
