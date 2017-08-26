import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';

export interface ConfirmModel {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent
extends DialogComponent<ConfirmModel, boolean>
implements ConfirmModel, OnInit {

  title: string;
  message: string;

  constructor(dialogService: DialogService) {
    super(dialogService)
  }

  ngOnInit() { }

  confirm() {
    this.result = true;
    this.close();
  }

}
