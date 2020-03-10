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
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {CdkNotificacaoGridComponent} from './cdk-notificacao-grid.component';
import {CdkNotificacaoAutocompleteModule} from '@cdk/components/notificacao/cdk-notificacao-autocomplete/cdk-notificacao-autocomplete.module';
import {CdkNotificacaoGridFilterModule} from './cdk-notificacao-grid-filter/cdk-notificacao-grid-filter.module';
import {CdkNotificacaoMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkNotificacaoGridComponent,
        CdkNotificacaoMainSidebarComponent,
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

        CdkNotificacaoAutocompleteModule,
        CdkNotificacaoGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
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
