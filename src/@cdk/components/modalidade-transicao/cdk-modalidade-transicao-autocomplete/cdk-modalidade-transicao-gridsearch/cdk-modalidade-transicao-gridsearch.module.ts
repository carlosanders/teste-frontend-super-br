import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {CdkModalidadeTransicaoGridsearchComponent} from './cdk-modalidade-transicao-gridsearch.component';
import {CdkModalidadeTransicaoGridModule} from '@cdk/components/modalidade-transicao/cdk-modalidade-transicao-grid/cdk-modalidade-transicao-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeTransicaoGridsearchComponent
    ],
    imports: [

        CdkModalidadeTransicaoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeTransicaoService
    ],
    exports: [
        CdkModalidadeTransicaoGridsearchComponent
    ]
})
export class CdkModalidadeTransicaoGridsearchModule {
}
