import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/services/app.service';
import { Settings } from '../../../../app.settings.model';
import { AppSettings } from '../../../../app.settings';
@Component({
  selector: 'app-cotizaciones-list',
  templateUrl: './cotizaciones-list.component.html',
  styleUrls: ['./cotizaciones-list.component.scss'],

  providers: [DatePipe]
})
export class CotizacionesListComponent implements OnInit {
  @Output() setidcot = new EventEmitter();
  @Input()
  set recargar(val: any) {
    if (val != undefined && val != null && val > 0) {
      this.getCotizaciones();
    }
    val = null;
  }
  public settings: Settings;
  public data:Array<any>;
  public info: any;
  public display: boolean = false;
  public cols: any[];
  constructor(
    public appSettings:AppSettings,
    private _AppService: AppService,
    public ngxSmartModalService: NgxSmartModalService) { 
      this.settings = this.appSettings.settings;
      this.cols = [
        { field: 'codigo', header: 'Codigo' },
        { field: 'fkEmpresa', header: 'Empresa' },
        { field: 'fkCliente', header: 'Cliente' },
        { field: 'vigencia', header: 'Vigencia' },
        { field: 'entrega', header: 'Entrega' },
        { field: 'condicionPago', header: 'Condicion de Pago' },
        { field: 'responsable', header: 'Responsable' }
    ];
    }
  ngOnInit() {
    this.getCotizaciones();
  }
  public getCotizaciones(){
    this._AppService.get('cotizaciones/list').subscribe(
      (data:any) => {console.log(data); this.data = data}
    );
  }
  openForm() {
    this.setidcot.emit(this.data.length);
  }

  public getImg(imgNombre: string): string{
    return '../../../../../assets/img/'+imgNombre;
  }
}
