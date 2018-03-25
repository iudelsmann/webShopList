import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public lists: object[];

  constructor() {
    this.lists = [{ name: 'lista 1' }, { name: 'lista 2' }, { name: 'lista 3' }];
  }

  ngOnInit() {

  }

}
