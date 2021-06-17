import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {ModalidadeNotificacaoService} from '@cdk/services/modalidade-notificacao.service';
import {CdkModalidadeNotificacaoGridsearchComponent} from './cdk-modalidade-notificacao-gridsearch.component';
import {CdkModalidadeNotificacaoGridModule} from '@cdk/components/modalidade-notificacao/cdk-modalidade-notificacao-grid/cdk-modalidade-notificacao-grid.module';

@NgModule({
    declarations: [
        CdkModalidadeNotificacaoGridsearchComponent
    ],
    imports: [

        CdkModalidadeNotificacaoGridModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeNotificacaoService
    ],
    exports: [
        CdkModalidadeNotificacaoGridsearchComponent
    ]
})
export class CdkModalidadeNotificacaoGridsearchModule {
}
