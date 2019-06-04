import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { EspecieDocumentoAvulsoService } from '@cdk/services/especie-documento-avulso.service';
import { CdkEspecieDocumentoAvulsoGridsearchComponent } from './cdk-especie-documento-avulso-gridsearch.component';
import { CdkEspecieDocumentoAvulsoGridModule } from '@cdk/components/especie-documento-avulso/cdk-especie-documento-avulso-grid/cdk-especie-documento-avulso-grid.module';

@NgModule({
    declarations: [
        CdkEspecieDocumentoAvulsoGridsearchComponent
    ],
    imports: [

        CdkEspecieDocumentoAvulsoGridModule,
        
        FuseSharedModule,
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
