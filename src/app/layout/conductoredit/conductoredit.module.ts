import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ConductoreditRoutingModule } from './conductoredit-routing.module';
import { ConductoreditComponent } from './conductoredit.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [ConductoreditComponent,],
  imports: [
    CommonModule,
    ConductoreditRoutingModule,
    PageHeaderModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ConductoreditModule { }
