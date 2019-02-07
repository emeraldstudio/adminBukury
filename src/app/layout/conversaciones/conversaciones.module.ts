import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversacionesRoutingModule } from './conversaciones-routing.module';
import { ConversacionesComponent } from './conversaciones.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [ConversacionesComponent],
  imports: [
    CommonModule,
    ConversacionesRoutingModule,
    PageHeaderModule
  ]
})
export class ConversacionesModule { }
