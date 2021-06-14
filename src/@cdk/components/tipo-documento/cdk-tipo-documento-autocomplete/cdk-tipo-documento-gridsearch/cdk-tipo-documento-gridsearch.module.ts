import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {TipoDocumentoService} from '@cdk/services/tipo-documento.service';
import {CdkTipoDocumentoGridsearchComponent} from './cdk-tipo-documento-gridsearch.component';
import {CdkTipoDocumentoGridModule} from '@cdk/components/tipo-documento/cdk-tipo-documento-grid/cdk-tipo-documento-grid.module';

@NgModule({
    declarations: [
        CdkTipoDocumentoGridsearchComponent
    ],
    imports: [

        CdkTipoDocumentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        TipoDocumentoService
    ],
    exports: [
        CdkTipoDocumentoGridsearchComponent
    ]
})
export class CdkTipoDocumentoGridsearchModule {
}
