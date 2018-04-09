import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { Router } from '@angular/router';
import { List } from '../model/list-item.model';

/**
 * Home compoenent. Displays the available lists and allows to add, remove and navigate to list details.
 *
 * @export
 * @class HomeComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /**
   * Reference to the list collection in firebase.
   *
   * @private
   * @type {AngularFirestoreCollection<List>}
   */
  private listCollection: AngularFirestoreCollection<List>;

  /**
   * The list collection itself.
   *
   * @type {Observable<List[]>}
   */
  public lists: Observable<List[]>;

  /**
   * Creates an instance of HomeComponent.
   * @param {AngularFirestore} db injected firestore service
   * @param {MatDialog} dialog injected material dialog service
   * @param {Router} router injected router service
   */
  constructor(private db: AngularFirestore, private dialog: MatDialog, private router: Router) {
  }

  /**
   * Called after initializing the componenet. Loads the list collection from firestore.
   *
   */
  ngOnInit() {
    this.listCollection = this.db.collection('lists', ref => ref.orderBy('createdAt'));
    this.lists = this.listCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data } as List;
      });
    });
  }

  /**
   * Opens a dialog to add a new list.
   */
  openDialog() {
    this.dialog.open(AddListDialogComponent).afterClosed().subscribe(this.addList.bind(this));
  }

  /**
   * Adds a new list to the collection. Navigates to the new list.
   *
   * @param {List} list the new list to be saved
   */
  private async addList(list: List) {
    if (list) {
      const ref = await this.listCollection.add(list);
      this.router.navigate(['/list', ref.id]);
    }
  }

  /**
   * Deletes a list from the collection.
   *
   * @param {List} list the list to be deleted
   */
  async delete(list: List) {
    this.db.doc<List>(`listsItems/${list.id}`).delete();

    await this.deleteListItems(list);
    this.listCollection.doc<List>(list.id).delete();
  }

  /**
   * Delete the items of a list. This is necessary as it isn't allowed to delete a document that contains a collection.
   *
   * @private
   * @param {any} list the list to be deleted
   * @returns {Promise<void>} a promise that resolves to void when the list is deleted
   */
  private async deleteListItems(list: List) {
    const querySnap = await this.db.collection(`listsItems/${list.id}/items`).ref.get();

    const batch = this.db.firestore.batch();
    querySnap.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  }
}
