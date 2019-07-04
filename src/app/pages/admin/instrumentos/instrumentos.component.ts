import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import {Slide} from '../../../constants';
@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['./instrumentos.component.scss'],
  animations: [Slide]
})
export class InstrumentosComponent implements OnInit {
  public instrumentos: any;
  constructor(private _AppService: AppService) { }

  ngOnInit() {
  }
}
