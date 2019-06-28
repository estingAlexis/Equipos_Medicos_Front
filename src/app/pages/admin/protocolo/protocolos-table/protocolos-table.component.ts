import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/app.service';
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
  constructor(public appSettings: AppSettings, private _AppService: AppService) { this.settings = this.appSettings.settings; this.table = 0; }
  ngOnInit() {
  }
  public getImg(imgNombre: string): string{
    return '../../../../../assets/img/'+imgNombre;
  }
  public return(){
    this.table = 0;
  }
  public getActividadesPorProtocolo(id: string) {
    this._AppService.getActividadesPorProtocolos(id).subscribe(
      data => {
        console.log(data);
        this.actividades = data;
        if (this.actividades.length > 0) {
          this.table = 1;
        } else {
          if (this.actividades.lenght == 0) {
          }
        }
      }
    );
  }
  public getInstrumentosPorProtocolos(id: string) {
    this._AppService.getInstrumentosPorProtocolos(id).subscribe(
      data => {
        console.log(data);
        this.instrumentos = data;
        if (this.instrumentos.length > 0) {
          this.table = 2;
        } else {
          if (this.instrumentos.lenght == 0) {
          }
        }
      }
    );
  }
}
