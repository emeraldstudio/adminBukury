import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConversacionesComponent } from './conversaciones.component';

const routes: Routes = [
	{
        path: '',
        component: ConversacionesComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversacionesRoutingModule { }
