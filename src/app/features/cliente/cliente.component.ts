import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription} from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit, OnDestroy {

  data: Cliente[] = [];
  filterQuery: string = '';
  subscription: Subscription;

  constructor(
    private clienteService: ClienteService,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef
  ) { }

  ngOnInit() {
    this.list();
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  list() {
    this.clienteService.list().subscribe(
      clientes => this.data = clientes,
      error => {
        this.showWarning();
      }
    );
  }

  showWarning() {
    this.toastr.warning('Não foi possível carregar a lista de clientes.','Importante!');
  }

}
