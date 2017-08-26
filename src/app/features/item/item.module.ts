import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';

import { ItemComponent } from './item.component';
import { ItemService } from './item.service';
import { FormItemComponent } from './form-item/form-item.component';
import { ItemRoutingModule } from './item.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    TextMaskModule,
    CurrencyMaskModule,
    ItemRoutingModule
  ],
  declarations: [
    ItemComponent,
    FormItemComponent
  ],
  providers: [
    ItemService
  ]
})
export class ItemModule { }
