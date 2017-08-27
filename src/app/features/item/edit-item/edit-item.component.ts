import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { ItemService } from '../item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subFind: Subscription;
  subUpdate: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private itemService: ItemService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [ null, [ Validators.required ] ],
      descricao: [ null, [ Validators.required ] ],
      tipo: [ null, [ Validators.required ] ],
      valor: [ null, [ Validators.required ] ]
    });

    let idItem: string = this.activatedRoute.snapshot.params['id'];
    this.subFind = this.itemService.find(idItem).subscribe(
      item => {
        this.form.patchValue({
          id: item.id,
          descricao: item.descricao,
          tipo: item.tipo,
          valor: item.valor
        });
      },
      error => alert('Erro ao carregar informações do item.')
    );
  }

  ngOnDestroy() {
    if(this.subFind) {
      this.subFind.unsubscribe();
    }
    if(this.subUpdate) {
      this.subUpdate.unsubscribe();
    }
  }

  onSubmit() {
    this.subUpdate = this.itemService.update(this.form.value).subscribe(
      success => {
        alert('Informações atualizadas com sucesso');
      },
      error => {
        alert('Erro ao tentar salvar alterações');
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

}
