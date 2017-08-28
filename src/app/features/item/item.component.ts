import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { DialogService } from 'ng2-bootstrap-modal';

import { Item } from './item';
import { ItemService } from './item.service';
import { ConfirmDialogComponent } from '../../shared/modules/confirm-dialog/confirm-dialog.component';

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
    private itemService: ItemService,
    private dialogService: DialogService
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

  showConfirmDialog(item: Item) {
    let disposable = this.dialogService.addDialog(ConfirmDialogComponent, {
      title:'Confirmar remoção', 
      message: `Deseja remover o item ${item.descricao} ?`
    }).subscribe((isConfirmed) => {
      //We get dialog result
      if(isConfirmed) {
        this.remove(item);
      }
    });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(() => {
      disposable.unsubscribe();
    },10000);
  }

  remove(item: Item) {
    this.itemService.remove(item.id).subscribe(
      () => {
        let index = this.data.indexOf(item);
        this.data.splice(index, 1);
        alert('Item removido com sucesso.');
      },
      () => {
        alert('Erro ao tentar remover item.');
      }
    );
  }
}