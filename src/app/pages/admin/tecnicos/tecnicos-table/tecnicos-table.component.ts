import { Component, OnInit, Input} from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/usuario';
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
  public datos: FormGroup;
  public datoschanged: boolean = true;
  public usuario:Usuario;
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
  public delete:any;
  private idTecnico:number;

  constructor(private service: AppService, private _formBuilder: FormBuilder,private servicio:AuthService) {
    this.estado=true;
   }

  
  //AGREGAR TECNICOSF
  public postagregarTecnicos(){
    let datos = this.datos.value;
    this.agregarTecnico={
      "nombre":datos.nombre,
      "nombreCorto":datos.nombreCorto,
      "documento":datos.documento,
      "direccion":datos.direccion,
      "email":datos.email,
      "ciudad":datos.ciudad,
      "telefonoFijo":datos.telefonoFijo,
      "telefonoCelular":datos.telefonoCelular,
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
  }
  //dejar campos vacios
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
    this.datos.patchValue({
   
    nombre:tecnico.nombre,
    nombreCorto:tecnico.nombreCorto,
    direccion:tecnico.direccion,
    telefonoFijo:tecnico.telefonoFijo,
    telefonoCelular:tecnico.telefonoCelular,
    email:tecnico.email,
    ciudad:tecnico.ciudad,
    documento:tecnico.documento,
  });
  this.idTecnico=tecnico.idTecnico;
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
  success(title:string){
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
    this.getTecnicos()
    this.service.put('tecnicos/'+this.idTecnico, deleteTecnico).subscribe(
      data =>{
        console.log(data)

      },
      error => {
        console.log(error)
      }
    )
  } 
  ngOnInit() {
    this.getTecnicos();
    this.usuario = this.servicio.obtenerDatosUser();
    this.datos = this._formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      nombreCorto: ['', Validators.compose([Validators.required])],
      direccion: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      ciudad: ['', Validators.compose([Validators.required])],
      telefonoCelular: ['', Validators.compose([Validators.required])],
      telefonoFijo: ['', Validators.compose([Validators.required])],
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
