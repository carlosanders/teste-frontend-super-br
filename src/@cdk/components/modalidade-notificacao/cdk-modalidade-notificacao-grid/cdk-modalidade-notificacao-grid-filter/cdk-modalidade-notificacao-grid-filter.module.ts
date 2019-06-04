import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeNotificacaoService } from '@cdk/services/modalidade-notificacao.service';
import { CdkModalidadeNotificacaoGridFilterComponent } from './cdk-modalidade-notificacao-grid-filter.component';

@NgModule({
    declarations: [
        CdkModalidadeNotificacaoGridFilterComponent,
    ],
    imports: [

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeNotificacaoService,
    ],
    exports: [
        CdkModalidadeNotificacaoGridFilterComponent
    ]
})
export class CdkModalidadeNotificacaoGridFilterModule {
}
