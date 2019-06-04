import { NgModule } from '@angular/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { ModalidadeQualificacaoPessoaService } from '@cdk/services/modalidade-qualificacao-pessoa.service';
import { CdkModalidadeQualificacaoPessoaGridsearchComponent } from './cdk-modalidade-qualificacao-pessoa-gridsearch.component';
import { CdkModalidadeQualificacaoPessoaGridModule } from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-grid/cdk-modalidade-qualificacao-pessoa-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeQualificacaoPessoaGridsearchComponent
    ],
    imports: [

        CdkModalidadeQualificacaoPessoaGridModule,
        
        FuseSharedModule,
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
