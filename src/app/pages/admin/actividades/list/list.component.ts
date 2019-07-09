import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
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

  public protocolo;
  public actividad;
  public estado;

  guardarNuevaActividad() {
    this._AppService.post(`actividades/${this.actividades.idActividades}`, {
      "fkEmpresa": this.usuario.empresa.nombre ,
      "fkProtocolo": this.protocolo ,
      "items": 0,
      "actividades": this.actividad ,
/*       "orden": ,
      "tipo": , */
      "estado": this.estado
    });
  }

//GET ACTIVIDADES X PROTOCOLOS
  public getActividadesPorProtocolos(id: string){
    this._AppService.get(`actividades/protocolo/${id}`).subscribe(
      result=>{
        this.actividades = result;
      },
      error =>{
        console.log ( error)
      }
    );

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
  public estadoSeleccionado = 0;
  public estados = [
    {label: 'Pendiente', value: 0},
    {label: 'Completado', value: 1},
  ]

}
