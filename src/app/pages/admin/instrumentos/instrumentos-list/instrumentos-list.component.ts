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
  public empresa: 1;
  public vacion:boolean;
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
      { field: 'idInstrumentos', header: 'id' },
      { field: 'nombre', header: 'Nombre' },
      { field: 'marca', header: 'Marca' },
      { field: 'modelo', header: 'Modelo' },
      { field: 'accion', header: 'acccion' }
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

}
