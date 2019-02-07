import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import {TimeAgoPipe} from 'time-ago-pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Ng2FileInputModule } from 'ng2-file-input'; // <-- import the module
import {MatSelectModule} from '@angular/material/select';

import { ConductorRoutingModule } from './conductor-routing.module';
import { ConductorComponent } from './conductor.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [ConductorComponent],
  imports: [
    CommonModule,
    ConductorRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FileInputModule.forRoot(),
    MatSelectModule
  ]
})
export class ConductorModule { }
