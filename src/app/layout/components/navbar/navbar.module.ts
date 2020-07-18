import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {NavbarComponent} from './navbar.component';
import {NavbarHorizontalStyle1Module} from 'app/layout/components/navbar/horizontal/style-1/style-1.module';
import {NavbarVerticalStyle1Module} from 'app/layout/components/navbar/vertical/style-1/style-1.module';
import {NavbarVerticalStyle2Module} from 'app/layout/components/navbar/vertical/style-2/style-2.module';

@NgModule({
    declarations: [
        NavbarComponent
    ],
    imports: [
        CdkSharedModule,

        NavbarHorizontalStyle1Module,
        NavbarVerticalStyle1Module,
        NavbarVerticalStyle2Module
    ],
    exports: [
        NavbarComponent
    ]
})
export class NavbarModule {
}
