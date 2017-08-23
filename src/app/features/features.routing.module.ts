import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

import { FeaturesComponent } from './features.component';

const featuresRoutes: Route[] = [
    { path: '', component: FeaturesComponent, children: [
        { path: '', loadChildren: 'app/features/dashboard/dashboard.module#DashboardModule'}
    ]}
];

@NgModule({
    imports: [ RouterModule.forChild(featuresRoutes) ],
    exports: [ RouterModule ]
})
export class FeaturesRoutingModule { }