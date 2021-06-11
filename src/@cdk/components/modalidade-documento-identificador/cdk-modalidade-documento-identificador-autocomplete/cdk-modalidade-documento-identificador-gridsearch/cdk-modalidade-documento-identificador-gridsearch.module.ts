import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeDocumentoIdentificadorService} from '@cdk/services/modalidade-documento-identificador.service';
import {CdkModalidadeDocumentoIdentificadorGridsearchComponent} from './cdk-modalidade-documento-identificador-gridsearch.component';
import {CdkModalidadeDocumentoIdentificadorGridModule} from '@cdk/components/modalidade-documento-identificador/cdk-modalidade-documento-identificador-grid/cdk-modalidade-documento-identificador-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeDocumentoIdentificadorGridsearchComponent
    ],
    imports: [

        CdkModalidadeDocumentoIdentificadorGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeDocumentoIdentificadorService
    ],
    exports: [
        CdkModalidadeDocumentoIdentificadorGridsearchComponent
    ]
})
export class CdkModalidadeDocumentoIdentificadorGridsearchModule {
}
