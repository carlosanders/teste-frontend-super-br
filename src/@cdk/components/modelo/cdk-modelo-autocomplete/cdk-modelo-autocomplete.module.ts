import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {CdkModeloAutocompleteComponent} from './cdk-modelo-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkModeloAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        ModeloService,
    ],
    exports: [
        CdkModeloAutocompleteComponent
    ]
})
export class CdkModeloAutocompleteModule {
}
