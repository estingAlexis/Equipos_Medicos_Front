import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill'
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ProcesosComponent } from './procesos.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';

export const routes = [
  { path: '', component: ProcesosComponent, pathMatch: 'full' },
  { path: 'cotizaciones', component: CotizacionesComponent },
  { path: 'order-trabajo', component: OrdenTrabajoComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    QuillModule,
    SharedModule,
    PipesModule
  ],
  declarations: [
    ProcesosComponent,
    CotizacionesComponent,
    OrdenTrabajoComponent
  ]
})
export class ProcesosModule { }