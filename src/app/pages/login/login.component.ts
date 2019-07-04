
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/services/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ApiRestService } from 'src/app/services/ApiRestService.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {

  title = 'Equipos Medicos';

  usuario: Usuario;
  
  constructor(private auth: AuthService, private router: Router, private api: ApiRestService) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }


  

}