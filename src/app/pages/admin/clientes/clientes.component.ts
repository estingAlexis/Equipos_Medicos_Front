import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import {Slide} from '../../../constants';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
  animations: [Slide]
})
export class ClientesComponent implements OnInit {
  public data: any;
  constructor(private _AppService: AppService) { }

  ngOnInit() {
  }
}
