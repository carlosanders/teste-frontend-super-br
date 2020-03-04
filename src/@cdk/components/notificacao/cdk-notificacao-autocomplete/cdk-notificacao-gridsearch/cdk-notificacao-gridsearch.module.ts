import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';

import {NotificacaoService} from '@cdk/services/notificacao.service';
import {CdkNotificacaoGridsearchComponent} from './cdk-notificacao-gridsearch.component';
import {CdkNotificacaoGridModule} from '@cdk/components/notificacao/cdk-notificacao-grid/cdk-notificacao-grid.module';

@NgModule({
    declarations: [
        CdkNotificacaoGridsearchComponent
    ],
    imports: [

        CdkNotificacaoGridModule,

        CdkSharedModule,
    ],
    providers: [
        NotificacaoService
    ],
    exports: [
        CdkNotificacaoGridsearchComponent
    ]
})
export class CdkNotificacaoGridsearchModule {
}
