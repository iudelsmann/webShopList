import { Component, OnInit } from '@angular/core';
import { ShareRequest } from '../../model/list-item.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-share-list-dialog',
  templateUrl: './share-list-dialog.component.html',
  styleUrls: ['./share-list-dialog.component.scss']
})
export class ShareListDialogComponent implements OnInit {

  public shareRequest: ShareRequest;
  public formGroup: FormGroup;
  public emailControl: FormControl;

  constructor(private dialogRef: MatDialogRef<ShareListDialogComponent>) {
    this.shareRequest = {} as ShareRequest;

    this.emailControl = new FormControl('', [Validators.required, Validators.email]);
    this.formGroup = new FormGroup({
      email: this.emailControl,
    });
  }

  ngOnInit() {
  }

  close(shareRequest) {
    this.dialogRef.close(shareRequest);
  }
}
