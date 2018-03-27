import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-list-dialog',
  templateUrl: './add-list-dialog.component.html',
  styleUrls: ['./add-list-dialog.component.scss']
})
export class AddListDialogComponent implements OnInit {

  public list: object;
  public formGroup: FormGroup;
  public nameControl: FormControl;

  constructor(private dialogRef: MatDialogRef<AddListDialogComponent>) {
    this.list = {};

    this.nameControl = new FormControl('', Validators.required);
    this.formGroup = new FormGroup({
      name: this.nameControl,
    });
  }

  ngOnInit() {
  }

  close(list) {
    if (list) {
      list.createdAt = new Date().getTime();
    }
    this.dialogRef.close(list);
  }
}
