import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.scss']
})
export class CotizacionesComponent implements OnInit {
  public idcot: number;
  public showForm: boolean;
  public showList: boolean;
  constructor() { this.showList = true }
  ngOnInit() {
  }
  openForm(data:number){
    this.idcot = data; 
    this.showList = false; 
    this.showForm = true
  }
}
