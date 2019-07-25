import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
import { MatDialog } from '@angular/material';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.component.html',
  styleUrls: ['./equipos-list.component.scss']
})
export class EquiposListComponent implements OnInit {
  public equipos:any;
  public parametro:any;
  public protocolos:any;
  public estado:boolean;
  public usuario:Usuario;
  public equipo:any;
  @Input()
  public nombre:any;
  @Input()
  public codigo:any;
  @Input()
  public referencia:any;
  @Input()
  public proto:any;
  @Input()
  public para:any;
  
  constructor(
    private service: AppService, private servicio: AuthService) {
      this.estado=true;
  }
   //GET EQUIPOS
   public getEquipos() {
    this.service.get(`equipos/list`).subscribe(
      result =>{
        this.equipos = result;
      },
      error =>{
        console.log(error);
      });
  }

  ngOnInit() {
    this.usuario= this.servicio.obtenerDatosUser();
    this.getEquipos();
    this.getProtocolos();
    this.getParametro();
  }
  //GET PROTOCOLO
  public getProtocolos(){
    this.service.get('protocolos/list').subscribe(
      result =>{
        this.protocolos = result;
      },
      error =>{
        console.log(error);
      });
  }
  //NUEVO EQUIPO 
  public postEquipo(){
    this.equipo={
      "fkEmpresa":this.usuario.empresa.idEmpresa,
      "nombre":this.nombre,
      "fkProtocolo":parseInt(this.proto),
      "fkTipo":parseInt(this.para),
      "referencia":this.referencia,
      "codigo":this.codigo,
      "estado":1,
      "idEquipos":143
    }
    console.log(this.equipo)
    this.service.post('equipos/new', this.equipo).subscribe(
      resutl=>{ alert('el equipo fue creado con exito') 
      console.log(resutl)
      this.equipo=resutl}
    )
  }
  //GET PARAMETRO CUANDO GRUPO ES IGUAL A DOS
  public getParametro(){
    this.service.get('parametro/filtro_empresa_grupo/'+this.usuario.empresa.idEmpresa+'/2').subscribe(
      result=>{
         this.parametro= result}
    )
  }


}
