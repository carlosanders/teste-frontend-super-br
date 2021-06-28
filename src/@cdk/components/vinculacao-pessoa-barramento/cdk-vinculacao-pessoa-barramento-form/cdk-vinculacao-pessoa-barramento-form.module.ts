import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoPessoaBarramentoFormComponent} from './cdk-vinculacao-pessoa-barramento-form.component';
import {CdkPessoaAutocompleteModule} from "@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module";
import {CdkPessoaGridsearchModule} from "@cdk/components/pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module";
import {CdkRepositorioBarramentoGridsearchModule} from "../cdk-repositorio-barramento-gridsearch/cdk-repositorio-barramento-gridsearch.module";
import {CdkEstruturaBarramentoGridsearchModule} from "../cdk-estrutura-barramento-autocomplete/cdk-estrutura-barramento-gridsearch/cdk-estrutura-barramento-gridsearch.module";
import {CdkEstruturaBarramentoAutocompleteModule} from "../cdk-estrutura-barramento-autocomplete/cdk-estrutura-barramento-autocomplete.module";
import {CdkRepositorioBarramentoAutocompleteModule} from "../cdk-repositorio-barramento-gridsearch/cdk-repositorio-barramento-autocomplete/cdk-repositorio-barramento-autocomplete.module";

@NgModule({
    declarations: [
        CdkVinculacaoPessoaBarramentoFormComponent,
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
        CdkPessoaAutocompleteModule,
        CdkPessoaGridsearchModule,

        CdkSharedModule,
        CdkRepositorioBarramentoGridsearchModule,
        CdkEstruturaBarramentoGridsearchModule,
        CdkEstruturaBarramentoAutocompleteModule,
        CdkRepositorioBarramentoAutocompleteModule,
    ],
    providers: [],
    exports: [
        CdkVinculacaoPessoaBarramentoFormComponent
    ]
})
export class CdkVinculacaoPessoaBarramentoFormModule {
}
