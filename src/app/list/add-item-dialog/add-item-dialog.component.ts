import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {

  public item: any;
  public formGroup: FormGroup;
  public nameControl: FormControl;

  constructor(private dialogRef: MatDialogRef<AddItemDialogComponent>) {
    this.item = {
      checked: false,
    };

    this.nameControl = new FormControl('', Validators.required);
    this.formGroup = new FormGroup({
      name: this.nameControl,
    });
  }

  ngOnInit() {
  }

  close(item) {
    if (item) {
      item.createdAt = new Date().getTime();
    }
    this.dialogRef.close(item);
  }

}
