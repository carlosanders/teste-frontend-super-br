import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRepositorioBarramentoAutocompleteComponent} from './cdk-repositorio-barramento-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';
import {VinculacaoPessoaBarramentoService} from "../../../../services/vinculacao-pessoa-barramento.service";

@NgModule({
    declarations: [
        CdkRepositorioBarramentoAutocompleteComponent,
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
        CdkRepositorioBarramentoAutocompleteComponent
    ]
})
export class CdkRepositorioBarramentoAutocompleteModule {
}
