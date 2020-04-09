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
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {CdkTramitacaoGridFilterComponent} from './cdk-tramitacao-grid-filter.component';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkPessoaAutocompleteModule} from '@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSidebarModule} from '@cdk/components/index';

@NgModule({
    declarations: [
        CdkTramitacaoGridFilterComponent
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
        CdkSidebarModule,

        CdkUsuarioAutocompleteModule,
        CdkProcessoAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkPessoaAutocompleteModule,
    ],
    providers: [
        TramitacaoService,
    ],
    exports: [
        CdkTramitacaoGridFilterComponent
    ]
})
export class CdkTramitacaoGridFilterModule {
}
