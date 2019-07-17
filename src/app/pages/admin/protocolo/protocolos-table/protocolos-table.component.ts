import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AuthService } from 'src/app/services/auth.service';
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
  public accion = '';
  constructor(public appSettings: AppSettings, private _AppService: AppService, private auth: AuthService) { this.settings = this.appSettings.settings; this.table = 0; }
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



}
