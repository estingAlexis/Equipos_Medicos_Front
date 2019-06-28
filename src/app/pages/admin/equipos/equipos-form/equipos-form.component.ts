import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-equipos-form',
  templateUrl: './equipos-form.component.html',
  styleUrls: ['./equipos-form.component.scss']
})
export class EquiposFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EquiposFormComponent>) { }

  ngOnInit() {
  }

  close(): void {
    this.dialogRef.close();
  }

}
