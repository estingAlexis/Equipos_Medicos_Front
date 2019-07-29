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
  public revision;
  public responsable;

  public estado: string = '';

  constructor(private service: AppService) {

  }

  ngOnInit() {
    this.getProtocolos();
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

}
