import { Component, OnInit, Input, ViewChild,  HostListener  } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AppService } from 'src/app/services/app.service';
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
  public table: number;
  public instrumentos:any;
  public searchText:string;
  public nombreProtocolo: string;
  constructor(public appSettings:AppSettings, 
              public snackBar: MatSnackBar,
              private _AppService:AppService,
              public ngxSmartModalService: NgxSmartModalService, ) { 
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
     // @Get actividades por protocolo
     public getActividadesPorProtocolo(id: string) {
      this._AppService.get('actividades/protocolo/'.concat(id)).subscribe(
        result => {
          this.actividades = result;
          if (this.actividades.length > 0) {this.table = 1;} else {if (this.actividades.lenght == 0) {  }}
        },
        error =>{
          console.log(error);
        });
    }
    
    public getInstrumentosPorProtocolos(id: string) {
      this._AppService.get('ip/1/protocolo/'.concat(id)).subscribe(
        result => {
          this.instrumentos = result;
          if (this.instrumentos.length > 0) {this.table = 2;} else {if (this.instrumentos.lenght == 0) {  }}
        },
        error =>{
          console.log(error);
        });
    }
  

  public setNombreProtocolo(nombre: string){
    this.nombreProtocolo = nombre;
  }


}
