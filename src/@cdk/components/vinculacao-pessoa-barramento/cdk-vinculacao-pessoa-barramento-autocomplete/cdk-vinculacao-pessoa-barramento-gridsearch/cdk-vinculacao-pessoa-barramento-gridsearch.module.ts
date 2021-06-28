import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoPessoaBarramentoGridsearchComponent} from './cdk-vinculacao-pessoa-barramento-gridsearch.component';
import {CdkVinculacaoPessoaBarramentoGridModule} from '../../cdk-vinculacao-pessoa-barramento-grid/cdk-vinculacao-pessoa-barramento-grid.module';
import {VinculacaoPessoaBarramentoService} from "../../../../services/vinculacao-pessoa-barramento.service";

@NgModule({
    declarations: [
        CdkVinculacaoPessoaBarramentoGridsearchComponent
    ],
    imports: [

        CdkVinculacaoPessoaBarramentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoPessoaBarramentoService
    ],
    exports: [
        CdkVinculacaoPessoaBarramentoGridsearchComponent
    ]
})
export class CdkVinculacaoPessoaBarramentoGridsearchModule {
}
