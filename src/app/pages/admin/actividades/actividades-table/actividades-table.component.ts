import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { NgxSmartModalService } from 'ngx-smart-modal';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actividades-table',
  templateUrl: './actividades-table.component.html',
  styleUrls: ['./actividades-table.component.scss']
})
export class ActividadesTableComponent implements OnInit {
  @Input() data:any;
  public actividades: any;
  public protocolos: any;
  public searchText:string;
  public settings: Settings;
  public cols: any;
  public masInfo: boolean = false;
  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public appSettings:AppSettings,
    private _AppService: AppService,
    ) { 
    this.settings = this.appSettings.settings; 
  }
  ngOnInit() {
  }
  public getImg(imgNombre: string): string{
    return '../../../../../assets/img/'+imgNombre;
  }

  public parametro;

  public editarActividad(id) {
    this._AppService.getParametroById(id).subscribe(
      data => {
        this.parametro = data;
        console.log(data);
      }
    );
    console.log(this.parametro);
    this.ngxSmartModalService.getModal('modalEditarActividad').open();
    return true
  }

  public eliminarActividad(){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    });
}



}