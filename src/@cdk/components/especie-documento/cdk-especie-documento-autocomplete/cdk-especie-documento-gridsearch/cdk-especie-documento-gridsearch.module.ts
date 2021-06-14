import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {EspecieDocumentoService} from '@cdk/services/especie-documento.service';
import {CdkEspecieDocumentoGridsearchComponent} from './cdk-especie-documento-gridsearch.component';
import {CdkEspecieDocumentoGridModule} from '@cdk/components/especie-documento/cdk-especie-documento-grid/cdk-especie-documento-grid.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoGridsearchComponent
    ],
    imports: [

        CdkEspecieDocumentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        EspecieDocumentoService
    ],
    exports: [
        CdkEspecieDocumentoGridsearchComponent
    ]
})
export class CdkEspecieDocumentoGridsearchModule {
}
