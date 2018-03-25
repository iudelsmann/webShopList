import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public items: object[];

  constructor() {
    this.items = [{ name: 'item 1', checked: false }, { name: 'item 2', checked: true }, { name: 'item 3', checked: true }];
  }

  ngOnInit() {
  }

  toggleCheck(item) {
    item.checked = !item.checked;
  }

}
