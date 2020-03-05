import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {CdkDocumentoIdentificadorGridsearchComponent} from './cdk-documento-identificador-gridsearch.component';
import {CdkDocumentoIdentificadorGridModule} from '@cdk/components/documento-identificador/cdk-documento-identificador-grid/cdk-documento-identificador-grid.module';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorGridsearchComponent
    ],
    imports: [

        CdkDocumentoIdentificadorGridModule,

        CdkSharedModule,
    ],
    providers: [
        DocumentoIdentificadorService
    ],
    exports: [
        CdkDocumentoIdentificadorGridsearchComponent
    ]
})
export class CdkDocumentoIdentificadorGridsearchModule {
}
