import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {TipoSigiloService} from '@cdk/services/tipo-sigilo.service';
import {CdkTipoSigiloGridsearchComponent} from './cdk-tipo-sigilo-gridsearch.component';
import {CdkTipoSigiloGridModule} from '@cdk/components/tipo-sigilo/cdk-tipo-sigilo-grid/cdk-tipo-sigilo-grid.module';

@NgModule({
    declarations: [
        CdkTipoSigiloGridsearchComponent
    ],
    imports: [

        CdkTipoSigiloGridModule,

        CdkSharedModule,
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
