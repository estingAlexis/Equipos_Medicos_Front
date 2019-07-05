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
  public TableRec: any = 0
  constructor() { this.showList = true }
  ngOnInit() {
  }
  openForm(data:number){
    this.idcot = data; 
    this.showList = false; 
    this.showForm = true
  }
  closeForm(){
    this.showForm = false;
    this.showList = true;
    this.recargarTable();
  }
  recargarTable() {
    this.TableRec = this.TableRec + 1;
  }
}
