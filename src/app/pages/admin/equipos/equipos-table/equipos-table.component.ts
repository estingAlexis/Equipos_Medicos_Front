import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-equipos-table',
  templateUrl: './equipos-table.component.html',
  styleUrls: ['./equipos-table.component.scss']
})
export class EquiposTableComponent implements OnInit {
  @Input() data: any;
  public settings: Settings;
  public protocolos: any;
  public table:number;
  constructor(public appSettings:AppSettings, private _AppService:AppService) { this.settings = this.appSettings.settings; this.table = 0;}

  ngOnInit() {
  }
  public getImg(imgNombre: string): string{
    return '../../../../../assets/img/'+imgNombre;
  }

}
