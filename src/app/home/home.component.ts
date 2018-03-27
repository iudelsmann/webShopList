import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private listCollection: AngularFirestoreCollection<any>;
  public lists: Observable<any[]>;

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.listCollection = this.db.collection('lists', ref => ref.orderBy('createdAt'));
    this.lists = this.listCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  openDialog() {
    this.dialog.open(AddListDialogComponent).afterClosed().subscribe(this.addList.bind(this));
  }

  addList(list) {
    if (list) {
      this.listCollection.add(list);
    }
  }
}
