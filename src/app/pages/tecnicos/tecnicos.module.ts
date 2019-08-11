import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { SharedModule } from '../../shared/shared.module';
import { TecnicosComponent } from './tecnicos.component';
import { ScheduleDialogComponent } from './schedule-dialog/schedule-dialog.component';
import {MatCardModule, MatIconModule, MatSelectModule, MatFormFieldModule} from '@angular/material';
export const routes = [
  { path: '', component: TecnicosComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    SharedModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  declarations: [
    TecnicosComponent, 
    ScheduleDialogComponent
  ],
  entryComponents: [
    ScheduleDialogComponent
  ]
})
export class TecnicosModule { }