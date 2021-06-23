import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeEtiquetaService} from '@cdk/services/modalidade-etiqueta.service';
import {CdkModalidadeEtiquetaGridsearchComponent} from './cdk-modalidade-etiqueta-gridsearch.component';
import {CdkModalidadeEtiquetaGridModule} from '@cdk/components/modalidade-etiqueta/cdk-modalidade-etiqueta-grid/cdk-modalidade-etiqueta-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeEtiquetaGridsearchComponent
    ],
    imports: [

        CdkModalidadeEtiquetaGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeEtiquetaService
    ],
    exports: [
        CdkModalidadeEtiquetaGridsearchComponent
    ]
})
export class CdkModalidadeEtiquetaGridsearchModule {
}
