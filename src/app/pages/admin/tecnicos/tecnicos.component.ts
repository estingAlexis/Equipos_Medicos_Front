import { Component, OnInit } from '@angular/core';
import { Slide } from 'src/app/services/constants';

@Component({
  selector: 'app-tecnicos',
  templateUrl: './tecnicos.component.html',
  styleUrls: ['./tecnicos.component.scss'],
  animations: [Slide]
})
export class TecnicosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
