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
  @Input()
  public codigo;
  @Input()
  public nombre;
  @Input()
  public descripcion;
  @Input()
  public revision;
  @Input()
  public responsable;

  public estado: string = '';

  constructor(private service: AppService, private auth: AuthService) {

  }

  ngOnInit() {
    this.getProtocolos();
  }

  public usuario = this.auth.obtenerDatosUser();
  public empresa = this.usuario.empresa.idEmpresa;

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
      'fkEmpresa': this.empresa,
      'idProtocolo': this.idProtocolo,
      'codigo': this.codigo,
      'nombre': this.nombre,
      'descripcion': this.descripcion,
      'revision': this.revision,
      'responsable': this.responsable,
    }
    this.service.post('protocolos/new', json).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
      }
    )
    this.getProtocolos()
  }

  //  (  `  )

  public updateProtocolo() {
    const json = {
      'fkEmpresa': this.empresa,
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
      'fkEmpresa': this.empresa,
      'idProtocolo': this.idProtocolo,
      'codigo': this.codigo,
      'nombre': this.nombre,
      'descripcion': this.descripcion,
      'revision': this.revision,
      'responsable': this.responsable,
      'estado': 9
    }
    this.service.put(`protocolos/${this.idProtocolo}`, json).subscribe(
      data => {

      }
    )
  }

}
