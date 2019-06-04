import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeRepresentanteService } from '@cdk/services/modalidade-representante.service';
import { CdkModalidadeRepresentanteGridsearchComponent } from './cdk-modalidade-representante-gridsearch.component';
import { CdkModalidadeRepresentanteGridModule } from '@cdk/components/modalidade-representante/cdk-modalidade-representante-grid/cdk-modalidade-representante-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeRepresentanteGridsearchComponent
    ],
    imports: [

        CdkModalidadeRepresentanteGridModule,
        
        FuseSharedModule,
    ],
    providers: [
        ModalidadeRepresentanteService
    ],
    exports: [
        CdkModalidadeRepresentanteGridsearchComponent
    ]
})
export class CdkModalidadeRepresentanteGridsearchModule {
}
