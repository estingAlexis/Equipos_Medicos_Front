import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
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
  public putEquip:any
  public idEquipos:any;
  public datos: FormGroup;
  public datoschanged: boolean = true;
  @Input()
  public nombre:any;
  @Input()
  public codigo:any;
  @Input()
  public referencia:any;
  @Input()
  public fkProtocolo:any;
  @Input()
  public fkTipo:any;
  
  constructor( private _formBuilder: FormBuilder,private service: AppService, private servicio: AuthService) {
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

 
  //OBTENER DATOS DE EQUIPO 
  public setEquipo(equiposs: any){
    this.datos.patchValue({
    nombre: equiposs.nombre,
    fkProtocolo: equiposs.fkProtocolo,
    fkTipo: equiposs.fkTipo,
    codigo: equiposs.codigo,
    referencia: equiposs.referencia
  });
  this.idEquipos=equiposs.idEquipos;
 }
 //ACTUALIAZAR
 public putEquipo(){
   this.putEquip={
     "idEquipos":this.idEquipos,
    "fkEmpresa":this.usuario.empresa.idEmpresa,
    "nombre":this.nombre,
    "fkProtocolo":parseInt(this.fkProtocolo),
    "fkTipo":parseInt(this.fkTipo),
    "referencia":this.referencia,
    "codigo":this.codigo,
    "estado":1,
   }
   this.service.put('equipos/'+this.idEquipos,this.putEquip).subscribe(
     result=>{  alert('Ah sido actualizado con exito')
       this.estado=true
      this.getEquipos();
      console.log(result)
  }, error => { console.log(error)}
   );
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
  clear(){
    this.nombre=null;
    this.fkTipo=null,
    this.fkProtocolo=null;
    this.referencia=null;
    this.codigo=null;
    
  }
  //NUEVO EQUIPO 
  public postEquipo(){
    let datos = this.datos.value;
    this.equipo={
      "fkEmpresa":this.usuario.empresa.idEmpresa,
      "nombre":datos.nombre,
      "fkProtocolo":parseInt(datos.fkProtocolo),
      "fkTipo":parseInt(datos.fkTipo),
      "referencia":datos.referencia,
      "codigo":datos.codigo,
      "estado":1,
    }
    this.service.post('equipos/new', this.equipo).subscribe(
      resutl=>{ alert('el equipo fue creado con exito') 
      this.estado=true
      this.getEquipos()
      this.equipo=resutl
      this.datos.reset()}
    )
  }
  //GET PARAMETRO CUANDO GRUPO ES IGUAL A DOS
  public getParametro(){
    this.service.get('parametro/filtro_empresa_grupo/'+this.usuario.empresa.idEmpresa+'/2').subscribe(
      result=>{
         this.parametro= result}
    )
  }
  ngOnInit() {
    this.usuario= this.servicio.obtenerDatosUser();
    this.getEquipos();
    this.getProtocolos();
    this.getParametro();
    this.datos = this._formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      referencia: ['', Validators.compose([Validators.required])],
      codigo: ['', Validators.compose([Validators.required])],
      fkProtocolo: ['', Validators.compose([Validators.required])],
      fkTipo: ['', Validators.compose([Validators.required])],
      fkEmpresa: ['', Validators.compose([Validators.required])], 
    });
    this.datos.valueChanges.subscribe(() => {
      this.datoschanged = true;
      let times: number = 0;
      let veces: number = 0;
      (<any>Object).values(this.datos.controls).forEach(control => {
        (<any>Object).values(this.datos).forEach(data => {
          if (veces == times) {
            if (control.value != data) {
              this.datoschanged = false;
            }
          }
          veces++;
        });
        veces = 0;
        times++;
      });
    });
  }

}
