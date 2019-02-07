import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServicioRoutingModule } from './servicio-routing.module';
import { ServicioComponent } from './servicio.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [ServicioComponent],
  imports: [
    CommonModule,
    ServicioRoutingModule,
    PageHeaderModule,
    NgbModule
  ]
})
export class ServicioModule { }
