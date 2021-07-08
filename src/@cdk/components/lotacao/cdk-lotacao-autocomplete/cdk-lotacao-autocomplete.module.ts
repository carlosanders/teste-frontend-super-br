import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {CdkLotacaoAutocompleteComponent} from './cdk-lotacao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkLotacaoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        LotacaoService,
    ],
    exports: [
        CdkLotacaoAutocompleteComponent
    ]
})
export class CdkLotacaoAutocompleteModule {
}
