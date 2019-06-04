import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {DocumentoIdentificadorService} from '@cdk/services/documento-identificador.service';
import {CdkDocumentoIdentificadorGridsearchComponent} from './cdk-documento-identificador-gridsearch.component';
import {CdkDocumentoIdentificadorGridModule} from '@cdk/components/documento-identificador/cdk-documento-identificador-grid/cdk-documento-identificador-grid.module';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorGridsearchComponent
    ],
    imports: [

        CdkDocumentoIdentificadorGridModule,

        FuseSharedModule,
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
