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
import { CotizacionesFormComponent } from './cotizaciones/cotizaciones-form/cotizaciones-form.component';
import { CotizacionesListComponent } from './cotizaciones/cotizaciones-list/cotizaciones-list.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';
import {TableModule} from 'primeng/table';
import { NgxSmartModalModule } from 'ngx-smart-modal';

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
    PipesModule,
    TableModule,
    NgxSmartModalModule.forRoot()
    
  ],
  declarations: [
    ProcesosComponent,
    CotizacionesComponent,
    OrdenTrabajoComponent,
    CotizacionesFormComponent,
    CotizacionesListComponent
  ]
})
export class ProcesosModule { }