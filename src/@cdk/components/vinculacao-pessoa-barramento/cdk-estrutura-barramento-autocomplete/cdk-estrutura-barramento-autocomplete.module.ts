import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkEstruturaBarramentoAutocompleteComponent} from './cdk-estrutura-barramento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {VinculacaoPessoaBarramentoService} from "../../../services/vinculacao-pessoa-barramento.service";

@NgModule({
    declarations: [
        CdkEstruturaBarramentoAutocompleteComponent,
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
        CdkEstruturaBarramentoAutocompleteComponent
    ]
})
export class CdkEstruturaBarramentoAutocompleteModule {
}
