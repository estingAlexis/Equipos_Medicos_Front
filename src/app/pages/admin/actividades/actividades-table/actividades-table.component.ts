import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
@Component({
  selector: 'app-actividades-table',
  templateUrl: './actividades-table.component.html',
  styleUrls: ['./actividades-table.component.scss']
})
export class ActividadesTableComponent implements OnInit {
  @Input() data:any;
  public actividades: any;
  public protocolos: any;
  public searchText:string;
  public settings: Settings;
  public cols: any;
  constructor(
    public appSettings:AppSettings,
    private _AppService: AppService) { 
    this.settings = this.appSettings.settings; 
  }
  ngOnInit() {
  }
  public getImg(imgNombre: string): string{
    return '../../../../../assets/img/'+imgNombre;
  }
}