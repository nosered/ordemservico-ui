import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const appRoutes: Route[] = [
    //{ path: '', loadChildren: "./features/features.module#FeaturesModule" }
    { path: '', loadChildren: "./features/dashboard/dashboard.module#DashboardModule" },
    { path: 'clientes', loadChildren: "./features/cliente/cliente.module#ClienteModule" }
];

@NgModule({
    imports: [ RouterModule.forRoot(appRoutes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule { }