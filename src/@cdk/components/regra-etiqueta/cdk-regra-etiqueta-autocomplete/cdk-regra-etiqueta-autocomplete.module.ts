import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule,} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';
import {CdkRegraEtiquetaAutocompleteComponent} from './cdk-regra-etiqueta-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkRegraEtiquetaAutocompleteComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        RegraEtiquetaService,
    ],
    exports: [
        CdkRegraEtiquetaAutocompleteComponent
    ]
})
export class CdkRegraEtiquetaAutocompleteModule {
}
