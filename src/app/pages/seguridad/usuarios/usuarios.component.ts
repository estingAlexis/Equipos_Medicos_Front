import { Component, OnInit, Input } from '@angular/core';
import { ApiRestService } from 'src/app/services/ApiRestService.service';
import { AuthService } from 'src/app/services/auth.service';
import { Usuario } from 'src/app/services/usuario';
import { APP } from 'src/app/constants';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public usuarios;
    public estado:string;
    public nUsuario:any;
    public usuario:Usuario;
    public id:number;
    public vacio:any;
    public actualizar:any;
    public estadoUsuario:any;
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
    imgUrl = APP.UrlImages;
    imgName;
    constructor(public servivio:ApiRestService, public service:AuthService){
    this.estado='previa';
    }
    

    ngOnInit() {
        this.usuario= this.service.obtenerDatosUser();
        this.listarUsuario();
        this.getDataUser(this.usuario.id);
        
    }

    getDataUser(id:any){
        this.servivio.get(`usuarios/${id}`).subscribe(
          result=>{
            this.imgName = result['foto'];
          }
        );
    
      }
    


    // LISTAR LOS USUARIOS
    public listarUsuario(){
        this.servivio.get('usuarios/list').subscribe(
            result=>{
                this.usuarios=result;
                console.log(this.usuarios);
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
            "password":this. password,
            "expirado":1
        }
        console.log(this.nUsuario)
        this.servivio.post('usuarios/new',this.nUsuario).subscribe(
            result=>{console.log(result)
            alert('Usuario a sido registrado exitosamente')
            this.nUsuario=result
            this.clear()
            this.estado='previa'
            this.listarUsuario();
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
        this.id=Usuario.id;
        this.nombre=Usuario.nombre;
        this.apellido=Usuario.apellido;
        this.email=Usuario.email;
        this.documento=Usuario.documento;
        this.username=Usuario.username; 
      }
      //ACTUALIZAR USUARIO
      public putUsuario(){
          this.actualizar={
            "id":this.id,
            "nombre":this.nombre,
            "apellido":this.apellido,
            "documento":this.documento,
            "email":this.email,
            "enabled":1,
            "username":this.username,
            "fkEmpresa":this.usuario.empresa.idEmpresa, 
            "expirado":1,
            "estado":this.estadoUsuario
          }
          this.servivio.put('usuarios/'+this.id,this.actualizar).subscribe(
              result=>{alert('ah sido actualizado exitosamente')
              this.estado='previa'
              this.listarUsuario();
            }, error =>{
                console.log(error);
            }
          )
      }



}
