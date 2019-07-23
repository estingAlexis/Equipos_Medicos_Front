import { Component, OnInit, Input} from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

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
  public nombreCorto:any;
  @Input()
  public documento:any;
  private idTecnico:number;

  constructor(private service: AppService) {
    this.estado=true;
   }

  ngOnInit() {
    this.getTecnicos();
  }
  //AGREGAR TECNICOS
  public postagregarTecnicos(){
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
  success(string:Title){
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

}
