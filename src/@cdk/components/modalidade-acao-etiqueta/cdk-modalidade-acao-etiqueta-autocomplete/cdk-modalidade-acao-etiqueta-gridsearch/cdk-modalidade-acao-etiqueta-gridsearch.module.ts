import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {CdkModalidadeAcaoEtiquetaGridsearchComponent} from './cdk-modalidade-acao-etiqueta-gridsearch.component';
import {CdkModalidadeAcaoEtiquetaGridModule} from '@cdk/components/modalidade-acao-etiqueta/cdk-modalidade-acao-etiqueta-grid/cdk-modalidade-acao-etiqueta-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeAcaoEtiquetaGridsearchComponent
    ],
    imports: [

        CdkModalidadeAcaoEtiquetaGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeAcaoEtiquetaService
    ],
    exports: [
        CdkModalidadeAcaoEtiquetaGridsearchComponent
    ]
})
export class CdkModalidadeAcaoEtiquetaGridsearchModule {
}
