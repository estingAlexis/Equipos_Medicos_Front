import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
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

  //GET INSTRUMENTOS
  public getInstrumentos(){
    this._AppService.get(`instrumentos/list`).subscribe(
      result=>{
        this.instrumentos = result;
      },
      error =>{
        console.log(error);
      });
  }

}
