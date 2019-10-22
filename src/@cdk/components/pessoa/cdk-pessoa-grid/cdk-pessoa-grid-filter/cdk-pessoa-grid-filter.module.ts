import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {PessoaService} from '@cdk/services/pessoa.service';
import {CdkPessoaGridFilterComponent} from './cdk-pessoa-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkModalidadeQualificacaoPessoaAutocompleteModule} from '../../../modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-autocomplete.module';
import {CdkPaisAutocompleteModule} from '../../../pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkModalidadeGeneroPessoaAutocompleteModule} from '../../../modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-autocomplete.module';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkOrigemDadosAutocompleteModule} from '../../../origem-dados/cdk-origem-dados-autocomplete/cdk-origem-dados-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '../../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';

@NgModule({
    declarations: [
        CdkPessoaGridFilterComponent,
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

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkPaisAutocompleteModule,
        CdkModalidadeGeneroPessoaAutocompleteModule,
        CdkMunicipioAutocompleteModule,
        CdkModalidadeQualificacaoPessoaAutocompleteModule,
        CdkOrigemDadosAutocompleteModule,
    ],
    providers: [
        PessoaService,
    ],
    exports: [
        CdkPessoaGridFilterComponent
    ]
})
export class CdkPessoaGridFilterModule {
}
