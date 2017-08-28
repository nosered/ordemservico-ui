import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DataTableModule } from 'angular2-datatable';
import { TextMaskModule } from 'angular2-text-mask';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { ItemComponent } from './item.component';
import { ItemService } from './item.service';
import { ItemFilterPipe } from './item-filter.pipe';
import { FormItemComponent } from './form-item/form-item.component';
import { ItemRoutingModule } from './item.routing.module';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ConfirmDialogComponent } from '../../shared/modules/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModule } from '../../shared/modules/confirm-dialog/confirm-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    DataTableModule,
    TextMaskModule,
    CurrencyMaskModule,
    BootstrapModalModule,
    ConfirmDialogModule,
    ItemRoutingModule
  ],
  declarations: [
    ItemComponent,
    ItemFilterPipe,
    FormItemComponent,
    EditItemComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    ItemService
  ]
})
export class ItemModule { }
