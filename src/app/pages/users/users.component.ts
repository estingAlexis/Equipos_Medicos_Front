import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { ApiRestService } from 'src/app/services/ApiRestService.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
    public usuario;
    public estado:string;
    constructor(public servivio:ApiRestService){
    this.estado='previa';
    }
    public listarUsuario(){
        this.servivio.get('usuarios/list').subscribe(
            result=>{this.usuario=result
            console.log(this.usuario)
        }
        )
    }

    ngOnInit() {
        this.listarUsuario();
    }
}
