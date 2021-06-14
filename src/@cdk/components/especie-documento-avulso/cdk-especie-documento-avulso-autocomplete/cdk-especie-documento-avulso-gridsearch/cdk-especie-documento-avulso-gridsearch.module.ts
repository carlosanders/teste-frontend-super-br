import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {EspecieDocumentoAvulsoService} from '@cdk/services/especie-documento-avulso.service';
import {CdkEspecieDocumentoAvulsoGridsearchComponent} from './cdk-especie-documento-avulso-gridsearch.component';
import {CdkEspecieDocumentoAvulsoGridModule} from '@cdk/components/especie-documento-avulso/cdk-especie-documento-avulso-grid/cdk-especie-documento-avulso-grid.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoAvulsoGridsearchComponent
    ],
    imports: [

        CdkEspecieDocumentoAvulsoGridModule,

        CdkSharedModule,
    ],
    providers: [
        EspecieDocumentoAvulsoService
    ],
    exports: [
        CdkEspecieDocumentoAvulsoGridsearchComponent
    ]
})
export class CdkEspecieDocumentoAvulsoGridsearchModule {
}
