import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Slide } from '../../../constants';
@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styleUrls: ['./protocolo.component.scss'],
  animations: [Slide]
})
export class ProtocoloComponent implements OnInit {
  public data: any;
  constructor(private _AppService: AppService) { }
  ngOnInit() {
  }
}
