import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkCoordenadorFormComponent} from './cdk-coordenador-form.component';
import {CdkModalidadeOrgaoCentralAutocompleteModule} from '@cdk/components/modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-autocomplete.module';
import {CdkModalidadeOrgaoCentralGridsearchModule} from '@cdk/components/modalidade-orgao-central/cdk-modalidade-orgao-central-autocomplete/cdk-modalidade-orgao-central-gridsearch/cdk-modalidade-orgao-central-gridsearch.module';
import {CdkSetorAutocompleteModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorGridsearchModule} from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';

@NgModule({
    declarations: [
        CdkCoordenadorFormComponent
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

        CdkSharedModule,
        MatSelectModule,
        CdkModalidadeOrgaoCentralAutocompleteModule,
        CdkModalidadeOrgaoCentralGridsearchModule,
        CdkSetorAutocompleteModule,
        CdkSetorGridsearchModule
    ],
    providers: [
    ],
    exports: [
        CdkCoordenadorFormComponent
    ]
})
export class CdkCoordenadorFormModule {
}
