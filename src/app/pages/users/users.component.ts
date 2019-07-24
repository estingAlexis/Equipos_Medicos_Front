import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AppSettings } from '../../app.settings';
import { Settings } from '../../app.settings.model';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { ApiRestService } from 'src/app/services/ApiRestService.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit {
   public usuario:any;
    constructor(public appSettings:AppSettings, 
                public dialog: MatDialog,public servivio:ApiRestService){
    
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
