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
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRelacionamentoPessoalFormComponent} from './cdk-relacionamento-pessoal-form.component';
import {CdkModalidadeRelacionamentoPessoalAutocompleteModule} from '../../modalidade-relacionamento-pessoal/cdk-modalidade-relacionamento-pessoal-autocomplete/cdk-modalidade-relacionamento-pessoal-autocomplete.module';
import {CdkModalidadeRelacionamentoPessoalGridsearchModule} from '../../modalidade-relacionamento-pessoal/cdk-modalidade-relacionamento-pessoal-autocomplete/cdk-modalidade-relacionamento-pessoal-gridsearch/cdk-modalidade-relacionamento-pessoal-gridsearch.module';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPessoaGridsearchModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module';

@NgModule({
    declarations: [
        CdkRelacionamentoPessoalFormComponent,
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

        CdkModalidadeRelacionamentoPessoalAutocompleteModule,
        CdkModalidadeRelacionamentoPessoalGridsearchModule,
        CdkPessoaAutocompleteModule,
        CdkPessoaGridsearchModule,

        CdkSharedModule,
    ],
    providers: [],
    exports: [
        CdkRelacionamentoPessoalFormComponent
    ]
})
export class CdkRelacionamentoPessoalFormModule {
}
