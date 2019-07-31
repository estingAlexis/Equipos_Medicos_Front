import { Component, OnInit, Input} from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/services/app.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
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

  constructor(
    public appSettings:AppSettings,
    private _AppService:AppService,
  public ngxSmartModalService: NgxSmartModalService
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
       this.nuevoC={
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
      this._AppService.post('clientes/new', this.nuevoC).subscribe(
        result=>{ alert('El cliente se agregado con exito'), 
        this.estado=true
        this.getTerceros();
      }
      )
   }
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
     console.log(cliente)
    this.idCliente=cliente.idCliente;
    this.nombre=cliente.nombre;
    this.nombrecorto=cliente.nombrecorto;
    this.telefonoFijo=cliente.telefonoFijo;
    this.telefonoCelular=cliente.telefonoCelular;
    this.atencion=cliente.atencion;
    this.ciudad=cliente.ciudad;
    this.email=cliente.email;
    this.direccion=cliente.direccion;
    this.documento=cliente.documento;
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
  ngOnInit() {
    this.getTerceros();
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
