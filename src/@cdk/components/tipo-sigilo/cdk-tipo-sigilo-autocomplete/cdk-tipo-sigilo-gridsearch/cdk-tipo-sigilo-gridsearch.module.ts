import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {CdkTipoSigiloGridsearchComponent} from './cdk-tipo-sigilo-gridsearch.component';
import {CdkTipoSigiloGridModule} from '@cdk/components/tipo-sigilo/cdk-tipo-sigilo-grid/cdk-tipo-sigilo-grid.module';

@NgModule({
    declarations: [
        CdkTipoSigiloGridsearchComponent
    ],
    imports: [

        CdkTipoSigiloGridModule,

        FuseSharedModule,
    ],
    providers: [
        TipoSigiloService
    ],
    exports: [
        CdkTipoSigiloGridsearchComponent
    ]
})
export class CdkTipoSigiloGridsearchModule {
}
