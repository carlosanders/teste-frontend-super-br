import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {GeneroDocumentoAvulsoService} from '@cdk/services/genero-documento-avulso.service';
import {CdkGeneroDocumentoAvulsoGridsearchComponent} from './cdk-genero-documento-avulso-gridsearch.component';
import {CdkGeneroDocumentoAvulsoGridModule} from '@cdk/components/genero-documento-avulso/cdk-genero-documento-avulso-grid/cdk-genero-documento-avulso-grid.module';

@NgModule({
    declarations: [
        CdkGeneroDocumentoAvulsoGridsearchComponent
    ],
    imports: [

        CdkGeneroDocumentoAvulsoGridModule,

        CdkSharedModule,
    ],
    providers: [
        GeneroDocumentoAvulsoService
    ],
    exports: [
        CdkGeneroDocumentoAvulsoGridsearchComponent
    ]
})
export class CdkGeneroDocumentoAvulsoGridsearchModule {
}
