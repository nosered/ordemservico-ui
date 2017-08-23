import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular2-datatable';

import { ClienteFilterPipe } from './cliente.pipe';
import { ClienteService } from './cliente.service';
import { ClienteComponent } from './cliente.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { ClienteRoutingModule } from './cliente.routing.module';

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ClienteRoutingModule
  ],
  declarations: [
    ClienteComponent,
    ClienteFilterPipe,
    FormClienteComponent
  ],
  providers: [
    ClienteService
  ]
})
export class ClienteModule { }