import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {NotificacaoService} from '@cdk/services/notificacao.service';
import {CdkNotificacaoGridFilterComponent} from './cdk-notificacao-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkModalidadeNotificacaoAutocompleteModule} from '@cdk/components/modalidade-notificacao/cdk-modalidade-notificacao-autocomplete/cdk-modalidade-notificacao-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';

@NgModule({
    declarations: [
        CdkNotificacaoGridFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkModalidadeNotificacaoAutocompleteModule,
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
