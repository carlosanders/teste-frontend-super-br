import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoAutocompleteComponent} from './cdk-transicao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkTransicaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        TransicaoService,
    ],
    exports: [
        CdkTransicaoAutocompleteComponent
    ]
})
export class CdkTransicaoAutocompleteModule {
}
