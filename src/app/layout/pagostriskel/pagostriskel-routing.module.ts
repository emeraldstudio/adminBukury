import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagostriskelComponent } from './pagostriskel.component';

const routes: Routes = [
	{
        path: '',
        component: PagostriskelComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagostriskelRoutingModule { }
