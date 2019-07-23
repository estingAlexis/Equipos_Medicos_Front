import { NgxSmartModalService } from 'ngx-smart-modal';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-protocolos-table',
  templateUrl: './protocolos-table.component.html',
  styleUrls: ['./protocolos-table.component.scss']
})
export class ProtocolosTableComponent implements OnInit {
  @Input() data: any;
  public settings: Settings;
  public actividades: any;
  public instrumentos: any;
  public table: number;
  public accion = '';
  constructor(public appSettings: AppSettings, private _AppService: AppService, private auth: AuthService, private ngxSmartModalService: NgxSmartModalService) { this.settings = this.appSettings.settings; this.table = 0; }
  ngOnInit() {

  }

  public getImg(imgNombre: string): string{
    return '../../../../../assets/img/'+imgNombre;
  }
  public return(){
    this.table = 0;
  }

   // @Get actividades por protocolo
  public getActividadesPorProtocolo(id: string) {
    this._AppService.get('actividades/protocolo/'.concat(id)).subscribe(
      result => {
        this.actividades = result;
        if (this.actividades.length > 0) {this.table = 1;} else {if (this.actividades.lenght == 0) {  }}
      },
      error =>{
        console.log(error);
      });
  }
  
  public getInstrumentosPorProtocolos(id: string) {
    this._AppService.get('ip/1/protocolo/'.concat(id)).subscribe(
      result => {
        this.instrumentos = result;
        if (this.instrumentos.length > 0) {this.table = 2;} else {if (this.instrumentos.lenght == 0) {  }}
      },
      error =>{
        console.log(error);
      });
  }
public protocolos;
  // LISTAR PROTOCOLOS
  public getProtocolos(){
    this._AppService.get('protocolos/list').subscribe(
      data => {
        this.protocolos = data;
        console.log(this.protocolos);
      },
      error => {
        console.log(error);
      }
    )
  }

  public protocolo;
  // GET PROTOCOLO BY ID
  public getProtocoloById(idProtocolo){
    this._AppService.get(`protocolo/${idProtocolo}`).subscribe(
      data => {
        this.protocolo = data;
        console.log(this.protocolo);
      },
      error => {
        console.log(error);
      }
    )
  }

  public nombreProtocolo;
  public descripcionProtocolo;
  public revisionProtocolo;
  public responsableProtocolo;
  public fkEmpresa = this.auth.obtenerDatosUser();
 

  


  // EDITAR PROTOCOLO
  public editarProtocolo(id) {
/*     let protocolo [
      {
       'fkEmpresa': ,
       'idProtocolo': ,
       'codigo': ,
       'nombre': ,
       'descripcion': ,
       'revision': ,
       'responsable': 
     }
   ];
    this._AppService.put(`protocolo/${id}`, protocolo).subscribe(
      data => {
        Swal.fire(
          'Exito!',
          'Protocolo Modificado',
          'success'
        )
        console.log(data);
      },
      error => {
        Swal.fire(
          'Fallo!',
          'Error Al Modificar Protocolo',
          'warning'
        )
      }
    ) */
  }
  


}
