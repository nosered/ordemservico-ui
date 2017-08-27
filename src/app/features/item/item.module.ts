import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { ItemComponent } from './item.component';
import { ItemService } from './item.service';
import { ItemFilterPipe } from './item-filter.pipe';
import { FormItemComponent } from './form-item/form-item.component';
import { ItemRoutingModule } from './item.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    TextMaskModule,
    CurrencyMaskModule,
    ItemRoutingModule
  ],
  declarations: [
    ItemComponent,
    ItemFilterPipe,
    FormItemComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    ItemService
  ]
})
export class ItemModule { }
