import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import {TimeAgoPipe} from 'time-ago-pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FileInputModule } from 'ng2-file-input'; // <-- import the module
import {MatSelectModule} from '@angular/material/select';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
  declarations: [CategoriaComponent],
  imports: [
    CommonModule,
    CategoriaRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FileInputModule.forRoot(),
    MatSelectModule
  ]
})
export class CategoriaModule { }
