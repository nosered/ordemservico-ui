import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';
import { TextMaskModule } from 'angular2-text-mask';

import { UnmaskDirective } from '../../shared/directives/unmask.directive';
import { CpfPipe } from '../../shared/pipes/cpf.pipe';
import { ClienteFilterPipe } from './cliente.pipe';
import { ClienteService } from './cliente.service';
import { ClienteComponent } from './cliente.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { ClienteRoutingModule } from './cliente.routing.module';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    TextMaskModule,
    ClienteRoutingModule
  ],
  declarations: [
    ClienteComponent,
    ClienteFilterPipe,
    FormClienteComponent,
    UnmaskDirective,
    CpfPipe,
    EditClienteComponent
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }