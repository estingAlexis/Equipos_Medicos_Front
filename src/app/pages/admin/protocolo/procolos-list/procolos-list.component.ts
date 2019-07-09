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
      result =>{
        this.protocolos = result;
      },
      error =>{
        console.log(error);
      });
  }

  public setNombreProtocolo(nombre: string){
    this.nombreProtocolo = nombre;
  }


}
