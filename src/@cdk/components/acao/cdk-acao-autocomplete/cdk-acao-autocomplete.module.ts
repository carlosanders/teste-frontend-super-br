import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule, MatSelectModule,} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {AcaoService} from '@cdk/services/acao.service';
import {CdkAcaoAutocompleteComponent} from './cdk-acao-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkAcaoAutocompleteComponent,
    ],
    imports: [
        MatSelectModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        AcaoService,
    ],
    exports: [
        CdkAcaoAutocompleteComponent
    ]
})
export class CdkAcaoAutocompleteModule {
}
