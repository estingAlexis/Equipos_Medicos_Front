import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {
  public settings: Settings;
  public clientes: any;
  constructor(public appSettings:AppSettings,
    private _AppService:AppService) {this.settings = this.appSettings.settings  }
  ngOnInit() {
    this.getTerceros();
  }
  public getTerceros(){
    this._AppService.get(`terceros/list`, data =>{console.log(data); this.clientes = data} );
  }
}
