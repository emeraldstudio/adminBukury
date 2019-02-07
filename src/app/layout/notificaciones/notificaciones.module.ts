import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificacionesRoutingModule } from './notificaciones-routing.module';
import { NotificacionesComponent } from './notificaciones.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [NotificacionesComponent],
  imports: [
    CommonModule,
    NotificacionesRoutingModule,
    PageHeaderModule
  ]
})
export class NotificacionesModule { }
