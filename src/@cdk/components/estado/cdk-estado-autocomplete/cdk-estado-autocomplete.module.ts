import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {EstadoService} from '@cdk/services/estado.service';
import {CdkEstadoAutocompleteComponent} from './cdk-estado-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkEstadoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        EstadoService,
    ],
    exports: [
        CdkEstadoAutocompleteComponent
    ]
})
export class CdkEstadoAutocompleteModule {
}
