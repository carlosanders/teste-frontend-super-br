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
import { CdkModalidadeNotificacaoGridFilterComponent } from './cdk-modalidade-notificacao-grid-filter/cdk-modalidade-notificacao-grid-filter.component';
import { CdkModalidadeNotificacaoAutocompleteModule } from '@cdk/components/modalidade-notificacao/cdk-modalidade-notificacao-autocomplete/cdk-modalidade-notificacao-autocomplete.module';

@NgModule({
    declarations: [
        CdkModalidadeNotificacaoGridComponent,
        CdkModalidadeNotificacaoGridFilterComponent
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
