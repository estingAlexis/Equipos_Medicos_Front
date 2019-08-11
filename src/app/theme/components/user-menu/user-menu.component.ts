import { AuthService } from './../../../services/auth.service';
import { AppService } from './../../../services/app.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuario } from 'src/app/services/usuario';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})


export class UserMenuComponent implements OnInit {

  public usuario: Usuario;
  public userImage;
  
constructor(private auth:AuthService, private appService:AppService) {

}

ngOnInit() {
  this.usuario = this.auth.obtenerDatosUser();
  this.userImage = this.appService.url+'fotoPerfil/'+this.usuario.foto;
}

}