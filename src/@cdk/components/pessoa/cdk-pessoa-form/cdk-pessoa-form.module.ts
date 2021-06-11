import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkPessoaFormComponent} from './cdk-pessoa-form.component';
import {CdkModalidadeQualificacaoPessoaAutocompleteModule} from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-autocomplete.module';
import {CdkModalidadeQualificacaoPessoaGridsearchModule} from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-gridsearch/cdk-modalidade-qualificacao-pessoa-gridsearch.module';
import {CdkPaisAutocompleteModule} from '@cdk/components/pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkPaisGridsearchModule} from '@cdk/components/pais/cdk-pais-autocomplete/cdk-pais-gridsearch/cdk-pais-gridsearch.module';
import {CdkMunicipioAutocompleteModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkMunicipioGridsearchModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-gridsearch/cdk-municipio-gridsearch.module';
import {CdkModalidadeGeneroPessoaGridsearchModule} from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-gridsearch/cdk-modalidade-genero-pessoa-gridsearch.module';
import {CdkModalidadeGeneroPessoaAutocompleteModule} from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-autocomplete.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatMenuModule} from '@angular/material/menu';

@NgModule({
    declarations: [
        CdkPessoaFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        CdkModalidadeQualificacaoPessoaAutocompleteModule,
        CdkModalidadeQualificacaoPessoaGridsearchModule,
        CdkModalidadeGeneroPessoaAutocompleteModule,
        CdkModalidadeGeneroPessoaGridsearchModule,
        CdkPaisAutocompleteModule,
        CdkPaisGridsearchModule,
        CdkMunicipioAutocompleteModule,
        CdkMunicipioGridsearchModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
        NgxUpperCaseDirectiveModule,
        MatMenuModule,
    ],
    providers: [],
    exports: [
        CdkPessoaFormComponent
    ]
})
export class CdkPessoaFormModule {
}
