import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { TipoDocumentoService } from '@cdk/services/tipo-documento.service';
import { CdkTipoDocumentoGridsearchComponent } from './cdk-tipo-documento-gridsearch.component';
import { CdkTipoDocumentoGridModule } from '@cdk/components/tipo-documento/cdk-tipo-documento-grid/cdk-tipo-documento-grid.module';

@NgModule({
    declarations: [
        CdkTipoDocumentoGridsearchComponent
    ],
    imports: [

        CdkTipoDocumentoGridModule,
        
        FuseSharedModule,
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
