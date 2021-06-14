import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeRelacionamentoPessoalService} from '@cdk/services/modalidade-relacionamento-pessoal.service';
import {CdkModalidadeRelacionamentoPessoalGridsearchComponent} from './cdk-modalidade-relacionamento-pessoal-gridsearch.component';
import {CdkModalidadeRelacionamentoPessoalGridModule} from '@cdk/components/modalidade-relacionamento-pessoal/cdk-modalidade-relacionamento-pessoal-grid/cdk-modalidade-relacionamento-pessoal-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeRelacionamentoPessoalGridsearchComponent
    ],
    imports: [

        CdkModalidadeRelacionamentoPessoalGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeRelacionamentoPessoalService
    ],
    exports: [
        CdkModalidadeRelacionamentoPessoalGridsearchComponent
    ]
})
export class CdkModalidadeRelacionamentoPessoalGridsearchModule {
}
