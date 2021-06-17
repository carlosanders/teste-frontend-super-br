import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {TipoContatoService} from '@cdk/services/tipo-contato.service';
import {CdkTipoContatoGridsearchComponent} from './cdk-tipo-contato-gridsearch.component';
import {CdkTipoContatoGridModule} from '@cdk/components/tipo-contato/cdk-tipo-contato-grid/cdk-tipo-contato-grid.module';

@NgModule({
    declarations: [
        CdkTipoContatoGridsearchComponent
    ],
    imports: [

        CdkTipoContatoGridModule,

        CdkSharedModule,
    ],
    providers: [
        TipoContatoService
    ],
    exports: [
        CdkTipoContatoGridsearchComponent
    ]
})
export class CdkTipoContatoGridsearchModule {
}
