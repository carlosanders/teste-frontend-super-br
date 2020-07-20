import {NgModule} from '@angular/core';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';

import {CdkNavigationModule} from '@cdk/components';
import {CdkSharedModule} from '@cdk/shared.module';

import {NavbarVerticalStyle1Component} from './style-1.component';
import {LoginService} from 'app/main/auth/login/login.service';

@NgModule({
    declarations: [
        NavbarVerticalStyle1Component
    ],
    imports: [
        MatButtonModule,
        MatIconModule,

        CdkSharedModule,
        CdkNavigationModule
    ],
    exports: [
        NavbarVerticalStyle1Component
    ],
    providers: [
        LoginService,
    ]
})
export class NavbarVerticalStyle1Module {
}
