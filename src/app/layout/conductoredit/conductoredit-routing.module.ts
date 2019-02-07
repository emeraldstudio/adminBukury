import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConductoreditComponent } from './conductoredit.component';

const routes: Routes = [
	{
        path: '',
        component: ConductoreditComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConductoreditRoutingModule { }
