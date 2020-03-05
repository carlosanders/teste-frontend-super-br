import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {DocumentoService} from '@cdk/services/documento.service';
import {CdkDocumentoGridsearchComponent} from './cdk-documento-gridsearch.component';
import {CdkDocumentoGridModule} from '@cdk/components/documento/cdk-documento-grid/cdk-documento-grid.module';

@NgModule({
    declarations: [
        CdkDocumentoGridsearchComponent
    ],
    imports: [

        CdkDocumentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        DocumentoService
    ],
    exports: [
        CdkDocumentoGridsearchComponent
    ]
})
export class CdkDocumentoGridsearchModule {
}
