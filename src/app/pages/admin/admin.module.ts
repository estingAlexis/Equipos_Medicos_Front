import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { QuillModule } from 'ngx-quill'
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { AdminComponent } from './admin.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';
import { InstrumentosComponent } from './instrumentos/instrumentos.component';
import { EquiposComponent } from './equipos/equipos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { HttpClientModule } from '@angular/common/http';
import { AppService } from 'src/app/app.service';
import { ActividadesTableComponent } from './actividades/actividades-table/actividades-table.component';
import {TableModule} from 'primeng/table';
import {ListComponent} from './actividades/list/list.component';
import { ProcoloslistComponent } from './protocolo/procolos-list/procolos-list.component';
import { ProtocolosTableComponent } from './protocolo/protocolos-table/protocolos-table.component';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import { InstrumentosListComponent } from './instrumentos/instrumentos-list/instrumentos-list.component';
import { InstrumentosTableComponent } from './instrumentos/instrumentos-table/instrumentos-table.component';
import { EquiposListComponent } from './equipos/equipos-list/equipos-list.component';
import { EquiposTableComponent } from './equipos/equipos-table/equipos-table.component';
import { ClientesListComponent } from './clientes/clientes-list/clientes-list.component';
import { ActividadesFormComponent } from './actividades/actividades-form/actividades-form.component';
import { EquiposFormComponent } from './equipos/equipos-form/equipos-form.component';
import {PaginatorModule} from 'primeng/paginator';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import {MatIconModule} from '@angular/material/icon';
import { DropdownModule } from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';

export const routes = [
  { path: '', component: AdminComponent, pathMatch: 'full' },
  { path: 'actividades', component: ActividadesComponent, data: { breadcrumb: 'Actividades' }},
  { path: 'protocolos', component: ProtocoloComponent, data: { breadcrumb: 'Protocolos' }},
  { path: 'instrumentos', component: InstrumentosComponent, data: { breadcrumb: 'Instrumentos' }},
  { path: 'equipos', component: EquiposComponent, data: { breadcrumb: 'Equipos' }},
  { path: 'clientes', component: ClientesComponent, data: { breadcrumb: 'Clientes' }},
  { path: 'form', component: ActividadesFormComponent, data: { breadcrumb: 'Clientes' }}
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
    HttpClientModule,
    TableModule,
    TooltipModule,
    DialogModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    PaginatorModule,
    NgxSmartModalModule,
    MatIconModule,
    DropdownModule,
    InputTextareaModule
  ],
  declarations: [
    AdminComponent,
    ActividadesComponent,
    ProtocoloComponent,
    InstrumentosComponent,
    EquiposComponent,
    ClientesComponent,
    ActividadesTableComponent,
    ListComponent,
    ProcoloslistComponent,
    ProtocolosTableComponent,
    InstrumentosListComponent,
    InstrumentosTableComponent,
    EquiposListComponent,
    EquiposTableComponent,
    ClientesListComponent,
    ActividadesFormComponent,
    EquiposFormComponent
  ],
  providers: [
    AppService
  ]
})
export class AdminModule { }