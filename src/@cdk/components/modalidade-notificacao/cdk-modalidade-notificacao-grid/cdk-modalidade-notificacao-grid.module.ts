import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeNotificacaoService} from '@cdk/services/modalidade-notificacao.service';
import {CdkModalidadeNotificacaoGridComponent} from './cdk-modalidade-notificacao-grid.component';
import {CdkModalidadeNotificacaoAutocompleteModule} from '@cdk/components/modalidade-notificacao/cdk-modalidade-notificacao-autocomplete/cdk-modalidade-notificacao-autocomplete.module';
import {CdkModalidadeNotificacaoFilterModule} from '../sidebars/cdk-modalidade-notificacao-filter/cdk-modalidade-notificacao-filter.module';

@NgModule({
    declarations: [
        CdkModalidadeNotificacaoGridComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkModalidadeNotificacaoAutocompleteModule,
        CdkModalidadeNotificacaoFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
