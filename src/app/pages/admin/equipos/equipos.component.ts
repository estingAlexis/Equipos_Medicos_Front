import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import {Slide} from '../../../constants';
@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.scss'],
  animations: [Slide]
})
export class EquiposComponent implements OnInit {
  public equipos: any;
  constructor(private _AppService: AppService) { }

  ngOnInit() {
  }
}
