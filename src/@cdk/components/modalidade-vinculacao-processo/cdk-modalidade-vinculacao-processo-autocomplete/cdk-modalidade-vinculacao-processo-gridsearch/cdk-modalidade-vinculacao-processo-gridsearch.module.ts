import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import {CdkModalidadeVinculacaoProcessoGridsearchComponent} from './cdk-modalidade-vinculacao-processo-gridsearch.component';
import {CdkModalidadeVinculacaoProcessoGridModule} from '@cdk/components/modalidade-vinculacao-processo/cdk-modalidade-vinculacao-processo-grid/cdk-modalidade-vinculacao-processo-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeVinculacaoProcessoGridsearchComponent
    ],
    imports: [

        CdkModalidadeVinculacaoProcessoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeVinculacaoProcessoService
    ],
    exports: [
        CdkModalidadeVinculacaoProcessoGridsearchComponent
    ]
})
export class CdkModalidadeVinculacaoProcessoGridsearchModule {
}
