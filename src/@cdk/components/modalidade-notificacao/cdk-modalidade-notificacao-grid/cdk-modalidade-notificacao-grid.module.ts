import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeNotificacaoService } from '@cdk/services/modalidade-notificacao.service';
import { CdkModalidadeNotificacaoGridComponent} from './cdk-modalidade-notificacao-grid.component';
import { CdkModalidadeNotificacaoAutocompleteModule } from '@cdk/components/modalidade-notificacao/cdk-modalidade-notificacao-autocomplete/cdk-modalidade-notificacao-autocomplete.module';
import {CdkModalidadeNotificacaoGridFilterModule} from './cdk-modalidade-notificacao-grid-filter/cdk-modalidade-notificacao-grid-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeNotificacaoGridComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkModalidadeNotificacaoAutocompleteModule,
        CdkModalidadeNotificacaoGridFilterModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeNotificacaoService,
    ],
    exports: [
        CdkModalidadeNotificacaoGridComponent
    ]
})
export class CdkModalidadeNotificacaoGridModule {
}
