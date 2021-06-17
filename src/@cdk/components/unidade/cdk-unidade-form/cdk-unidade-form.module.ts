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
    MatRadioModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkUnidadeFormComponent} from './cdk-unidade-form.component';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkMunicipioAutocompleteModule} from '../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkMunicipioGridsearchModule} from '../../municipio/cdk-municipio-autocomplete/cdk-municipio-gridsearch/cdk-municipio-gridsearch.module';
import {CdkModalidadeOrgaoCentralAutocompleteModule} from '../../modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module';
import {CdkModalidadeOrgaoCentralGridsearchModule} from '../../modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-gridsearch/cdk-modalidade-orgao-central-gridsearch.module';
import {CdkGeneroSetorAutocompleteModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-autocomplete.module';
import {CdkGeneroSetorGridsearchModule} from '../../genero-setor/cdk-genero-setor-autocomplete/cdk-genero-setor-gridsearch/cdk-genero-setor-gridsearch.module';

@NgModule({
    declarations: [
        CdkUnidadeFormComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatRadioModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatAutocompleteModule,

        NgxUpperCaseDirectiveModule,

        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule,
        CdkMunicipioAutocompleteModule,
        CdkMunicipioGridsearchModule,

        CdkSharedModule,
        CdkModalidadeOrgaoCentralAutocompleteModule,
        CdkGeneroSetorAutocompleteModule,
        CdkGeneroSetorGridsearchModule,
        CdkModalidadeOrgaoCentralGridsearchModule
    ],
    providers: [
    ],
    exports: [
        CdkUnidadeFormComponent
    ]
})
export class CdkUnidadeFormModule {
}

