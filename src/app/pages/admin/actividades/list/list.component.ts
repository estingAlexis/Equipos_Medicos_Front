import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/app.service';
import { ActividadesFormComponent } from '../actividades-form/actividades-form.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Usuario } from 'src/app/services/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { SelectItem } from 'primeng/components/common/selectitem';
interface protocolo {
  id_protocolo: number;
  nombre: string;
}

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
  public protocoloSeleccionado: string = ""; 

  public searchText:string;
  public nombreProtocolo: string;
  public usuario: Usuario;


  constructor(public appSettings:AppSettings, 
              public snackBar: MatSnackBar,
              public dialog: MatDialog,
              private _AppService: AppService,
              public ngxSmartModalService: NgxSmartModalService,
              public auth: AuthService) { 
    this.settings = this.appSettings.settings; 


  }
  ngOnInit(): void {    
    if(window.innerWidth <= 992){
      this.sidenavOpen = false;
    }
    this.usuario = this.auth.obtenerDatosUser();
    this.getProtocolos();
    console.log(this.protocolos);
    console.log(this.usuario);
  }
  public setNombreProtocolo(nombre: string){
    this.nombreProtocolo = nombre;
  }
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth <= 992) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }
  public getProtocolos(){
    this._AppService.getProtocolos().subscribe(
      data => {
        this.protocolos = data;
        console.log(data);
      }, err => {
        console.log(err);
      }
    )
  }
  public getActividadesPorProtocolos(id: string){
    this._AppService.get(`actividades/protocolo/${id}`, data => { this.actividades = data, console.log(data)});
  }
  public openForm(){
    let dialogRef = this.dialog.open(ActividadesFormComponent, {

    });
  }
/*
    dialogRef.afterClosed().subscribe(user => {
        if(user){
            (user.id) ? this.updateUser(user) : this.addUser(user);
        }
    });
}
*/

/* public getUsuario() {
  // FIXME: Obtener datos usuario
  this.Usuario = this.auth.obtenerDatosUser();
  console.log(this.Usuario);
  return true;
  }
 */

}
