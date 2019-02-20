import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2FileInputModule } from 'ng2-file-input'; // <-- import the module
import {MatSelectModule} from '@angular/material/select';
import { CategoriasRoutingModule } from './categorias-routing.module';
import { CategoriasComponent } from './categorias.component';
import { PageHeaderModule } from '../../shared';
@NgModule({
  declarations: [CategoriasComponent],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    PageHeaderModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2FileInputModule.forRoot(),
    MatSelectModule
  ]
})
export class CategoriasModule { }
