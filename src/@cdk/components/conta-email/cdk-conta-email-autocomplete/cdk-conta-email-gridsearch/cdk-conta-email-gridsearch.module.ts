import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ContaEmailService} from '@cdk/services/conta-email.service';
import {CdkContaEmailGridsearchComponent} from './cdk-conta-email-gridsearch.component';
import {CdkContaEmailGridModule} from '@cdk/components/conta-email/cdk-conta-email-grid/cdk-conta-email-grid.module';

@NgModule({
    declarations: [
        CdkContaEmailGridsearchComponent
    ],
    imports: [

        CdkContaEmailGridModule,

        CdkSharedModule,
    ],
    providers: [
        ContaEmailService
    ],
    exports: [
        CdkContaEmailGridsearchComponent
    ]
})
export class CdkContaEmailGridsearchModule {
}
