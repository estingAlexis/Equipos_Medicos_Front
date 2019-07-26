import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { ApiRestService } from 'src/app/services/ApiRestService.service';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
    public usuarios;
    public estado:string;
    public nUsuario:any;
    public usuario:Usuario;
    public idUsuario:number;
    public vacio:any;
    //INPUT 
    @Input()
    public nombre:any
    @Input()
    public apellido:any
    @Input()
    public documento:any
    @Input()
    public email:any
    @Input()
    public username:any
    @Input()
    public password:any
    constructor(public servivio:ApiRestService, public service:AuthService){
    this.estado='previa';
    }
    // LISTAR LOS USUARIOS
    public listarUsuario(){
        this.servivio.get('usuarios/list').subscribe(
            result=>{this.usuarios=result
            console.log(this.usuarios)
        }
        )
    }
    //AGREGAR NUEVOS USUARIOS
    public postUsuario(){
        this.nUsuario=[];
        this.nUsuario={
            "nombre":this.nombre,
            "apellido":this.apellido,
            "documento":this.documento,
            "email":this.email,
            "enabled":1,
            "username":this.username,
            "fkEmpresa":this.usuario.empresa.idEmpresa, 
            "password":this. password
        }
        console.log(this.nUsuario)
        this.servivio.post('usuario/new',this.nUsuario).subscribe(
            result=>{console.log(result)
            alert('Usuario a sido registrado exitosamente')
            this.nUsuario=result
        this.clear()
    }
        )
    }
    //METODO PARA VACIAR DATOS
    clear(){
        this.nombre= null;
        this.password=null;
        this.documento=null;
        this.email=null;
        this.apellido=null;
        this.username=null;

    }
    // OBTENER DATOS DEL USUARIO
    public SetUsuario(Usuario: any){
        console.log(Usuario);
        this.idUsuario=Usuario.idUsuario;
        this.nombre=Usuario.nombre;
        this.apellido=Usuario.apellido;
        this.email=Usuario.email;
        this.documento=Usuario.documento;
        this.username=Usuario.username; 
      }

    ngOnInit() {
        this.listarUsuario();
        this.usuario= this.service.obtenerDatosUser();
    }
}
