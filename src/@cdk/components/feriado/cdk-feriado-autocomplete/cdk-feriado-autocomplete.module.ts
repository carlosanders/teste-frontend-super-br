import {NgModule} from '@angular/core';
import {MatAutocompleteModule, MatProgressSpinnerModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {FeriadoService} from '@cdk/services/feriado.service';
import {CdkFeriadoAutocompleteComponent} from './cdk-feriado-autocomplete.component';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    declarations: [
        CdkFeriadoAutocompleteComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatProgressSpinnerModule,

        PipesModule,

        CdkSharedModule,
    ],
    providers: [
        FeriadoService,
    ],
    exports: [
        CdkFeriadoAutocompleteComponent
    ]
})
export class CdkFeriadoAutocompleteModule {
}
