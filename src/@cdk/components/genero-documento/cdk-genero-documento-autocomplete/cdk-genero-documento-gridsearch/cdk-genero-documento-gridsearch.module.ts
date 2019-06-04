import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {GeneroDocumentoService} from '@cdk/services/genero-documento.service';
import {CdkGeneroDocumentoGridsearchComponent} from './cdk-genero-documento-gridsearch.component';
import {CdkGeneroDocumentoGridModule} from '@cdk/components/genero-documento/cdk-genero-documento-grid/cdk-genero-documento-grid.module';

@NgModule({
    declarations: [
        CdkGeneroDocumentoGridsearchComponent
    ],
    imports: [

        CdkGeneroDocumentoGridModule,

        FuseSharedModule,
    ],
    providers: [
        GeneroDocumentoService
    ],
    exports: [
        CdkGeneroDocumentoGridsearchComponent
    ]
})
export class CdkGeneroDocumentoGridsearchModule {
}
