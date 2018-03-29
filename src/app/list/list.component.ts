import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { MatDialog } from '@angular/material';

import * as _ from 'lodash';

import 'rxjs/add/operator/first';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private itemCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;

  public list: Observable<any>;

  public loading = true;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.list = this.db.doc<any>(`lists/${params['listId']}`).valueChanges();

      this.itemCollection = this.db.collection(`listsItems/${params['listId']}/items`, ref => ref.orderBy('createdAt'));
      this.items = this.itemCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });

      this.items.first().subscribe(() => { this.loading = false; });
    });
  }

  update(item) {
    this.itemCollection.doc(item.id).update(_.omit(item, 'id'));
  }

  openDialog() {
    this.dialog.open(AddItemDialogComponent).afterClosed().subscribe(this.addItem.bind(this));
  }

  addItem(item) {
    if (item) {
      this.itemCollection.add(item);
    }
  }

  /**
   * Function to track items improving performance. Avoids rerendering list items.
   *
   * @param index index of the item in the list
   * @param item the item to be tracked
   */
  trackByFn(index, item) {
    return item.id;
  }
}
