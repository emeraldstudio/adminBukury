import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConductoresRoutingModule } from './conductores-routing.module';
import { ConductoresComponent } from './conductores.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [ConductoresComponent],
  imports: [
    CommonModule,
    ConductoresRoutingModule,
    PageHeaderModule
  ]
})
export class ConductoresModule { }
