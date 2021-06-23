import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {CdkEstruturaBarramentoGridsearchComponent} from './cdk-estrutura-barramento-gridsearch.component';
import {VinculacaoPessoaBarramentoService} from '../../../../services/vinculacao-pessoa-barramento.service';
import {CdkEstruturaBarramentoGridModule} from '../../cdk-estrutura-barramento-grid/cdk-estrutura-barramento-grid.module';


@NgModule({
    declarations: [
        CdkEstruturaBarramentoGridsearchComponent
    ],
    imports: [

        CdkEstruturaBarramentoGridModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoPessoaBarramentoService
    ],
    exports: [
        CdkEstruturaBarramentoGridsearchComponent
    ]
})
export class CdkEstruturaBarramentoGridsearchModule {
}
