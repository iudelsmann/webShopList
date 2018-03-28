import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { MatDialog } from '@angular/material';
import { AddListDialogComponent } from './add-list-dialog/add-list-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  private listCollection: AngularFirestoreCollection<any>;
  public lists: Observable<any[]>;

  constructor(private db: AngularFirestore, private dialog: MatDialog, private router: Router) {
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

  async addList(list) {
    if (list) {
      const ref = await this.listCollection.add(list);
      this.router.navigate(['/list', ref.id]);
    }
  }

  async delete(list) {
    this.db.doc<any>(`listsItems/${list.id}`).delete();

    await this.deleteListItems(list);
    this.listCollection.doc<any>(list.id).delete();
  }

  /**
   * Delete the items of a list. This is necessary as it isn't allowed to delete a document that contains a collection.
   *
   * @private
   * @param {any} list the list to be deleted
   * @returns {Promise<void>} a promise that resolves to void when the list is deleted
   */
  private async deleteListItems(list) {
    const querySnap = await this.db.collection(`listsItems/${list.id}/items`).ref.get();

    const batch = this.db.firestore.batch();
    querySnap.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    return batch.commit();
  }
}
