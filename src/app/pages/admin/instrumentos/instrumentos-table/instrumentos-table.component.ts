import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-instrumentos-table',
  templateUrl: './instrumentos-table.component.html',
  styleUrls: ['./instrumentos-table.component.scss']
})
export class InstrumentosTableComponent implements OnInit {
  @Input() data: any;
  public settings: Settings;
  public protocolos: any;
  public table:number;
  constructor( public appSettings:AppSettings, private _AppService:AppService) {  this.settings = this.appSettings.settings; this.table = 0; }
  ngOnInit() {
  }
  public return(){
    this.table = 0;
  }
  public getProtocolosPorInstrumento(id: string){
    this._AppService.getProtocolosPorInstrumento().subscribe(
      data => {
        console.log(data);
        this.protocolos = data;
        if(this.protocolos.length > 0){
          this.table = 1;
        }
      }
    );
  }
}
