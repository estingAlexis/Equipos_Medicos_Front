import { Usuario } from './../../../../models/usuario';
import { Component, OnInit, Input} from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tecnicos-table',
  templateUrl: './tecnicos-table.component.html',
  styleUrls: ['./tecnicos-table.component.scss']
})
export class TecnicosTableComponent implements OnInit {

  public tecnicos;
  public estado:boolean;
  public agregarTecnico:any;
  public actualizar:any;
  @Input()
  public nombre:any;
  @Input()
  public apellido:any;
  @Input()
  public nombreCorto:any;
  @Input()
  public direccion:any;
  @Input()
  public telefonoFijo:any;
  @Input()
  public telefonoCelular:any;
  @Input()
  public email:any;
  @Input()
  public ciudad:any;
  @Input()
  public documento:any;
  @Input()
  public username:any;
  public usuario: Usuario;  
  public delete:any;
  private idTecnico:number;

  constructor(private service: AppService, private auth: AuthService) {
    this.estado=true;
    this.usuario = this.auth.obtenerDatosUser();
   }

  ngOnInit() {
    this.getTecnicos();
  }
  //AGREGAR TECNICOSF
  public postagregarTecnicos(){
    const newUser = {
      "apellido": this.apellido,
      "email": this.email,
      "nombre": this.nombre,
      "password": this.documento,
      "username": this.username,
      "documento": this.documento,
      "fkEmpresa": this.usuario.empresa.idEmpresa,
      "enabled": 0,
      "expirado": 0
    }
    this.agregarTecnico={
      "nombre":this.nombre,
      "nombreCorto":this.nombreCorto,
      "documento":this.documento,
      "direccion":this.direccion,
      "email":this.email,
      "ciudad":this.ciudad,
      "telefonoFijo":this.telefonoFijo,
      "telefonoCelular":this.telefonoCelular, 
      "fkEmpresa":this.usuario.empresa.idEmpresa,
      "estado":1
    }
    this.service.post('tecnicos/new',this.agregarTecnico).subscribe(
      result=>{ this.success
        this.agregarTecnico=result;
        this.estado=true;
        this.getTecnicos();
      }
    )
    this.service.post('usuarios/new',newUser).subscribe(
      result=>{ 
        console.log(result);
      }
    )
  }
  clear(){
    this.nombre=null;
    this.documento=null;
    this.direccion=null;
    this.ciudad=null;
    this.email=null;
    this.telefonoCelular=null;
    this.telefonoFijo=null;
    this.nombreCorto=null;
    
  }
  //TRAER DATOS ID
  public SeleTecnico(tecnico:any){
    this.idTecnico=tecnico.idTecnico;
    this.nombre=tecnico.nombre;
    this.nombreCorto=tecnico.nombreCorto;
    this.direccion=tecnico.direccion;
    this.telefonoFijo=tecnico.telefonoFijo;
    this.telefonoCelular=tecnico.telefonoCelular;
    this.email=tecnico.email;
    this.ciudad=tecnico.ciudad;
    this.documento=tecnico.documento;
  }
  //METODO ACTUALIZAR
  public editarTecnicos(){
    this.actualizar={
      "idTecnico":this.idTecnico,
      "nombre":this.nombre,
      "nombreCorto":this.nombreCorto,
      "documento":this.documento,
      "direccion":this.direccion,
      "email":this.email,
      "ciudad":this.ciudad,
      "telefonoFijo":this.telefonoFijo,
      "telefonoCelular":this.telefonoCelular,
    }
    this.service.put('tecnicos/'+this.idTecnico,this.actualizar).subscribe(
      result=>{alert('Se actualizado')
      this.estado=true;

      }
    )
  }


  //GET Tecnicos
  public getTecnicos(){
    this.service.get('tecnicos/list').subscribe(
      data => {
        this.tecnicos = data;
        console.log(this.tecnicos);
      },
      err => {
        console.log(err);
      }
    )
  }
  public success(title: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
    
    Toast.fire({
      type: 'success',
      title: 'El tecnico fue agregado con exito!'
    })
  }
// CAMBIAR ESTADO DE TECNICOS
  public deleteTecnico(){
     const deleteTecnico = {
      "idTecnico":this.idTecnico,
      "fkEmpresa": this.usuario.empresa.idEmpresa,
      "nombre":this.nombre,
      "nombreCorto":this.nombreCorto,
      "documento":this.documento,
      "direccion":this.direccion,
      "email":this.email,
      "ciudad":this.ciudad,
      "telefonoFijo":this.telefonoFijo,
      "telefonoCelular":this.telefonoCelular,
      "estado": 9,
    } 
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
        this.service.put('tecnicos/'+this.idTecnico, deleteTecnico).subscribe(
          data =>{
            console.log(data)
            this.getTecnicos();
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
