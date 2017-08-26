import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ItemComponent } from './item.component';
import { FormItemComponent } from './form-item/form-item.component';

const itemRoutes: Route[] = [
    { path: '', component: ItemComponent },
    { path: 'form', component: FormItemComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(itemRoutes) ],
    exports: [ RouterModule ]
})
export class ItemRoutingModule { }