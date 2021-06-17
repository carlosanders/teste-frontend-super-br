import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeQualificacaoPessoaService} from '@cdk/services/modalidade-qualificacao-pessoa.service';
import {CdkModalidadeQualificacaoPessoaGridsearchComponent} from './cdk-modalidade-qualificacao-pessoa-gridsearch.component';
import {CdkModalidadeQualificacaoPessoaGridModule} from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-grid/cdk-modalidade-qualificacao-pessoa-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeQualificacaoPessoaGridsearchComponent
    ],
    imports: [

        CdkModalidadeQualificacaoPessoaGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeQualificacaoPessoaService
    ],
    exports: [
        CdkModalidadeQualificacaoPessoaGridsearchComponent
    ]
})
export class CdkModalidadeQualificacaoPessoaGridsearchModule {
}
