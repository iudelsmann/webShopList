import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

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
      this.items = this.itemCollection.valueChanges();
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  toggleCheck(item) {
    item.checked = !item.checked;
  }

}
