import { Component, OnInit, Input} from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';

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
  public delete:any;
  private idTecnico:number;

  constructor(private service: AppService) {
    this.estado=true;
   }

  ngOnInit() {
    this.getTecnicos();
  }
  //AGREGAR TECNICOSF
  public postagregarTecnicos(){
    const newUser = {
      "nombre": this.nombre,
      "apellido": this.apellido,
    }
    this.agregarTecnico={
      "idTecnico":6,
      "nombre":this.nombre,
      "nombreCorto":this.nombreCorto,
      "documento":this.documento,
      "direccion":this.direccion,
      "email":this.email,
      "ciudad":this.ciudad,
      "telefonoFijo":this.telefonoFijo,
      "telefonoCelular":this.telefonoCelular,
      "fkEmpresa":1,
      "estado":1
    }
    this.service.post('tecnicos/new',this.agregarTecnico).subscribe(
      result=>{ this.success
        this.agregarTecnico=result;
        this.estado=true;
        this.getTecnicos();


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
      "fkEmpresa": 1,
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
