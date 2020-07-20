import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';

import {FooterComponent} from './footer.component';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports: [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatToolbarModule,

        CdkSharedModule
    ],
    exports: [
        FooterComponent
    ]
})
export class FooterModule {
}
