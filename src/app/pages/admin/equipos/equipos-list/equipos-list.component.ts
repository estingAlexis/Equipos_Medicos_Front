import { Component, OnInit } from '@angular/core';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { AppService } from 'src/app/app.service';
import { MatDialog } from '@angular/material';
import { EquiposFormComponent } from '../equipos-form/equipos-form.component';
@Component({
  selector: 'app-equipos-list',
  templateUrl: './equipos-list.component.html',
  styleUrls: ['./equipos-list.component.scss']
})
export class EquiposListComponent implements OnInit {
  public settings: Settings;
  public equipos: any;
  constructor(
    public appSettings: AppSettings,
    public dialog: MatDialog,
    private _AppService: AppService
  ) { this.settings = this.appSettings.settings }
  ngOnInit() {
    this.getEquipos();
  }
  public getEquipos() {
    this._AppService.get(`equipos/list`,data => { console.log(data); this.equipos = data });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(EquiposFormComponent, {
      width: '250px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
