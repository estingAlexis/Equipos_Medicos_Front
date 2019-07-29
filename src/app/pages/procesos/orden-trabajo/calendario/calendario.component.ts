import { id } from '@swimlane/ngx-charts/release/utils';
import { AppService } from 'src/app/services/app.service';
import { Component, OnInit, Input } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent } from 'angular-calendar';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { CalendarioDialogComponent } from './calendario-dialog/calendario-dialog.component';
import { Subject } from 'rxjs/Subject';
import { blockTransition } from 'src/app/theme/utils/app-animation';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  animations: [ blockTransition ],
  styleUrls: ['./calendario.component.scss'],
  host: {
    '[@blockTransition]': ''
  }
})
export class CalendarioComponent implements OnInit {

  public form:FormGroup;

  @Input() cotizacion: any;
  @Input() cotizacionDetalles: any = new Array();
  cotizacionDetallesSeleccionados : any = new Array();
   
  public tecnico; any;
  public tecnicos : any = [];
  public date;
  //MENSAJES

  error_instrumento_lengh : any = {type: 'error',title: 'No ha seleccionado ningún instrumento'};
  error_form : any = {type: 'error',title: 'Revise el formulario'};

  public Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

  events: CalendarEvent[] = new Array();

  view: string = 'month';
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  actions: CalendarEventAction[] = [{
      label: '<i class="material-icons icon-sm white">remove_red_eye</i>',
      onClick: ({event}: {event: CalendarEvent}): void => {
          this.openScheduleDialog(event);
      }
  }];

  refresh: Subject<any> = new Subject();

  public settings: Settings;
  constructor(public appSettings:AppSettings, 
              public dialog: MatDialog, 
              public snackBar: MatSnackBar,
              public formBuilder: FormBuilder,
              private service:AppService){
      this.settings = this.appSettings.settings; 
      this.form = this.formBuilder.group({ 
        'responsable': [ null, Validators.compose([Validators.required,])],            
        'fecha': ['',  Validators.compose([Validators.required,])], 
        'isEdit' : false
      });
  }

  ngOnInit() {
    this.getTecnicos();
  }

  public getTecnicos() {
    this.service.get('tecnicos/list').subscribe(
        data => {
          this.tecnicos = data;
          console.log(data)
        },
        error => {
          console.log(error); 
        }
    );
/*     for (let index = 0; index < this.data.length; index++) {
      let json = {
        "nombre": this.data.nombre,
        "value": this.data.idTecnico  
      }
      this.tecnicos.append(json);
     }
     console.log(this.tecnicos); */
    }

  agregarMantenimiento(){
    if(this.cotizacionDetallesSeleccionados.length > 0){
      if(this.form.valid){
          var co = this.cotizacionDetallesSeleccionados;

          var f = this.cotizacionDetallesSeleccionados.length - 1;
          let title = '';
          if(co.length == 1){title = 'Mantenimiento del equipo ' + co[0].fkEquipos.nombre+'('+co[0].fkEquipos.referencia+')'}  
          if(co.length > 1){title = 'Mantenimineto de '+co.length+' Equipos, desde '+co[0].fkEquipos.nombre+'('+co[0].fkEquipos.referencia+') hasta '+ co[f].fkEquipos.nombre+'('+co[f].fkEquipos.referencia+')' }

          let tecnico : any;
          for (let i = 0; i < this.tecnicos.length; i++) {
            if(this.tecnicos[i].value === this.form.controls['responsable'].value){
              tecnico = this.tecnicos[i];
              this.tecnicos.splice(i,1);
            }
          }
          let coDetalles: any = this.cotizacionDetallesSeleccionados;
          for (let i = 0; i < this.cotizacionDetallesSeleccionados.length; i++) {
            for (let e = 0; e < this.cotizacionDetalles.length; e++) {
                  if(this.cotizacionDetallesSeleccionados[i].idCotizDeta == this.cotizacionDetalles[e].idCotizDeta){
                    this.cotizacionDetalles.splice(e,1);
                  }
            }
          }

          this.cotizacionDetallesSeleccionados = [];
          
          this.form.controls['responsable'].setValue(' '); 
          //this.form.controls['fecha'].setValue(' ');
      

          let data = {
            start: new Date(this.form.controls['fecha'].value),
            title: title,
            tecnico: tecnico,
            CoDetalle: coDetalles,
            color: colors.yellow,
            actions: this.actions
          }

          this.events.push(data);
          this.refresh.next();
          this.snackBar.open('Mantenimiento agregado satisfactoriamente!', null, {
            duration: 2500
        });



      }else{
        this.Toast.fire(this.error_form);
      }
    }else{
      this.Toast.fire(this.error_instrumento_lengh);
    }
  }



  isChecked(event, CoDetalle){
    switch (event.checked) {
      case true:
          this.cotizacionDetallesSeleccionados.push(CoDetalle);
          console.log(this.cotizacionDetallesSeleccionados);
        break;
      case false:
          for (let i = 0; i < this.cotizacionDetallesSeleccionados.length; i++) {
              if(this.cotizacionDetallesSeleccionados[i].idCotizDeta === CoDetalle.idCotizDeta){this.cotizacionDetallesSeleccionados.splice(i,1)}
          }
        break;
    }
  }

  dayClicked({date, events}: {date: Date, events: CalendarEvent[]}): void {    
    console.log(date);
    console.log(events);

    if (isSameMonth(date, this.viewDate)) {
      if ((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) || events.length === 0) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

  openScheduleDialog(event){
    let dialogRef = this.dialog.open(CalendarioDialogComponent, {
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(!result.isEdit){
          result.color = colors.blue;
          result.actions = this.actions;
          this.events.push(result);
          this.refresh.next();
        }else{
          //implement edit here
        }
      }
    });
  }

}