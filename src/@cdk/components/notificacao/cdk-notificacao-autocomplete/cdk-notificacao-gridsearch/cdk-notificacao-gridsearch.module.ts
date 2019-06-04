import {NgModule} from '@angular/core';

import {FuseSharedModule} from '@fuse/shared.module';

import {NotificacaoService} from '@cdk/services/notificacao.service';
import {CdkNotificacaoGridsearchComponent} from './cdk-notificacao-gridsearch.component';
import {CdkNotificacaoGridModule} from '@cdk/components/notificacao/cdk-notificacao-grid/cdk-notificacao-grid.module';

@NgModule({
    declarations: [
        CdkNotificacaoGridsearchComponent
    ],
    imports: [

        CdkNotificacaoGridModule,

        FuseSharedModule,
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
