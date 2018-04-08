import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { MatDialog } from '@angular/material';

import * as _ from 'lodash';

import 'rxjs/add/operator/first';
import { ListItem } from '../model/list-item.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  private itemCollection: AngularFirestoreCollection<ListItem>;
  public items: Observable<ListItem[]>;

  public list: Observable<any>;

  private listId: string;

  public loading = true;

  constructor(private route: ActivatedRoute, private db: AngularFirestore, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listId = params['listId'];
      this.list = this.db.doc<any>(`lists/${this.listId}`).valueChanges();

      this.itemCollection = this.db.collection(`listsItems/${this.listId}/items`, ref => ref.orderBy('createdAt'));
      this.items = this.itemCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data } as ListItem;
        });
      });

      this.items.first().subscribe(() => { this.loading = false; });
    });
  }

  update(item: ListItem) {
    this.itemCollection.doc(item.id).update(_.omit(item, 'id'));
  }

  openDialog() {
    this.dialog.open(AddItemDialogComponent).afterClosed().subscribe(this.addItem.bind(this));
  }

  addItem(item: ListItem) {
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

  async removeChecked() {
    const querySnap = await this.db.collection(`listsItems/${this.listId}/items`).ref.where('checked', '==', true).get();

    const batch = this.db.firestore.batch();
    querySnap.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  }
}
