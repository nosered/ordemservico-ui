import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styleUrls: ['./form-cliente.component.css']
})
export class FormClienteComponent implements OnInit, OnDestroy {
  
  cpfMask = [ /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/ ];
  foneMask = [ '(', /[1-9]/, /\d/, ')', ' ', /[1-9]/, ' ', /[1-9]/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ];
  cepMask = [ /[1-9]/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/ ];
  //cepUnmask = /\D/g;
  //foneUnmask = /\D/g;
  cpfUnmask = /\D/g;

  form: FormGroup;
  sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
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
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    this.sub = this.clienteService.add(this.form.value).subscribe(
      cliente => {
        this.form.reset();
        alert(`O cliente ${cliente.nome} foi adicionado.`);
      },
      error => {
        alert('Erro ao tentar adicionar cliente');
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

}
