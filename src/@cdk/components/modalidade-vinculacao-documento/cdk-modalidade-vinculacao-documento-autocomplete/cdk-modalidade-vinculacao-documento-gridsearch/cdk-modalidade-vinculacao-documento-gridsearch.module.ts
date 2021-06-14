import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeVinculacaoDocumentoService} from '@cdk/services/modalidade-vinculacao-documento.service';
import {CdkModalidadeVinculacaoDocumentoGridsearchComponent} from './cdk-modalidade-vinculacao-documento-gridsearch.component';
import {CdkModalidadeVinculacaoDocumentoGridModule} from '@cdk/components/modalidade-vinculacao-documento/cdk-modalidade-vinculacao-documento-grid/cdk-modalidade-vinculacao-documento-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoDocumentoGridsearchComponent
    ],
    imports: [

        CdkModalidadeVinculacaoDocumentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeVinculacaoDocumentoService
    ],
    exports: [
        CdkModalidadeVinculacaoDocumentoGridsearchComponent
    ]
})
export class CdkModalidadeVinculacaoDocumentoGridsearchModule {
}
