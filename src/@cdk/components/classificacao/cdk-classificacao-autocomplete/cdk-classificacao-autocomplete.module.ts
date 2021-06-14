import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoAutocompleteComponent} from './cdk-classificacao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkClassificacaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ClassificacaoService,
    ],
    exports: [
        CdkClassificacaoAutocompleteComponent
    ]
})
export class CdkClassificacaoAutocompleteModule {
}
