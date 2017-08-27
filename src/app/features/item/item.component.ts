import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

import { Item } from './item';
import { ItemService } from './item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  data: Item[] = [];
  filterQuery: string = '';
  sub: Subscription;

  constructor(
    private itemService: ItemService
  ) { }

  ngOnInit() {
    this.list();
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  list() {
    this.sub = this.itemService.list().subscribe(
      itens => this.data = itens,
      error => alert('Erro ao carregar lista de itens')
    );
  }

}
