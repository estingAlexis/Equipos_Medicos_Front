import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ComponentsModule } from 'src/app/components/components.module';


@Component({
  selector: 'app-instrumentos-list',
  templateUrl: './instrumentos-list.component.html',
  styleUrls: ['./instrumentos-list.component.scss']
})
export class InstrumentosListComponent implements OnInit {
  public settings: Settings;
  public instrumentos: any;
  public estado:string;
  public lista:string;
  public protocolos:any;
  public protocolo:any;
  public cols: any[];
  public table:number;
  public instrumento:any;
  public selectinstrumento:any;
  public empresa: 1;
  public vacion:boolean;
  public actualizar:any;
  public usuario:Usuario;
  public idInstrumentos:any;
  public datos: FormGroup;
  public datoschanged: boolean = true;
  //INPUT 
  @Input()
  public nombre:any;
  @Input()
  public marca:any;
  @Input()
  public modelo:any;
  @Input()
  public proto:any;

  public Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
  limls: { field: string; header: string; }[];
  constructor(private _formBuilder: FormBuilder, public appSettings:AppSettings,
    private _AppService:AppService, public servicio:AuthService) { this.settings = this.appSettings.settings
    this.estado='listaI';
    this.vacion=false;
    this.lista='instrumento';
    this.cols = [
      { field: 'idInstrumentos', header: 'id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'marca', header: 'Marca' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'accion', header: 'acccion' }
    ];  }

  //obetener el selecionado 
  SelectIntrumento(selec:any){
    this.selectinstrumento=selec;
    console.log(this.selectinstrumento)
  }
   // @Get protocolos por Instrumentos
   public getProtocolosPorInstrumento(e){
     this.protocolos = [];
    this._AppService.get('ip/'+this.usuario.empresa.idEmpresa+'/instrumento/'.concat(e)).subscribe(
      (result:any) => {
        this.protocolos = result;
        if(this.protocolos.length > 0){this.table = 1;}
      },
      error =>{
        console.log(error);
      });
  }
    //GET PROTOCOLOS
    public getProtocolos(){
      this._AppService.get(`protocolos/list`).subscribe(
        result =>{console.log(result)
          this.protocolo = result;
        },
        error =>{
          console.log(error);
        });
    }
    //OBTENER ID
    public SeleInstrumento(instrumento:any){
      this.datos.patchValue({
      nombre:instrumento.nombre,
      modelo:instrumento.modelo,
      marca:instrumento.marca
    });
    this.idInstrumentos.instrumento.idInstrumento;
    }
    // ACTUALIZAR INSTRUMENTOS
    public putInstrumento(){
      this.actualizar={
        "idInstrumentos":this.idInstrumentos,
        "nombre":this.nombre,
        "marca":this.marca,
        "modelo":this.modelo,
      }
      this._AppService.put('instrumentos/'+this.idInstrumentos,this.actualizar).subscribe(
        result=>{
          console.log(result)}
      )
    }
    //AGREGAR NUEVO INSTRUMENTO
    public postInstrumentos(){
      let datos = this.datos.value;
      this.instrumento={
        "nombre":datos.nombre,
        "marca":datos.marca,
        "modelo":datos.modelo,
        "fkEmpresa": this.usuario.empresa.idEmpresa,
      }
      this._AppService.post('instrumentos/new', this.instrumento).subscribe(
        result=>{ Swal.fire('login','El instrumento se agregado con exito')
          this.instrumento=result
          this.estado='listaI';
          this.getInstrumentos();
          this.datos.reset();
          
        }
      )
    }
    //AGREGAR NUEVO INSTRUMENTO PROTOCOLO 
    public postIntrumentosProtocolo(){
      this.instrumento={
        "fkProtocolo":this.proto,
        "fkIntrumento":this.selectinstrumento
      }
    }

  //GET INSTRUMENTOS
  public getInstrumentos(){
    this.settings.loadingSpinner = true;
    this._AppService.get(`instrumentos/list`).subscribe(
      result=>{console.log(result)
        this.settings.loadingSpinner = false;
        this.instrumentos = result;
      },
      error =>{
        this.Toast.fire({type: 'error',title: 'Ha ocurrido un error en la consulta'})
      });
  }
  ngOnInit() {
    this.getInstrumentos();
    this.getProtocolos();
    this.usuario=this.servicio.obtenerDatosUser();
    this.datos = this._formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      modelo: ['', Validators.compose([Validators.required])],
      marca: ['', Validators.compose([Validators.required])],
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
