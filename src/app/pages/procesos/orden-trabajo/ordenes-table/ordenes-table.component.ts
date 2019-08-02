import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-ordenes-table',
  templateUrl: './ordenes-table.component.html',
  styleUrls: ['./ordenes-table.component.scss']
})
export class OrdenesTableComponent implements OnInit {
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

  // @Get protocolos por Instrumentos
 /*  public getProtocolosPorInstrumento(id: string){
    this._AppService.get('ip/1/instrumento/2').subscribe(
      result => {
        this.protocolos = result;
        if(this.protocolos.length > 0){this.table = 1;}
      },
      error =>{
        console.log(error);
      });
  } */



}
