import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
//import { Settings } from '../../app.settings.model';
@Component({
  selector: 'app-cotizaciones-form',
  templateUrl: './cotizaciones-form.component.html',
  styleUrls: ['./cotizaciones-form.component.scss'],
  providers: [DatePipe]
})
export class CotizacionesFormComponent implements OnInit, DoCheck {
  @Output() return = new EventEmitter();
  @Input() idCot: number; 
  //public settings: Settings;
  public datos: FormGroup;
  public empresas: Array<any>;
  public clientes: Array<any>;
  public parametros: Array<any>;
  public equipos: Array<any>;
  public equiposSelected: Array<any>;
  public Cotizaciones: Array<any>;
  public consecutivo: Array<any>;
  public iva: Array<any>;
  public info: any;
  public fecha:any;
  public fechaentrega:any;
  public idEmpresa:number;
  public idCliente: number;
  public datoschanged: boolean = true;
  public panelOpenState = false;
  constructor(private _AppService: AppService, private datePipe: DatePipe, private _formBuilder: FormBuilder) { 
    this.equipos = [];
    this.equiposSelected = [];
    this.consecutivo = [];
  }

  ngOnInit() {
    this._AppService.get('cotizacionDetalle/list').subscribe(data=>{console.log(data)});
    this.getClientes();
    this.getEquipos();
    this.getEmpresas();
    //this.getParametros();

    this.datos = this._formBuilder.group({
      idEmpresa: ['', Validators.compose([Validators.required])],
      idCliente: ['', Validators.compose([Validators.required])],
      resp: ['', Validators.compose([Validators.required])],
      cp: ['', Validators.compose([Validators.required])],
      viatico: ['', Validators.compose([Validators.required])],
      fecha: ['', Validators.compose([Validators.required])],
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
      console.log(this.datoschanged);
    });
  }
  ngDoCheck(){
  }
  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  public fieldValidation(datos: FormGroup, name: any) {
    if (datos.get([name]).invalid && datos.get([name]).touched) {
      return true;
    }
  }
  public getClientes() {
    this._AppService.get('clientes/list').subscribe(
      (data: any) => {
        console.log(data);
        this.clientes = data;
      }
    );
  }
  public getEquipos() {
    this._AppService.get('equipos/list').subscribe(
      (data: any) => {
        console.log(data);
        this.equipos = data;
      }
    );
  }
  public getEmpresas() {
    this._AppService.get('empresa/list').subscribe(
      (data: any) => {
        console.log(data);
        this.empresas = data;
      }
    );
  }
  public getParametros(){
    this._AppService.get('parametro/filtro_empresa_grupo/'+this.datos.value.idEmpresa+'/13').subscribe(
      (data: any) => {
        console.log(data);
        this.parametros = data;
      }
    );
    this._AppService.get('parametro/filtro_empresa_parametro/'+this.datos.value.idEmpresa+'/153').subscribe(
      (data: any) => {
        console.log(data);
        this.consecutivo = data;
      }
    );
    this._AppService.get('parametro/filtro_empresa_parametro/'+this.datos.value.idEmpresa+'/162').subscribe(
      (data:any) => {
        console.log(data);
        this.iva = data;
      }
    );
  }
  public getDate() {
    this.fechaentrega = this.datePipe.transform(this.datos.value.fecha, 'yyyy-MM-dd');
    console.log(this.fechaentrega);
  }
  public CrearDetalle(
    calibracion:number,
    cantidad:number,
    idCot: number,
    idEqui:number,
    orden: number,
    valoru){
    let detalles = {
      "idCotizDeta":0,
      "calibracion":calibracion,
      "cantidad":cantidad,
      "estado":0,
      "fkCotizEncab":idCot,
      "fkEquipos":idEqui,
      "orden":orden,
      "servicio":null,
      "tipoServicio":0,
      "valorUnitario":valoru
    }
    console.log(detalles);
    this._AppService.post('cotizacionDetalle/new',detalles).subscribe(
      data => {console.log(data)}
    );
  }
  public submit() {
    let datos = this.datos.value;
    console.log(datos);
    let consecutivo = parseInt(this.consecutivo[0].codigo);
    consecutivo = consecutivo + this.idCot+1;
    let contizacion = {
      "idCotizEncab": this.idCot+1,
      "fechaSistema": "2019-01-01T00:00:00.000+0000",
      "codigo": String(this.consecutivo[0].nombreCorto + consecutivo),
      "fecha": this.datePipe.transform(datos.fecha, 'yyyy-MM-dd'),
      "viaticoValor": datos.viatico,
      "viaticoIva": this.iva[0].valor,
      "vigencia": "30",
      "entrega": this.fechaentrega,
      "garantiaDf": "0",
      "garantiaMo": "0",
      "condicionPago": datos.cp,
      "responsable": datos.resp,
      "estado": 0,
      "fkCliente": datos.idCliente,
      "fkEmpresa": datos.idEmpresa
    }
    console.log(contizacion);
    this._AppService.post('cotizaciones/new',contizacion).subscribe(
      (data: any) => {
        console.log(data);
        Swal.fire({
          type: 'success',
          title: 'Grandioso',
          text: 'Cotizacion Creada'
        });
        this.equiposSelected.push(this.equipos[0]);
        this.equiposSelected.push(this.equipos[1]);
        this.equiposSelected.push(this.equipos[2]);
        for (let index = 0; index < this.equiposSelected.length; index++) {
          this.CrearDetalle(20000,1,this.idCot+1,this.equiposSelected[index].idEquipos,5,1000);
        }
      }
    );
  }
}
