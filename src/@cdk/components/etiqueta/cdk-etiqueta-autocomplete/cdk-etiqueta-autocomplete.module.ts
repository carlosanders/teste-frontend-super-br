import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EtiquetaService} from '@cdk/services/etiqueta.service';
import {CdkEtiquetaAutocompleteComponent} from './cdk-etiqueta-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEtiquetaAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        EtiquetaService,
    ],
    exports: [
        CdkEtiquetaAutocompleteComponent
    ]
})
export class CdkEtiquetaAutocompleteModule {
}
