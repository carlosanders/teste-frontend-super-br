import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloGridsearchComponent} from './cdk-sigilo-gridsearch.component';
import {CdkSigiloGridModule} from '@cdk/components/sigilo/cdk-sigilo-grid/cdk-sigilo-grid.module';

@NgModule({
    declarations: [
        CdkSigiloGridsearchComponent
    ],
    imports: [

        CdkSigiloGridModule,

        CdkSharedModule,
    ],
    providers: [
        SigiloService
    ],
    exports: [
        CdkSigiloGridsearchComponent
    ]
})
export class CdkSigiloGridsearchModule {
}
