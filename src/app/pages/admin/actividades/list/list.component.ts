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
import Swal from 'sweetalert2';
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
  public protocolo;
  public actividad;
  
  public estado;
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
          console.log(result);
        },
        error =>{
          console.log(error);
        });
  }


//GET ACTIVIDADES X PROTOCOLOS
  public getActividadesPorProtocolos(id: string){
    this._AppService.get(`actividades/protocolo/${id}`).subscribe(
      result=>{
        this.actividades = result;
        console.log(result);
      },
      error =>{
        console.log ( error)
      }
    );

  }

  guardarNuevaActividad() {
    this.getActividadesPorProtocolos(this.protocolo.idProtocolo);
    const nueva_actividad = {
      "fkEmpresa": this.usuario.empresa.idEmpresa ,
      "fkProtocolo": this.protocolo.idProtocolo ,
      "items": 1,
      "actividades": String(this.actividad) ,
      "orden": this.actividades.length(), 
      "estado": this.estado
    }
    console.log(this.usuario.empresa.idEmpresa);
    console.log(this.protocolo);
    console.log(String(this.actividad));
    this._AppService.post(`actividad/new`, nueva_actividad).subscribe(
      result => {
        Swal.fire(
          'Good job!',
          'You clicked the button!', 
          'success'
        )
      }
    );
    this.getActividadesPorProtocolos(this.protocolo.idProtocolo);
    this.protocolo = null;
    this.actividades = null;
    this.estado = null;
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
  ]

}
