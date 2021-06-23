import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {DistribuicaoService} from '@cdk/services/distribuicao.service';
import {CdkDistribuicaoAutocompleteComponent} from './cdk-distribuicao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkDistribuicaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        DistribuicaoService,
    ],
    exports: [
        CdkDistribuicaoAutocompleteComponent
    ]
})
export class CdkDistribuicaoAutocompleteModule {
}
