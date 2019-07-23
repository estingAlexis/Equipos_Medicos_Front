import { Component, OnInit, Input, ViewChild,  HostListener  } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-procolos-list',
  templateUrl: './procolos-list.component.html',
  styleUrls: ['./procolos-list.component.scss']
})
export class ProcoloslistComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public settings: Settings;
  public sidenavOpen:boolean = true;
  public actividades: any;
  public protocolos: any;
  public searchText:string;
  public nombreProtocolo: string;
  constructor(public appSettings:AppSettings, 
              public snackBar: MatSnackBar,
              private _AppService:AppService,
              public ngxSmartModalService: NgxSmartModalService,
              private auth: AuthService
               ) { 
    this.settings = this.appSettings.settings; 
  }
  ngOnInit() {    
    if(window.innerWidth <= 992){
      this.sidenavOpen = false;
    }
    this.getProtocolos();
  }

  //GET PROTOCOLOS
  public getProtocolos(){
    this._AppService.get(`protocolos/list`).subscribe(
      result =>{console.log(result)
        this.protocolos = result;
      },
      error =>{
        console.log(error);
      });
  }

  public setNombreProtocolo(nombre: string){
    this.nombreProtocolo = nombre;
  }

  public usuario = this.auth.obtenerDatosUser();
  public descripcionProtocolo;
  public revisionProtocolo;
  public responsableProtocolo;
 
  // NUEVO PROTOCOLO
  public nuevoProtocolo(){
    this.ngxSmartModalService.getModal('modalNuevoProtocolo').open();
    console.log(this.usuario);
     let protocolo = [
      {
       'fkEmpresa': this.usuario.empresa.idEmpresa,
       'idProtocolo': this.
       'codigo': ,
       'nombre': ,
       'descripcion': ,
       'revision': ,
       'responsable': 
     }
   ];
   /*
    this._AppService.post('protocolo/new', protocolo).subscribe(
      data => {
        Swal.fire(
          'Exito!',
          'Protocolo Creado',
          'success'
        )
        console.log(data);
      },
      error => {
        Swal.fire(
          'Fallo!',
          'Error Al Crear Protocolo',
          'warning'
        )
      }
    ) */
  }


}
