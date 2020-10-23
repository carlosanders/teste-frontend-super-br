import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {RegraService} from '@cdk/services/regra.service';
import {CdkRegraAutocompleteComponent} from './cdk-regra-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkRegraAutocompleteComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        RegraService,
    ],
    exports: [
        CdkRegraAutocompleteComponent
    ]
})
export class CdkRegraAutocompleteModule {
}
