import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { TarifasRoutingModule } from './tarifas-routing.module';
import { TarifasComponent } from './tarifas.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [TarifasComponent],
  imports: [
    CommonModule,
    TarifasRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TarifasModule { }
