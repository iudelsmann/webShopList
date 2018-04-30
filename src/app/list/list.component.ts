import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { MatDialog } from '@angular/material';

import * as _ from 'lodash';

import 'rxjs/add/operator/first';
import { ListItem, List } from '../model/list-item.model';
import { AuthenticationService } from '../login/authentication.service';

/**
 * List compoenent. Displays the items of a list, allowing them to be checked/unchecked, added or removed.
 *
 * @export
 * @class ListComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  /**
   * Item collection reference.
   *
   * @private
   * @type {AngularFirestoreCollection<ListItem>}
   */
  private itemCollection: AngularFirestoreCollection<ListItem>;

  /**
   * The list of items itself.
   *
   * @type {Observable<ListItem[]>}
   */
  public items: Observable<ListItem[]>;

  /**
   * The currently displayed list document.
   *
   * @type {Observable<any>}
   */
  public list: Observable<any>;

  /**
   * The id of the currently displayed list.
   *
   * @private
   * @type {string}
   */
  private listId: string;

  /**
   * Bind variable to show/hide loading indicator.
   */
  public loading = true;

  /**
   * Creates an instance of ListComponent.
   * @param {ActivatedRoute} route injected activated route service
   * @param {AngularFirestore} db injected firestore service
   * @param {MatDialog} dialog injected material dialog service
   */
  constructor(private route: ActivatedRoute, private db: AngularFirestore, private dialog: MatDialog,
    private authenticationService: AuthenticationService) {
  }

  /**
   * Called after compoenent is initialized. Loads the collections from firestore.
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.listId = params['listId'];

      this.authenticationService.user.subscribe((user) => {
        this.list = this.db.doc<List>(`users/${user.uid}/lists/${this.listId}`).valueChanges();
      });

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

  /**
   * Updates and item. Used to mark the item as checked.
   *
   * @param {ListItem} item the new item values
   */
  update(item: ListItem) {
    this.itemCollection.doc(item.id).update(_.omit(item, 'id'));
  }

  /**
   * Opens a dialog to add a new item.
   */
  openDialog() {
    this.dialog.open(AddItemDialogComponent).afterClosed().subscribe(this.addItem.bind(this));
  }

  /**
   * Adds a new item in the current list.
   *
   * @private
   * @param {ListItem} item
   */
  private addItem(item: ListItem) {
    if (item) {
      this.itemCollection.add(item);
    }
  }

  /**
   * Function to track items improving performance. Avoids rerendering list items.
   *
   * @param index index of the item in the list
   * @param item the item to be tracked
   * @returns the item id, used as its unique identifier
   */
  trackByFn(index, item) {
    return item.id;
  }

  /**
   * Removes all checked items from the current list.
   *
   * @returns {Promise<void>} a promise that resolves to void when all items have been removed
   */
  async removeChecked() {
    const querySnap = await this.db.collection(`listsItems/${this.listId}/items`).ref.where('checked', '==', true).get();

    const batch = this.db.firestore.batch();
    querySnap.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  }
}
