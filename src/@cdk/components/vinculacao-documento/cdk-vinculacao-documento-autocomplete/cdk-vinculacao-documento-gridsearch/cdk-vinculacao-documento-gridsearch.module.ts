import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {VinculacaoDocumentoService} from '@cdk/services/vinculacao-documento.service';
import {CdkVinculacaoDocumentoGridsearchComponent} from './cdk-vinculacao-documento-gridsearch.component';
import {CdkVinculacaoDocumentoGridModule} from '@cdk/components/vinculacao-documento/cdk-vinculacao-documento-grid/cdk-vinculacao-documento-grid.module';

@NgModule({
    declarations: [
        CdkVinculacaoDocumentoGridsearchComponent
    ],
    imports: [

        CdkVinculacaoDocumentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoDocumentoService
    ],
    exports: [
        CdkVinculacaoDocumentoGridsearchComponent
    ]
})
export class CdkVinculacaoDocumentoGridsearchModule {
}
