import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {CdkNotificacaoGridFilterComponent} from './cdk-notificacao-grid-filter.component';

@NgModule({
    declarations: [
        CdkNotificacaoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        FuseSharedModule,
    ],
    providers: [
        NotificacaoService,
    ],
    exports: [
        CdkNotificacaoGridFilterComponent
    ]
})
export class CdkNotificacaoGridFilterModule {
}
