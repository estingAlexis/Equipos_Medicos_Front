import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {
  public settings: Settings;
  public clientes: any;
  public cols: any[];
  constructor(
    public appSettings:AppSettings,
    private _AppService:AppService
    ) {
      this.settings = this.appSettings.settings;
      this.cols = [
        { field: 'documento', header: '#_ID' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'telefonoCelular', header: 'Celular' },
        { field: 'direccion', header: 'Direccion' },
        { field: 'ciudad', header: 'Ciudad' },
        { field: 'email', header: 'Email' }
      ];    
    }

  ngOnInit() {
    this.getTerceros();
  }

  //GET TERCEROS
  public getTerceros(){
    this._AppService.get(`clientes/list`).subscribe(
      result =>{
        this.clientes = result;
      },
      error =>{
        console.log(error);
      });
  }
}
