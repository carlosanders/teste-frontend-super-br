import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {SigiloService} from '@cdk/services/sigilo.service';
import {CdkSigiloGridsearchComponent} from './cdk-sigilo-gridsearch.component';
import {CdkSigiloGridModule} from '@cdk/components/sigilo/cdk-sigilo-grid/cdk-sigilo-grid.module';

@NgModule({
    declarations: [
        CdkSigiloGridsearchComponent
    ],
    imports: [

        CdkSigiloGridModule,

        FuseSharedModule,
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
