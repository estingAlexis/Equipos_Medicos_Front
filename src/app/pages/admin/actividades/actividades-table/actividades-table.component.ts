import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/models/usuario';
import { ListComponent } from '../list/list.component';
@Component({
  selector: 'app-actividades-table',
  templateUrl: './actividades-table.component.html',
  styleUrls: ['./actividades-table.component.scss']
})
export class ActividadesTableComponent implements OnInit {
  @Input() data:any;
  public actividades: any;
  public protocolos: any;
  public searchText:string;
  public settings: Settings;
  public cols: any;
  public accion = '';
  public estado;
  public protocoloSeleccionado: string = ""; 
  public protocoloActual;
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public appSettings:AppSettings,
    private _AppService: AppService,
    private auth: AuthService,
    private list: ListComponent
    ) { 
    this.settings = this.appSettings.settings; 
    this.cols = [
      { field: 'idActividades', header: 'Id' },
      { field: 'actividades', header: 'Descripcion' },
      { field: 'orden', header: 'Orden' },
      { field: 'estado', header: 'Estado' }
  ];
  }
  ngOnInit() {
    
    this.getProtocolos();
  }
  public getImg(imgNombre: string): string{
    return '../../../../../assets/img/'+imgNombre;
  }

  public actividad;
  public editarActividad(id) {
    this._AppService.get('actividad/'+id).subscribe(
      data => {
        this.actividad = data;
        if(this.actividad.estado == 0){
          this.actividad.estadoStr == 'Pendiente';
        }else if(this.actividad.estado == 1){
          this.actividad.estadoStr == 'Completado';
        }
        console.log(this.actividad.estado);
      }
    );
    this.accion = 'editar';
  }

  //GET PROTOCOLOS
  public getProtocolos(){
    this._AppService.get(`protocolos/list`).subscribe(
        result =>{
          this.protocolos = result;
        },
        error =>{
          console.log(error);
        });
  }
  public usuario = this.auth.obtenerDatosUser();
  
  public eliminarActividad(id){

    this._AppService.put(`actividad/${id}/estado/9`, {}).subscribe(
      result => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will not be able to recover this imaginary file!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, keep it'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Your imaginary file has been deleted.',
              'success'
            )
            this.list.getActividadesPorProtocolos(this.list.protocoloActual);
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your imaginary file is safe :)',
              'error'
            )
          }
        }),
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Ha ocurrido un error.',
            type:'error'
          });
        }
      }
    )

}
}

/* public estados = [
  {label: 'Pendiente', value: 0},
  {label: 'Completado', value: 1},
] */



