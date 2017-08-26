import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Subscription } from 'rxjs/Rx';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-form-item',
  templateUrl: './form-item.component.html',
  styleUrls: ['./form-item.component.css']
})
export class FormItemComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private router: Router,
    private toastr: ToastsManager,
    private viewContainer: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(this.viewContainer);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      descricao: [ null, [ Validators.required ] ],
      valor: [ null, [ Validators.required ] ],
      tipo: [ null, [ Validators.required ] ]
    });
  }

  ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

  onSubmit() {
    this.sub = this.itemService.add(this.form.value).subscribe(
      item => {
        this.form.reset();
        this.showSuccess();
      },
      error => {
        this.showError();
      }
    );
  }

  onCancel() {
    this.router.navigate(['/itens']);
  }

  isInvalidTouched(controlName: string) {
    return !this.form.get(controlName).valid && this.form.get(controlName).touched;
  }

  erroStyle(controlName: string) {
    return {
      'parsley-error': this.isInvalidTouched(controlName)
    }
  }

  selectErroStyle(controlName: string) {
    if(this.isInvalidTouched(controlName)) {
      return {
        'border': '1px solid #dd5826',
        'border-radius': '3px'
      }
    }
  }

  showSuccess() {
    this.toastr.success('Item adicionado com sucesso.','Concluído!');
  }

  showError() {
    this.toastr.error('Ocorreu um erro ao tentar adicionar item','Erro!');
  }
}
