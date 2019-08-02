import { Component, OnInit, Input } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
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
  public vacion:boolean;
  public idInstrumentos:any;
  public actualizar:any;
  public 
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
  constructor(public appSettings:AppSettings,
    private _AppService:AppService) { this.settings = this.appSettings.settings
    this.estado='listaI';
    this.vacion=false;
    this.lista='instrumento';

    this.cols = [
      { field: 'idInstrumentos', header: 'Id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'marca', header: 'Marca' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'accion', header: 'Acccion' },
      { field: 'estado', header: 'Estado' }
    ];  }

  ngOnInit() {
    this.getInstrumentos();
    this.getProtocolos();
  }
  SelectIntrumento(selec:any){
    this.selectinstrumento=selec;
    console.log(this.selectinstrumento)
  }
   // @Get protocolos por Instrumentos
   public getProtocolosPorInstrumento(e){
     this.protocolos = [];
    this._AppService.get('ip/1/instrumento/'.concat(e)).subscribe(
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
      this.idInstrumentos=instrumento.idInstrumentos;
      this.nombre=instrumento.nombre;
      this.modelo=instrumento.modelo;
      this.marca=instrumento.marca;
    }
    // ACTUALIZAR INSTRUMENTOS
    public putInstrumento(){
      this.actualizar={
        "idInstrumentos":this.idInstrumentos,
        "nombre":this.nombre,
        "marca":this.marca,
        "modelo":this.modelo,
      }
      console.log(this.actualizar)
      this._AppService.put('instrumentos/'+this.idInstrumentos,this.actualizar).subscribe(
        result=>{
          console.log(result)}
      )
    }
    //AGREGAR NUEVO INSTRUMENTO
    public postInstrumentos(){
      this.instrumento={
        "nombre":this.nombre,
        "marca":this.marca,
        "modelo":this.modelo,
        "fkEmpresa": 1,
      }
      console.log(this.instrumento)
      this._AppService.post('instrumentos/new', this.instrumento).subscribe(
        result=>{  this.success
          this.instrumento=result
          this.getInstrumentos();
          this.estado='listaI';
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
  success(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'success',
      title: 'El instrumento fue agregado con exito'
    })
  }

  public deleteInstrumento() {
    const json = {
      "idInstrumentos": this.selectinstrumento.idInstrumentos,
      "fkEmpresa": this.usuario.empresa.idEmpresa,
      "nombre": this.selectinstrumento.nombre,
      "marca": this.selectinstrumento.marca,
      "modelo": this.selectinstrumento.modelo,
      "estado": 9,
    }
    console.log(json);
   
        Swal.fire({
          title: 'Advertencia',
          text: 'Estas seguro?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Si, borrar',
          cancelButtonText: 'No, salir'
        }).then((result) => {
          if (result.value) {
            Swal.fire(
              'Deleted!',
              'Actividad Borrada con exito',
              'success'
            )
            this._AppService.put(`instrumentos/${this.selectinstrumento.idInstrumentos}`, json).subscribe(
              data => {
                this.getInstrumentos();
                this.estado = 'listaI';
              }
            )
            
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'No se ha realizado ningun cambio',
              'error'
            )
          }
        }),
        error => {
          Swal.fire({
            title: 'Error!',
            text: 'Error al conectar con la base de datos',
            type:'error'
          });
        }
  }

}
