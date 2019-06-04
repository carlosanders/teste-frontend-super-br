import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {DocumentoAvulsoService} from '@cdk/services/documento-avulso.service';
import {CdkDocumentoAvulsoGridsearchComponent} from './cdk-documento-avulso-gridsearch.component';
import {CdkDocumentoAvulsoGridModule} from '@cdk/components/documento-avulso/cdk-documento-avulso-grid/cdk-documento-avulso-grid.module';

@NgModule({
    declarations: [
        CdkDocumentoAvulsoGridsearchComponent
    ],
    imports: [

        CdkDocumentoAvulsoGridModule,

        FuseSharedModule,
    ],
    providers: [
        DocumentoAvulsoService
    ],
    exports: [
        CdkDocumentoAvulsoGridsearchComponent
    ]
})
export class CdkDocumentoAvulsoGridsearchModule {
}
