import { APP } from './../../../constants';
import { Usuario } from './../../../services/usuario';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})


export class PerfilComponent implements OnInit {
  
  @ViewChild('file')
  myInputVariable: ElementRef;
  idUser: any;
  usuario: Usuario;
  UrlImages = APP.UrlImages;
  userImg;
  imagePath;
  imgURL: any;
  message: string;
  logoSeleccionado: File;

  constructor(private appService:AppService, private auth:AuthService, public ngxSmartModalService:NgxSmartModalService) {

    this.usuario  = this.auth.obtenerDatosUser();
    console.log(this.usuario.id);

   }


  ngOnInit() {
    this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    this.idUser = this.usuario.id;
    this.getDataUser(this.idUser);
  }

  getDataUser(id:any) {
    this.appService.get(`usuarios/${id}`).subscribe(
      result=>{
        this.userImg = result['foto'];
      }
    );
  }
  verLogo (files: any) {

    if (files.length === 0) {
      // this.imgURL = './assets/img/image_placeholder.jpg';
      return;
    }

    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Solo imágenes son suportadas.';
      return;
    }

    let reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  seleccionarLogo(event) {

    if (event.target.files[0] != 0 && event.target.files[0] != undefined){
      this.logoSeleccionado = event.target.files[0];
      this.ngxSmartModalService.getModal('myModal').open();
    }
  }


  clearImage() {
    console.log(this.myInputVariable.nativeElement.files);
    this.myInputVariable.nativeElement.value = "";
    console.log(this.myInputVariable.nativeElement.files);
}

  subirLogo() {
    if (!this.logoSeleccionado) {
      Swal.fire('Error de carga: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.appService.subirImagen(this.logoSeleccionado, this.usuario.id).subscribe(
        result => {
          //this.entidad = result;
          Swal.fire({type: 'success', title: 'Exito!', text: `${result.mensaje}`, timer: 3000});
/*           this.regresar.emit(); */
          this.ngxSmartModalService.getModal('myModal').close();
          // this.getDataUser(this.usuario.id);
          
        }
      );
      window.location.reload();

    }
  }









  public thisFileUpload() {
      document.getElementById("file").click();
  };
  
}
