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
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  public settings: Settings;
  public table:number;
  public equipos: any;
  public estado:boolean;
  constructor(public appSettings:AppSettings, private service:AppService) { 
    this.settings = this.appSettings.settings; 
    this.table = 0;
  }
 OnInit() {
  }

}
