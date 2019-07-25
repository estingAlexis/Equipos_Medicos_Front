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




}
