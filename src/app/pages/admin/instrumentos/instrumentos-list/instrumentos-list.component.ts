import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-instrumentos-list',
  templateUrl: './instrumentos-list.component.html',
  styleUrls: ['./instrumentos-list.component.scss']
})
export class InstrumentosListComponent implements OnInit {
  public settings: Settings;
  public instrumentos: any;
  public estado:boolean;
  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  constructor(public appSettings:AppSettings, 
    private _AppService:AppService) { this.settings = this.appSettings.settings
    this.estado=true; }

  ngOnInit() {
    this.getInstrumentos();
  }

  //GET INSTRUMENTOS
  public getInstrumentos(){
    this.settings.loadingSpinner = true;
    this._AppService.get(`instrumentos/list`).subscribe(
      result=>{
        this.settings.loadingSpinner = false;
        this.instrumentos = result;
      },
      error =>{
        this.Toast.fire({type: 'error',title: 'Ha ocurrido un error en la consulta'})
      });
  }

}
