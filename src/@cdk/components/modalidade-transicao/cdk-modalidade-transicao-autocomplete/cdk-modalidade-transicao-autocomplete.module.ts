import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import {CdkModalidadeTransicaoAutocompleteComponent} from './cdk-modalidade-transicao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModalidadeTransicaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeTransicaoService,
    ],
    exports: [
        CdkModalidadeTransicaoAutocompleteComponent
    ]
})
export class CdkModalidadeTransicaoAutocompleteModule {
}
