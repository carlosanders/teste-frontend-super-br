import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EspecieDocumentoService } from '@cdk/services/especie-documento.service';
import { CdkEspecieDocumentoGridsearchComponent } from './cdk-especie-documento-gridsearch.component';
import { CdkEspecieDocumentoGridModule } from '@cdk/components/especie-documento/cdk-especie-documento-grid/cdk-especie-documento-grid.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoGridsearchComponent
    ],
    imports: [

        CdkEspecieDocumentoGridModule,
        
        FuseSharedModule,
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
