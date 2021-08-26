import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ServidorEmailService} from '@cdk/services/servidor-email.service';
import {CdkServidorEmailGridsearchComponent} from './cdk-servidor-email-gridsearch.component';
import {CdkServidorEmailGridModule} from '@cdk/components/servidor-email/cdk-servidor-email-grid/cdk-servidor-email-grid.module';

@NgModule({
    declarations: [
        CdkServidorEmailGridsearchComponent
    ],
    imports: [

        CdkServidorEmailGridModule,

        CdkSharedModule,
    ],
    providers: [
        ServidorEmailService
    ],
    exports: [
        CdkServidorEmailGridsearchComponent
    ]
})
export class CdkServidorEmailGridsearchModule {
}
