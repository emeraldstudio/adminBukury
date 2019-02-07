import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UbicacionesRoutingModule } from './ubicaciones-routing.module';
import { UbicacionesComponent } from './ubicaciones.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [UbicacionesComponent],
  imports: [
    CommonModule,
    UbicacionesRoutingModule,
    PageHeaderModule
  ]
})
export class UbicacionesModule { }
