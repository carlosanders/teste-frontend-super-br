import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';

import {CdkNavigationModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';

import {NavbarVerticalStyle2Component} from './style-2.component';

@NgModule({
    declarations: [
        NavbarVerticalStyle2Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        CdkSharedModule,
        CdkNavigationModule
    ],
    exports     : [
        NavbarVerticalStyle2Component
    ]
})
export class NavbarVerticalStyle2Module
{
}
