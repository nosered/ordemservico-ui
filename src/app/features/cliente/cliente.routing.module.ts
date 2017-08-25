import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { ClienteComponent } from './cliente.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { EditClienteComponent } from './edit-cliente/edit-cliente.component';

const clienteRoutes: Route[] = [
    { path: '', component: ClienteComponent },
    { path: 'form', component: FormClienteComponent },
    { path: ':id/edit', component: EditClienteComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(clienteRoutes) ],
    exports: [ RouterModule ]
})
export class ClienteRoutingModule { }