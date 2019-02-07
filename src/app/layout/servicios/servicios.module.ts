import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiciosRoutingModule } from './servicios-routing.module';
import { ServiciosComponent } from './servicios.component';
import { PageHeaderModule } from '../../shared';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
@NgModule({
  declarations: [ServiciosComponent],
  imports: [
    CommonModule,
    ServiciosRoutingModule,
    PageHeaderModule,
    MatTableModule,
    MatSortModule
  ]
})
export class ServiciosModule { }
