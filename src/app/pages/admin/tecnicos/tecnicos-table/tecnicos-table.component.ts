import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-tecnicos-table',
  templateUrl: './tecnicos-table.component.html',
  styleUrls: ['./tecnicos-table.component.scss']
})
export class TecnicosTableComponent implements OnInit {

  public tecnicos;

  constructor(private restService: AppService) { }

  ngOnInit() {
    this.getTecnicos();
  }

  //GET Tecnicos
  public getTecnicos(){
    this.restService.get('tecnicos/list').subscribe(
      data => {
        this.tecnicos = data;
        console.log(this.tecnicos);
      },
      err => {
        console.log(err);
      }
    )
  }

}
