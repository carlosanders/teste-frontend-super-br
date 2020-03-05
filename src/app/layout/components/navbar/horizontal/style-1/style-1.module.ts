import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@cdk/angular/material';

import { CdkNavigationModule } from '@cdk/components';
import { CdkSharedModule } from '@cdk/shared.module';

import { NavbarHorizontalStyle1Component } from 'app/layout/components/navbar/horizontal/style-1/style-1.component';

@NgModule({
    declarations: [
        NavbarHorizontalStyle1Component
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,

        CdkSharedModule,
        CdkNavigationModule
    ],
    exports     : [
        NavbarHorizontalStyle1Component
    ]
})
export class NavbarHorizontalStyle1Module
{
}
