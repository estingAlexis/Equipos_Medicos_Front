import { NgxSmartModalService } from 'ngx-smart-modal';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/app.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-protocolos-table',
  templateUrl: './protocolos-table.component.html',
  styleUrls: ['./protocolos-table.component.scss']
})
export class ProtocolosTableComponent implements OnInit {

  public protocolos:any = [];

  
  public idProtocolo;
  public codigo;
  public nombre;
  public descripcion;
  @Input()
  public revision;
  public responsable; 

  public estado: string = '';

  constructor(private service: AppService, private auth:AuthService) {

  }

  ngOnInit() {
    this.getProtocolos();
  }

  public usuario = this.auth.obtenerDatosUser();
  public empresa = this.usuario.empresa.idEmpresa;

  

  public getTiempoRevision(){

    console.log(this.revision)
    
  }

  public seleccionarProtocolo(protocolo) {
    this.idProtocolo = protocolo.idProtocolo;
    this.codigo = protocolo.codigo;
    this.nombre = protocolo.nombre;
    this.descripcion = protocolo.descripcion;
    this.responsable = protocolo.responsable;
    this.estado = protocolo.estado;
  }

  public tecnicos;

  public getTecnicos() {
    this.service.get('tecnicos/list').subscribe(
      data => {
        this.tecnicos = data;
        console.log(this.tecnicos);
      }
    )
  }

  public getProtocolos() {
    this.service.get('protocolos/list').subscribe(
      data => {
        this.protocolos = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  public newProtocolo() {
    const json = {
      "fkEmpresa": this.empresa,
      'idProtocolo': this.idProtocolo,
      'codigo': this.codigo,
      'nombre': this.nombre,
      'descripcion': this.descripcion,
      'revision': this.revision,
      'responsable': this.responsable,
      "estado": 0
    }
    this.service.post('protocolos/new', json).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    this.getProtocolos();
  }

  //  (  `  )

  public updateProtocolo() {
    const json = {
      'idProtocolo': this.idProtocolo,
      'codigo': this.codigo,
      'nombre': this.nombre,
      'descripcion': this.descripcion,
      'revision': this.revision,
      'responsable': this.responsable,
    }
    this.service.put(`protocolos/${this.idProtocolo}`, json).subscribe(
      data => {

      }
    )
  }


  public deleteProtocolo() {
    const json = {
      "fkEmpresa": this.empresa,
      "idProtocolo": this.idProtocolo,
      "codigo": this.codigo,
      "nombre": this.nombre,
      "descripcion": this.descripcion,
      "revision": "2019-08-30",
      "responsable": this.responsable,
      "estado": 9
    }
    console.log(json);
   
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
            this.service.put(`protocolos/${this.idProtocolo}`, json).subscribe(
              data => {
                this.getProtocolos();
                this.estado = '';
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