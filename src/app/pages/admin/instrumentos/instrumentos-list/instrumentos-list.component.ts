import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-instrumentos-list',
  templateUrl: './instrumentos-list.component.html',
  styleUrls: ['./instrumentos-list.component.scss']
})
export class InstrumentosListComponent implements OnInit {
  public settings: Settings;
  public instrumentos: any;
  constructor(public appSettings:AppSettings, 
    private _AppService:AppService) { this.settings = this.appSettings.settings }

  ngOnInit() {
    this.getInstrumentos();
  }
  public getInstrumentos(){
    this._AppService.get(`instrumentos/list`, data =>{ this.instrumentos = data, console.log(data)});
  }

}
