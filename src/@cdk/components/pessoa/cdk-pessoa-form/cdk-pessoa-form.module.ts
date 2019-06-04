import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule, MatDatepickerModule
} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkPessoaFormComponent } from './cdk-pessoa-form.component';
import {CdkModalidadeQualificacaoPessoaAutocompleteModule} from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-autocomplete.module';
import {CdkModalidadeQualificacaoPessoaGridsearchModule} from '@cdk/components/modalidade-qualificacao-pessoa/cdk-modalidade-qualificacao-pessoa-autocomplete/cdk-modalidade-qualificacao-pessoa-gridsearch/cdk-modalidade-qualificacao-pessoa-gridsearch.module';
import {CdkPaisAutocompleteModule} from '@cdk/components/pais/cdk-pais-autocomplete/cdk-pais-autocomplete.module';
import {CdkPaisGridsearchModule} from '@cdk/components/pais/cdk-pais-autocomplete/cdk-pais-gridsearch/cdk-pais-gridsearch.module';
import {CdkMunicipioAutocompleteModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkMunicipioGridsearchModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-gridsearch/cdk-municipio-gridsearch.module';
import {CdkModalidadeGeneroPessoaGridsearchModule} from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-gridsearch/cdk-modalidade-genero-pessoa-gridsearch.module';
import {CdkModalidadeGeneroPessoaAutocompleteModule} from '@cdk/components/modalidade-genero-pessoa/cdk-modalidade-genero-pessoa-autocomplete/cdk-modalidade-genero-pessoa-autocomplete.module';

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

        CdkModalidadeQualificacaoPessoaAutocompleteModule,
        CdkModalidadeQualificacaoPessoaGridsearchModule,
        CdkModalidadeGeneroPessoaAutocompleteModule,
        CdkModalidadeGeneroPessoaGridsearchModule,
        CdkPaisAutocompleteModule,
        CdkPaisGridsearchModule,
        CdkMunicipioAutocompleteModule,
        CdkMunicipioGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
    ],
    exports: [
        CdkPessoaFormComponent
    ]
})
export class CdkPessoaFormModule {
}
