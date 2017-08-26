import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { Subscription} from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DialogService } from 'ng2-bootstrap-modal';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { ConfirmDialogComponent } from '../../shared/modules/confirm-dialog/confirm-dialog.component';

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
    private viewContainer: ViewContainerRef,
    private dialogService: DialogService
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

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

  showConfirmDialog(cliente: Cliente) {
    let disposable = this.dialogService.addDialog(ConfirmDialogComponent, {
      title:'Confirmar remoção', 
      message: `Deseja remover o cliente "${cliente.nome}" ?`
    }).subscribe((isConfirmed) => {
      //We get dialog result
      if(isConfirmed) {
        this.remove(cliente);
      }
    });
    //We can close dialog calling disposable.unsubscribe();
    //If dialog was not closed manually close it by timeout
    setTimeout(() => {
      disposable.unsubscribe();
    },10000);
  }

  remove(cliente: Cliente) {
    this.clienteService.remove(cliente.id).subscribe(
      () => {
        let index = this.data.indexOf(cliente);
        this.data.splice(index, 1);
        this.showSuccess();
      },
      error => {
        this.showError();
      }
    );
  }

  showSuccess() {
    this.toastr.success('Cliente foi removido com sucesso.','Concluído!');
  }

  showWarning() {
    this.toastr.warning('Não foi possível carregar a lista de clientes.','Importante!');
  }

  showError() {
    this.toastr.error('Um erro ocorreu ao tentar remover o cliente','Erro!');
  }

}
