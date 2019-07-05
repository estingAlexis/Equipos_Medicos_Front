import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { DatePipe } from '@angular/common';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-cotizaciones-list',
  templateUrl: './cotizaciones-list.component.html',
  styleUrls: ['./cotizaciones-list.component.scss'],
  providers: [DatePipe]
})
export class CotizacionesListComponent implements OnInit {
  @Output() setidcot = new EventEmitter();
  data:Array<any>;
  info: any;
  display: boolean = false;
  constructor(
    private _AppService: AppService,
    public ngxSmartModalService: NgxSmartModalService) { }
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
