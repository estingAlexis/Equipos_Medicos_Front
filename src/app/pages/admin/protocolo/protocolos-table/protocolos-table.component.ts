import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
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
  public cols: any[];
  constructor(public appSettings: AppSettings, private _AppService: AppService) { 
    this.settings = this.appSettings.settings; 
    this.table = 0;
    this.cols = [
      { field: 'codigo', header: 'Codigo' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'descripcion', header: 'Descripcion' },
      { field: 'responsable', header: 'Responsable' },
      { field: 'resvision', header: 'Revision' },
      { field: 'acci', header: 'Acciones' }
    ]; 
  }
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

  // @Get instrumentos por Protocolos
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



}
