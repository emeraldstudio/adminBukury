import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FileInputModule } from 'ng2-file-input'; // <-- import the module
import {MatSelectModule} from '@angular/material/select';
import { PagostriskelRoutingModule } from './pagostriskel-routing.module';
import { PagostriskelComponent } from './pagostriskel.component';
import { PageHeaderModule } from '../../shared';
@NgModule({
  declarations: [PagostriskelComponent],
  imports: [
    CommonModule,
    PagostriskelRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FileInputModule.forRoot(),
    MatSelectModule
  ]
})
export class PagostriskelModule { }
