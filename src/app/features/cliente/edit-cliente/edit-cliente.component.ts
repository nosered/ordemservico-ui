import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent implements OnInit, OnDestroy {
  
  cpfMask = [ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ];
  foneMask = [ '(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, ' ', /[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
  cepMask = [ /[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ];
  cpfUnmask = /\D/g;

  form: FormGroup;
  sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(viewContainer);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [ null ],
      nome: [ null, [ Validators.required ] ],
      telefone: [ null, [ Validators.required ] ],
      cpf: [ null, [ Validators.required ] ],
      endereco: this.formBuilder.group({
        logradouro: [ null, [ Validators.required ] ],
        numero: [ null, [ Validators.required ] ],
        cep: [ null, [ Validators.required ] ],
        complemento: [ null ],
        bairro: [ null, [ Validators.required ] ]
      })
    });

    let idCliente = this.activatedRoute.snapshot.params['id'];
    this.sub = this.clienteService.find(idCliente).subscribe(
      (cliente: Cliente) => {
        this.form.patchValue({
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf,
          telefone: cliente.telefone,
          endereco: {
            logradouro: cliente.endereco.logradouro,
            numero: cliente.endereco.numero,
            cep: cliente.endereco.cep,
            bairro: cliente.endereco.bairro,
            complemento: cliente.endereco.complemento
          }
        });
      },
      error => {
        this.showWarning();
      }
    );
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    this.sub = this.clienteService.update(this.form.value).subscribe(
      cliente => {
        this.showSuccess();
      },
      error => {
        this.showError();
      }
    );
  }

  onCancel() {
    this.router.navigate(['clientes']);
  }

  isInvalidTouched(controlName: string) {
    return !this.form.get(controlName).valid && this.form.get(controlName).touched;
  }

  erroStyle(controlName: string) {
    return {
      'parsley-error': this.isInvalidTouched(controlName)
    }
  }

  showSuccess() {
    this.toastr.success('Os dados do cliente foram atualizados.','Concluído!');
  }

  showWarning() {
    this.toastr.warning('Não foi possível carregar dados do cliente','Aviso!');
  }

  showError() {
    this.toastr.error('Um erro ocorreu ao tentar atualizar dados.','Erro!');
  }

}
