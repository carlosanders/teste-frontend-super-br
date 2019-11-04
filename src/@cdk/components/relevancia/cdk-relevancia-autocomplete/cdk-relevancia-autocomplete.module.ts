import {NgModule} from '@angular/core';
import {
    MatProgressSpinnerModule,
    MatAutocompleteModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {CdkRelevanciaAutocompleteComponent} from './cdk-relevancia-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkRelevanciaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        FuseSharedModule,
    ],
    providers: [
        RelevanciaService,
    ],
    exports: [
        CdkRelevanciaAutocompleteComponent
    ]
})
export class CdkRelevanciaAutocompleteModule {
}
