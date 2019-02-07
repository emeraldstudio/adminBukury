import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'conductores', loadChildren: './conductores/conductores.module#ConductoresModule' },
            { path: 'categorias', loadChildren: './categorias/categorias.module#CategoriasModule' },
            { path: 'ubicaciones', loadChildren: './ubicaciones/ubicaciones.module#UbicacionesModule' },
            { path: 'conductor', loadChildren: './conductor/conductor.module#ConductorModule' },
            { path: 'conductor/:key', loadChildren: './conductor/conductor.module#ConductorModule' },
            { path: 'conductoredit/:key', loadChildren: './conductoredit/conductoredit.module#ConductoreditModule' },
            { path: 'servicios', loadChildren: './servicios/servicios.module#ServiciosModule' },
            { path: 'servicio', loadChildren: './servicio/servicio.module#ServicioModule' },
            { path: 'servicio/:key', loadChildren: './servicio/servicio.module#ServicioModule' },
            { path: 'usuarios', loadChildren: './usuarios/usuarios.module#UsuariosModule' },
            { path: 'tarifas', loadChildren: './tarifas/tarifas.module#TarifasModule' },
            { path: 'conversaciones', loadChildren: './conversaciones/conversaciones.module#ConversacionesModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'usuario', loadChildren: './usuario/usuario.module#UsuarioModule' },
            { path: 'usuario/:key', loadChildren: './usuario/usuario.module#UsuarioModule' },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
