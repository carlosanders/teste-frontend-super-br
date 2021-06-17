import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoPessoaBarramentoAutocompleteComponent} from './cdk-vinculacao-pessoa-barramento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {VinculacaoPessoaBarramentoService} from "../../../services/vinculacao-pessoa-barramento.service";

@NgModule({
    declarations: [
        CdkVinculacaoPessoaBarramentoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        VinculacaoPessoaBarramentoService,
    ],
    exports: [
        CdkVinculacaoPessoaBarramentoAutocompleteComponent
    ]
})
export class CdkVinculacaoPessoaBarramentoAutocompleteModule {
}
