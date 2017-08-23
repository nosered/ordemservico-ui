import { Component, OnInit } from '@angular/core';

import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  data: Cliente[] = [];
  filterQuery: string = '';

  constructor(private clienteService: ClienteService) { }

  ngOnInit() {
    this.list();
  }

  list() {
    this.clienteService.list().subscribe(
      clientes => this.data = clientes,
      error => {
        alert('Erro ao listar clientes');
        console.log(error);
      }
    );
  }

}
