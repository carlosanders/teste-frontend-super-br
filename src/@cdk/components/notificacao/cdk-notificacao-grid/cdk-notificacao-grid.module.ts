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

import {FuseSharedModule} from '@fuse/shared.module';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {CdkNotificacaoGridComponent} from './cdk-notificacao-grid.component';
import {CdkNotificacaoAutocompleteModule} from '@cdk/components/notificacao/cdk-notificacao-autocomplete/cdk-notificacao-autocomplete.module';
import {CdkNotificacaoGridFilterModule} from './cdk-notificacao-grid-filter/cdk-notificacao-grid-filter.module';

@NgModule({
    declarations: [
        CdkNotificacaoGridComponent
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
        CdkNotificacaoAutocompleteModule,
        FuseSharedModule,
        CdkNotificacaoGridFilterModule
    ],
    providers: [
        NotificacaoService,
    ],
    exports: [
        CdkNotificacaoGridComponent
    ]
})
export class CdkNotificacaoGridModule {
}
