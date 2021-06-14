import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {InteressadoService} from '@cdk/services/interessado.service';
import {CdkInteressadoAutocompleteComponent} from './cdk-interessado-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkInteressadoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        InteressadoService,
    ],
    exports: [
        CdkInteressadoAutocompleteComponent
    ]
})
export class CdkInteressadoAutocompleteModule {
}
