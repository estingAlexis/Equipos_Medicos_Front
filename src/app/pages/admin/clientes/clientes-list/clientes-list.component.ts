import { Component, OnInit, Input} from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.scss']
})
export class ClientesListComponent implements OnInit {
  public settings: Settings;
  public clientes: any;
  public cols: any[];
  public estado:boolean;
  public nuevoC:any;
  public estadoCliente:any;
  public actualizar:any;
  public datos: FormGroup;
  public datoschanged: boolean = true;
  @Input()  
  public nombre:any;
  @Input()
  public documento:number;
  @Input()
  public email:any;
  @Input()
  public direccion:any;
  @Input()
  public ciudad:any;
  @Input()
  public nombrecorto:any;
  @Input()
  public telefonoFijo:any;
  @Input()
  public telefonoCelular:any;
  @Input()
  public atencion:any;
  private idCliente:number;

  constructor(    private _formBuilder: FormBuilder,
    public appSettings:AppSettings,
    private _AppService:AppService,
    ) {
      this.settings = this.appSettings.settings;
      this.cols = [
        { field: 'documento', header: '#_ID' },
        { field: 'nombre', header: 'Nombre' },
        { field: 'telefonoCelular', header: 'Celular' },
        { field: 'direccion', header: 'Direccion' },
        { field: 'ciudad', header: 'Ciudad' },
        { field: 'email', header: 'Email' },
        { filed: 'estado', header: 'Estado' },  
        { field: 'acciones', header: 'Acciones' },
       
      ];  
      this.estado=true;
    }
    //AGREGAR NUEVO CLIENTE
    public nuevoCliente(){
      this.estadoCliente = 1;
      let datos = this.datos.value;
       this.nuevoC={
      "documento": datos.documento,
      "nombre":datos.nombre,
      "nombreCorto":datos.nombrecorto,
      "direccion":datos.direccion,
      "email":datos.email,
      "ciudad":datos.ciudad,
      "telefonoFijo":datos.telefonoFijo,
      "telefonoCelular":datos.telefonoCelular,
      "atencion":datos.atencion,
      "estado": this.estadoCliente
      } 
      this._AppService.post('clientes/new', this.nuevoC).subscribe(
        result=>{ alert('El cliente se agregado con exito'), 
        this.estado=true
        this.getTerceros();
        this.datos.reset();
      }
      )
   }
   //vaciar campos
   clear(){
     this.nombre=null;
     this.nombrecorto=null;
     this.documento=null;
     this.telefonoCelular=null;
     this.telefonoFijo=null;
     this.email=null;
     this.direccion=null;
     this.ciudad=null;
     this.atencion=null;
   }
 //TRAER DATOS POR ID
   public setCliente(cliente: any){
    this.datos.patchValue({
      documento: cliente.documento,
      nombre: cliente.nombre,
      nombreCorto: cliente.nombrecorto,
      direccion: cliente.direccion,
      email: cliente.email,
      ciudad: cliente.ciudad,
      telefonoCelular: cliente.telefonoCelular,
      telefonoFijo: cliente.telefonoFijo,
      atencion: cliente.atencion
    });
    this.idCliente=cliente.idCliente;
    this.estadoCliente=cliente.estado;
  }
  //METODO DE ACTUALIZAR
  public editarDatos(){
    this.actualizar={
      "idCliente":this.idCliente,
      "documento":this.documento,
      "nombre":this.nombre,
      "nombreCorto":this.nombrecorto,
      "direccion":this.direccion,
      "email":this.email,
      "ciudad":this.ciudad,
      "telefonoFijo":this.telefonoFijo,
      "telefonoCelular":this.telefonoCelular,
      "atencion":this.atencion,
      "estado": this.estadoCliente
    }
    this._AppService.put('cliente/'+this.idCliente,this.actualizar).subscribe(
      result=>{
        alert('Los datos se han actualizado'),this.actualizar=result;
      this.estado=true
      this.getTerceros()
        
      } 
    )
  }
   //GET TERCEROS
   public getTerceros(){
    this._AppService.get(`clientes/list`).subscribe(
      result =>{
        this.clientes = result;
      },
      error =>{
        console.log(error);
      });
  }
  ngOnInit() {
    this.getTerceros();
    this.datos = this._formBuilder.group({
      documento: ['', Validators.compose([Validators.required])],
      nombre: ['', Validators.compose([Validators.required])],
      nombreCorto: ['', Validators.compose([Validators.required])],
      direccion: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      ciudad: ['', Validators.compose([Validators.required])],
      telefonoCelular: ['', Validators.compose([Validators.required])],
      telefonoFijo: ['', Validators.compose([Validators.required])],
      atencion: ['', Validators.compose([Validators.required])],  
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
 
  alerta(titulo: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'success',
      title: 'El registro a sido exitoso!'
    })
  }
  public deleteCliente(){
    const clienteJson = {
      "idCliente":this.idCliente,
      "documento":this.documento,
      "nombre":this.nombre,
      "nombreCorto":this.nombrecorto,
      "direccion":this.direccion,
      "email":this.email,
      "ciudad":this.ciudad,
      "telefonoFijo":this.telefonoFijo,
      "telefonoCelular":this.telefonoCelular,
      "atencion":this.atencion,
      "estado": 9
    }
    this._AppService.put(`cliente/${this.idCliente}`, clienteJson).subscribe(
      data => {
        console.log("Cliente eliminado")
        this.getTerceros();
      },
      error => {
        console.log(error)
      }
    )
  }
}
