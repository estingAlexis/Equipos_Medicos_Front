import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/app.service';
import { ActividadesFormComponent } from '../actividades-form/actividades-form.component';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  @ViewChild('sidenav') sidenav: any;
  public settings: Settings;
  public sidenavOpen:boolean = true;
  public actividades: any;
  public protocolos: any;
  public searchText:string;
  public nombreProtocolo: string;
  constructor(public appSettings:AppSettings, 
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private _AppService: AppService) { 
    this.settings = this.appSettings.settings; 
  }
  ngOnInit() {    
    if(window.innerWidth <= 992){
      this.sidenavOpen = false;
    }
    this.getProtocolos();
  }
  public setNombreProtocolo(nombre: string){
    this.nombreProtocolo = nombre;
  }
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }
  public getProtocolos(){
    this._AppService.get(`protocolos/list`,data =>{ this.protocolos = data, console.log(data)});
  }
  public getActividadesPorProtocolos(id: string){
    this._AppService.get(`actividades/protocolo/${id}`, data => { this.actividades = data, console.log(data)});
  }
  public openForm(){
    let dialogRef = this.dialog.open(ActividadesFormComponent, {
    });
/*
    dialogRef.afterClosed().subscribe(user => {
        if(user){
            (user.id) ? this.updateUser(user) : this.addUser(user);
        }
    });*/
}
}
