import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeDestinacaoService} from '@cdk/services/modalidade-destinacao.service';
import {CdkModalidadeDestinacaoGridsearchComponent} from './cdk-modalidade-destinacao-gridsearch.component';
import {CdkModalidadeDestinacaoGridModule} from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-grid/cdk-modalidade-destinacao-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeDestinacaoGridsearchComponent
    ],
    imports: [

        CdkModalidadeDestinacaoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeDestinacaoService
    ],
    exports: [
        CdkModalidadeDestinacaoGridsearchComponent
    ]
})
export class CdkModalidadeDestinacaoGridsearchModule {
}
