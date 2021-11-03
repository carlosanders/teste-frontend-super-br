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
import {PessoaService} from '@cdk/services/pessoa.service';
import {CdkPessoaFilterComponent} from './cdk-pessoa-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkModalidadeQualificacaoPessoaAutocompleteModule} from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-autocomplete.module';
import {CdkPaisAutocompleteModule} from '@cdk/components/pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkModalidadeGeneroPessoaAutocompleteModule} from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkPessoaFilterComponent,
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
        CdkPaisAutocompleteModule,
        CdkModalidadeGeneroPessoaAutocompleteModule,
        CdkMunicipioAutocompleteModule,
        CdkModalidadeQualificacaoPessoaAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        PessoaService,
    ],
    exports: [
        CdkPessoaFilterComponent
    ]
})
export class CdkPessoaFilterModule {
}
