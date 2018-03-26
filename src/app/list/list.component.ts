import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

  private itemCollection: AngularFirestoreCollection<any>;
  public items: Observable<any[]>;

  private paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private db: AngularFirestore) {
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.itemCollection = this.db.collection(`listsItems/${params['listId']}/items`);
      this.items = this.itemCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      });
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  update(item) {
    this.itemCollection.doc(item.id).update(_.omit(item, 'id'));
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
